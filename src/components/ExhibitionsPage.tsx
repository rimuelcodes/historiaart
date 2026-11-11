import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import { EXHIBITIONS_DATA } from '../data/exhibitions';

interface ExhibitionsPageProps {
  onOpenAcquire: () => void;
  onOpenTondo: () => void;
}

export const ExhibitionsPage: React.FC<ExhibitionsPageProps> = ({
  onOpenAcquire,
  onOpenTondo,
}) => {
  const [filter, setFilter] = useState<'all' | 'exhibitions' | 'fairs'>('all');

  const filteredExhibitions = EXHIBITIONS_DATA.filter((ex) => {
    if (filter === 'all') return true;
    return ex.category === filter;
  });

  const flagship = EXHIBITIONS_DATA.find((e) => e.isFlagship) || EXHIBITIONS_DATA[0];

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto animate-fadeIn select-none">
      {/* Editorial Header */}
      <div className="border-b border-[#DCD8D0] pb-8 mb-12">
        <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.2em] text-gallery-bronze uppercase mb-2">
          <Calendar className="w-3.5 h-3.5 stroke-[1.25]" />
          <span>Institutional Bulletin & Archive</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-gallery-obsidian tracking-tight">
              Exhibitions & Art Fairs
            </h1>
            <p className="text-gallery-muted text-xs sm:text-sm font-light mt-2 max-w-2xl leading-relaxed">
              Curatorial timeline of Historia Art Gallery’s ongoing exhibitions, retrospective salons, and institutional presentations across Manila and regional art platforms.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs font-mono tracking-widest uppercase shrink-0">
            {[
              { label: 'All Bulletin', value: 'all' },
              { label: 'Gallery Exhibitions', value: 'exhibitions' },
              { label: 'Manila Art & Fairs', value: 'fairs' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as any)}
                className={`px-4 py-2 rounded-sm border transition-all duration-300 ${
                  filter === tab.value
                    ? 'bg-gallery-obsidian text-gallery-alabaster border-gallery-obsidian'
                    : 'bg-white/60 text-gallery-muted hover:text-gallery-obsidian border-[#DCD8D0] hover:border-gallery-bronze'
                }`}
                data-cursor-text={tab.label.toUpperCase()}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flagship Hero Spotlight: "ELEVATING BRILLIANCE" */}
      <div className="mb-16 border border-[#DCD8D0] bg-white rounded-sm overflow-hidden shadow-sm group">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto bg-[#121212] overflow-hidden">
            <img
              src={flagship.image}
              alt={flagship.title}
              className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between text-xs font-mono">
              <span className="bg-gallery-bronze text-white text-[9px] uppercase px-2.5 py-1 rounded-sm font-semibold tracking-widest">
                Ongoing Flagship Exhibition
              </span>
              <span className="text-[#DCD8D0] text-[10px] tracking-widest uppercase">
                {flagship.dates}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-[#F6F4F0]/60 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-gallery-bronze mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>40 Master & Contemporary Filipino Artists</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-gallery-obsidian leading-snug">
                {flagship.title}
              </h2>
              <p className="text-xs font-mono text-gallery-muted tracking-wider uppercase mt-1">
                {flagship.subtitle}
              </p>
              <p className="text-xs sm:text-sm font-light text-gallery-obsidian/85 mt-4 leading-relaxed">
                {flagship.description}
              </p>

              <div className="mt-6 pt-4 border-t border-[#DCD8D0] space-y-2 text-xs font-mono text-gallery-muted">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gallery-bronze" />
                  <span className="text-gallery-obsidian">{flagship.location}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gallery-muted block">Curatorial Direction:</span>
                  <span className="text-gallery-obsidian">{flagship.curator}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#DCD8D0]">
              <button
                onClick={onOpenAcquire}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gallery-obsidian text-gallery-alabaster text-xs font-mono tracking-widest uppercase hover:bg-gallery-bronze transition-colors rounded-sm"
                data-cursor-text="BOOK VIP"
              >
                <span>Reserve VIP Vernissage Pass</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
              </button>

              <button
                onClick={onOpenTondo}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#DCD8D0] hover:border-gallery-bronze bg-white text-gallery-obsidian text-xs font-mono tracking-widest uppercase transition-colors rounded-sm"
                data-cursor-text="TONDO"
              >
                <span>Inspect Sanctum Tondo</span>
                <ExternalLink className="w-3 h-3 text-gallery-bronze" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Exhibition & Art Fair Archive */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCD8D0] text-xs font-mono tracking-widest text-gallery-muted uppercase">
          <span>Curatorial Catalog Raisonné</span>
          <span>{filteredExhibitions.length} Documented Salons</span>
        </div>

        <div className="divide-y divide-[#DCD8D0]">
          {filteredExhibitions.map((ex, idx) => (
            <div
              key={ex.id}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group hover:bg-[#EDE9E1]/30 px-4 -mx-4 rounded-sm transition-colors"
            >
              <div className="lg:col-span-2 text-xs font-mono text-gallery-muted space-y-1">
                <span className="text-[10px] tracking-widest uppercase block text-gallery-bronze font-semibold">
                  0{idx + 1} • {ex.status}
                </span>
                <span className="block text-gallery-obsidian font-medium">{ex.dates}</span>
              </div>

              <div className="lg:col-span-4 space-y-1">
                <h3 className="font-serif text-2xl font-light text-gallery-obsidian group-hover:text-gallery-bronze transition-colors">
                  {ex.title}
                </h3>
                <span className="text-xs font-mono text-gallery-muted block">
                  {ex.subtitle}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-gallery-muted pt-1">
                  <MapPin className="w-3 h-3 text-gallery-bronze" />
                  <span>{ex.location}</span>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-2">
                <p className="text-xs font-light text-gallery-obsidian/85 leading-relaxed">
                  {ex.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ex.featuredArtists.map((artist) => (
                    <span
                      key={artist}
                      className="text-[9px] font-mono uppercase bg-white border border-[#DCD8D0] px-2 py-0.5 rounded-sm text-gallery-muted"
                    >
                      {artist}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 flex justify-start lg:justify-end">
                <button
                  onClick={onOpenAcquire}
                  className="px-4 py-2 border border-[#DCD8D0] group-hover:border-gallery-bronze group-hover:bg-gallery-bronze group-hover:text-white transition-all text-xs font-mono tracking-widest uppercase rounded-sm"
                  data-cursor-text="INQUIRE"
                >
                  Request Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
