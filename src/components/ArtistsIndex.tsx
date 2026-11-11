import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Award, ChevronDown, ChevronUp, Eye, Compass } from 'lucide-react';
import { Artist, Artwork } from '../types';

interface ArtistsIndexProps {
  artists: Artist[];
  artworks: Artwork[];
  focusedArtistId?: string | null;
  onSelectArtwork: (artwork: Artwork) => void;
  onOpenAcquire: (artwork?: Artwork) => void;
}

export const ArtistsIndex: React.FC<ArtistsIndexProps> = ({
  artists,
  artworks,
  focusedArtistId,
  onSelectArtwork,
  onOpenAcquire,
}) => {
  const [hoveredArtist, setHoveredArtist] = useState<Artist | null>(null);
  const [expandedArtistId, setExpandedArtistId] = useState<string | null>(null);
  const [rosterFilter, setRosterFilter] = useState<'canonical' | 'contemporary'>('canonical');

  useEffect(() => {
    if (focusedArtistId) {
      const found = artists.find((a) => a.id === focusedArtistId);
      if (found) {
        setRosterFilter(found.rosterType);
      }
      setExpandedArtistId(focusedArtistId);
    }
  }, [focusedArtistId, artists]);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (previewRef.current) {
      gsap.set(previewRef.current, { xPercent: 0, yPercent: 0 });
      xTo.current = gsap.quickTo(previewRef.current, 'x', { duration: 0.35, ease: 'power3' });
      yTo.current = gsap.quickTo(previewRef.current, 'y', { duration: 0.35, ease: 'power3' });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX + 28);
      yTo.current(e.clientY - 130);
    }
  };

  const toggleArtistExpand = (artistId: string) => {
    setExpandedArtistId((prev) => (prev === artistId ? null : artistId));
  };

  const getArtistArtwork = (artist: Artist): Artwork => {
    const found = artworks.find((a) =>
      a.artist.toLowerCase().includes(artist.name.toLowerCase().split(' ')[0])
    );
    return found || artworks[0];
  };

  const visibleArtists = artists.filter((a) => a.rosterType === rosterFilter);

  return (
    <section
      id="artists-index"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#DCD8D0] relative"
    >
      {/* Curatorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 lg:mb-10 border-b border-[#DCD8D0] gap-6">
        <div>
          <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] text-gallery-bronze uppercase mb-2">
            <Award className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Curatorial Lexicon</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-gallery-obsidian tracking-tight">
            Master Artists Index
          </h2>
          <p className="text-gallery-muted text-xs sm:text-sm font-light mt-2 max-w-xl leading-relaxed">
            Historical catalog of canonical masters and premier contemporary artists represented by Historia Art Gallery. Click any artist row to expand curatorial biography and representative works.
          </p>
        </div>

        {/* Refined Roster Toggle */}
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="flex items-center gap-1.5 bg-[#EDE9E1]/70 p-1 rounded-sm border border-[#DCD8D0] text-[11px] font-mono tracking-wider uppercase">
            <button
              onClick={() => setRosterFilter('canonical')}
              className={`px-3.5 py-1.5 rounded-sm transition-all duration-300 ${
                rosterFilter === 'canonical'
                  ? 'bg-gallery-obsidian text-gallery-alabaster shadow-sm font-medium'
                  : 'text-gallery-muted hover:text-gallery-obsidian'
              }`}
              data-cursor-text="CANONICAL"
            >
              Canonical Masters
            </button>
            <button
              onClick={() => setRosterFilter('contemporary')}
              className={`px-3.5 py-1.5 rounded-sm transition-all duration-300 ${
                rosterFilter === 'contemporary'
                  ? 'bg-gallery-obsidian text-gallery-alabaster shadow-sm font-medium'
                  : 'text-gallery-muted hover:text-gallery-obsidian'
              }`}
              data-cursor-text="CONTEMPORARY"
            >
              Contemporary Roster
            </button>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-gallery-muted uppercase">
            {visibleArtists.length} {rosterFilter === 'canonical' ? 'Historical Masters' : 'Active Contemporary Artists'} Accessioned
          </span>
        </div>
      </div>

      {/* Hairline-Divided Editorial Roster with Expandable Biography Drawers */}
      <div className="divide-y divide-[#DCD8D0]">
        {visibleArtists.map((artist, idx) => {
          const isExpanded = expandedArtistId === artist.id;
          const repArtwork = getArtistArtwork(artist);

          return (
            <div key={artist.id} className="transition-colors duration-300">
              {/* Row Header */}
              <div
                onMouseEnter={() => setHoveredArtist(artist)}
                onMouseLeave={() => setHoveredArtist(null)}
                onClick={() => toggleArtistExpand(artist.id)}
                className="group py-4 sm:py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center cursor-pointer hover:bg-[#EDE9E1]/40 px-3 -mx-3 rounded-sm transition-all"
                data-cursor-text={isExpanded ? 'CLOSE' : 'BIOGRAPHY'}
              >
                {/* Number & Artist Name */}
                <div className="md:col-span-5 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-gallery-muted tracking-widest">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-gallery-obsidian group-hover:text-gallery-bronze group-hover:translate-x-2 transition-all duration-300">
                      {artist.name}
                    </h3>
                    <span className="text-[11px] font-mono text-gallery-muted block mt-0.5">
                      {artist.dates}
                    </span>
                  </div>
                </div>

                {/* Movement & Notable Work */}
                <div className="md:col-span-4 space-y-0.5">
                  <div className="text-xs font-mono text-gallery-obsidian font-medium">
                    {artist.movement}
                  </div>
                  <div className="text-[11px] text-gallery-muted font-light truncate">
                    Notable: {artist.notableWork}
                  </div>
                </div>

                {/* Catalog Count & Expand Trigger */}
                <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-5 text-xs font-mono">
                  <a
                    href="#masterworks"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-right group/badge hover:opacity-80 transition-opacity focus:outline-none"
                    data-cursor-text="VIEW WORKS"
                  >
                    <span className="text-gallery-muted block text-[10px] uppercase">Repository</span>
                    <span className="text-gallery-bronze font-medium underline underline-offset-4 decoration-gallery-bronze/40 group-hover/badge:decoration-gallery-bronze inline-flex items-center gap-1">
                      <span>{artist.catalogCount} Works Accessioned</span>
                      <span className="text-[10px]">↗</span>
                    </span>
                  </a>
                  <div className="w-8 h-8 rounded-full border border-[#DCD8D0] group-hover:border-gallery-bronze group-hover:bg-gallery-bronze group-hover:text-white flex items-center justify-center transition-all duration-300">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 stroke-[1.25]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 stroke-[1.25]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Curatorial Biography Drawer */}
              {isExpanded && (
                <div className="pb-8 pt-3 px-4 md:px-8 bg-[#EDE9E1]/30 border-l-2 border-gallery-bronze my-2 rounded-r-sm animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gallery-bronze uppercase tracking-widest">
                        <span>Curatorial Biography</span>
                        <span>•</span>
                        <span>{artist.movement}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-light text-gallery-obsidian/90 leading-relaxed">
                        {artist.bio}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectArtwork(repArtwork);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gallery-bronze text-white text-[10px] tracking-widest uppercase hover:bg-gallery-bronzedark transition-colors rounded-sm"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Signature Work</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenAcquire(repArtwork);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#DCD8D0] hover:border-gallery-bronze bg-white text-gallery-obsidian text-[10px] tracking-widest uppercase transition-colors rounded-sm"
                        >
                          <Compass className="w-3.5 h-3.5 text-gallery-bronze" />
                          <span>Private Treaty Inquiry</span>
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                      <div className="bg-[#EDE9E1] p-2 border border-[#DCD8D0] shadow-md max-w-[220px]">
                        <img
                          src={artist.imagePreview}
                          alt={artist.name}
                          className="w-full h-auto object-cover"
                        />
                        <span className="block text-[9px] font-mono text-gallery-muted mt-1 text-center truncate">
                          {repArtwork.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Framed Preview Beside Cursor using GSAP quickTo */}
      <div
        ref={previewRef}
        className={`fixed pointer-events-none z-50 hidden lg:block transition-opacity duration-200 ${
          hoveredArtist && !expandedArtistId ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ left: 0, top: 0 }}
      >
        {hoveredArtist && (
          <div className="w-56 bg-[#1A1A1A] p-2.5 rounded-sm shadow-2xl border border-[#8C7355]/40 backdrop-blur-md">
            <div className="w-full h-36 overflow-hidden bg-black rounded-sm relative">
              <img
                src={hoveredArtist.imagePreview}
                alt={hoveredArtist.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[9px] font-mono text-[#B3936E] uppercase tracking-widest">
                  Signature Masterwork
                </span>
              </div>
            </div>
            <div className="mt-2 text-white">
              <span className="font-serif text-sm block leading-snug">
                {hoveredArtist.name}
              </span>
              <span className="text-[9px] font-mono text-[#A29D94] block mt-0.5">
                {hoveredArtist.dates}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
