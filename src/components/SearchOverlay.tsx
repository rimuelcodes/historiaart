import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Eye, User, Calendar, CornerDownLeft } from 'lucide-react';
import { ARTWORKS_DATA } from '../data/artworks';
import { ARTISTS_DATA } from '../data/artists';
import { EXHIBITIONS_DATA } from '../data/exhibitions';
import { Artwork } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectArtist: (artistId: string) => void;
  onSelectExhibition: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectArtwork,
  onSelectArtist,
  onSelectExhibition,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  const matchingArtworks = query
    ? ARTWORKS_DATA.filter(
        (a) =>
          a.title.toLowerCase().includes(normalized) ||
          a.artist.toLowerCase().includes(normalized) ||
          a.catalogId.toLowerCase().includes(normalized) ||
          a.medium.toLowerCase().includes(normalized)
      )
    : ARTWORKS_DATA.slice(0, 3);

  const matchingArtists = query
    ? ARTISTS_DATA.filter(
        (a) =>
          a.name.toLowerCase().includes(normalized) ||
          a.movement.toLowerCase().includes(normalized)
      )
    : ARTISTS_DATA.slice(0, 3);

  const matchingExhibitions = query
    ? EXHIBITIONS_DATA.filter(
        (e) =>
          e.title.toLowerCase().includes(normalized) ||
          e.subtitle.toLowerCase().includes(normalized) ||
          e.location.toLowerCase().includes(normalized)
      )
    : EXHIBITIONS_DATA.slice(0, 2);

  const totalResults = matchingArtworks.length + matchingArtists.length + matchingExhibitions.length;

  return (
    <div
      className="fixed inset-0 z-[140] bg-gallery-obsidian/85 backdrop-blur-md flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 sm:px-6 animate-fadeIn select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl bg-[#F6F4F0] text-gallery-obsidian rounded-sm border border-[#DCD8D0] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Search Header Bar */}
        <div className="h-16 px-6 border-b border-[#DCD8D0] flex items-center gap-4 bg-white shrink-0">
          <Search className="w-5 h-5 text-gallery-bronze stroke-[1.5] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search masterworks, artists, exhibitions, accession codes (e.g. Luna, Tondo, Orlina)..."
            className="flex-1 bg-transparent text-sm sm:text-base font-serif placeholder:font-sans placeholder:text-xs placeholder:text-gallery-muted outline-none text-gallery-obsidian"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gallery-muted hover:text-gallery-obsidian text-xs font-mono"
            >
              CLEAR
            </button>
          )}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gallery-muted bg-[#EDE9E1] px-2 py-1 rounded-sm border border-[#DCD8D0]">
            <span>ESC</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gallery-muted hover:text-gallery-obsidian focus:outline-none"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {totalResults === 0 ? (
            <div className="py-12 text-center text-gallery-muted space-y-2">
              <p className="font-serif text-lg text-gallery-obsidian">No curatorial matches found</p>
              <p className="text-xs font-light">Try searching for Juan Luna, Fernando Amorsolo, Ramon Orlina, Bronze, or Tondo.</p>
            </div>
          ) : (
            <>
              {/* Artworks Section */}
              {matchingArtworks.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-gallery-bronze uppercase border-b border-[#DCD8D0] pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3 h-3" />
                      <span>Curated Masterworks ({matchingArtworks.length})</span>
                    </span>
                    <span className="text-gallery-muted">Permanent Repository</span>
                  </div>

                  <div className="divide-y divide-[#DCD8D0]/60">
                    {matchingArtworks.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          onClose();
                          onSelectArtwork(art);
                        }}
                        className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/80 px-3 -mx-3 rounded-sm group transition-colors"
                        data-cursor-text="INSPECT"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-10 h-10 object-cover rounded-sm border border-[#DCD8D0] shrink-0 bg-[#121212]"
                          />
                          <div className="min-w-0">
                            <span className="text-[9px] font-mono tracking-widest text-gallery-bronze block uppercase">
                              {art.catalogId}
                            </span>
                            <h4 className="font-serif text-sm text-gallery-obsidian group-hover:text-gallery-bronze transition-colors truncate">
                              {art.title}
                            </h4>
                            <span className="text-[11px] font-mono text-gallery-muted block">
                              {art.artist} • {art.valuationPHP}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gallery-muted group-hover:text-gallery-obsidian shrink-0 text-xs font-mono">
                          <span className="hidden sm:inline text-[10px] tracking-wider uppercase">Inspect Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Artists Section */}
              {matchingArtists.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-gallery-bronze uppercase border-b border-[#DCD8D0] pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      <span>Canonical & Contemporary Artists ({matchingArtists.length})</span>
                    </span>
                    <span className="text-gallery-muted">Curatorial Lexicon</span>
                  </div>

                  <div className="divide-y divide-[#DCD8D0]/60">
                    {matchingArtists.map((artist) => (
                      <div
                        key={artist.id}
                        onClick={() => {
                          onClose();
                          onSelectArtist(artist.id);
                        }}
                        className="py-2.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/80 px-3 -mx-3 rounded-sm group transition-colors"
                        data-cursor-text="BIOGRAPHY"
                      >
                        <div>
                          <h4 className="font-serif text-sm sm:text-base text-gallery-obsidian group-hover:text-gallery-bronze transition-colors">
                            {artist.name}
                          </h4>
                          <span className="text-[11px] font-mono text-gallery-muted block">
                            {artist.movement} ({artist.dates})
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-gallery-bronze tracking-widest uppercase">
                          {artist.catalogCount} Works Accessioned →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exhibitions Section */}
              {matchingExhibitions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-gallery-bronze uppercase border-b border-[#DCD8D0] pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>Exhibitions & Art Fairs ({matchingExhibitions.length})</span>
                    </span>
                    <span className="text-gallery-muted">Manila Bulletin</span>
                  </div>

                  <div className="divide-y divide-[#DCD8D0]/60">
                    {matchingExhibitions.map((ex) => (
                      <div
                        key={ex.id}
                        onClick={() => {
                          onClose();
                          onSelectExhibition();
                        }}
                        className="py-2.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/80 px-3 -mx-3 rounded-sm group transition-colors"
                        data-cursor-text="VIEW"
                      >
                        <div>
                          <h4 className="font-serif text-sm sm:text-base text-gallery-obsidian group-hover:text-gallery-bronze transition-colors">
                            {ex.title}
                          </h4>
                          <span className="text-[11px] font-mono text-gallery-muted block">
                            {ex.dates} • {ex.location}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-gallery-muted uppercase group-hover:text-gallery-obsidian">
                          {ex.status} →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="h-10 px-6 border-t border-[#DCD8D0] bg-[#EDE9E1]/60 flex items-center justify-between text-[10px] font-mono text-gallery-muted shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> Select Item
            </span>
            <span>ESC to close</span>
          </div>
          <span>Historia Art Instant Search</span>
        </div>
      </div>
    </div>
  );
};
