import React from 'react';
import { MapPin, Clock, Phone, UserCheck } from 'lucide-react';
import { Sanctuary } from '../types';

interface SanctuariesSectionProps {
  sanctuaries: Sanctuary[];
  highlightedSanctuaryId?: string | null;
  onOpenAcquire: () => void;
  onOpenPanorama?: () => void;
}

export const SanctuariesSection: React.FC<SanctuariesSectionProps> = ({
  sanctuaries,
  highlightedSanctuaryId,
  onOpenAcquire,
  onOpenPanorama,
}) => {
  return (
    <section id="sanctuaries" className="pt-20 md:pt-28 pb-16 md:pb-20 max-w-7xl mx-auto px-6 md:px-12 border-t border-[#DCD8D0]">
      {/* Curatorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DCD8D0] pb-6 mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-gallery-bronze uppercase mb-1.5">
            <MapPin className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Manila Gallery Spaces</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-gallery-obsidian tracking-tight">
            Sanctuaries of Fine Art
          </h2>
          <p className="text-gallery-muted text-xs sm:text-sm font-light mt-1.5 max-w-xl leading-relaxed">
            Historia operates four institutional locations across Metro Manila, housing curated salons, sculpture pavilions, and climate-controlled vaults.
          </p>
        </div>

        <button
          onClick={onOpenAcquire}
          className="inline-flex items-center gap-2 py-2.5 px-5 bg-gallery-obsidian text-gallery-alabaster text-xs font-mono tracking-widest uppercase hover:bg-gallery-bronze transition-colors rounded-sm"
          data-cursor-text="BOOK"
        >
          <span>BOOK PRIVATE GALLERY TOUR →</span>
        </button>
      </div>

      {/* Tightened 3D Virtual Tour Banner (h-[240px]-h-[280px]) */}
      <div className="relative rounded-sm overflow-hidden mb-16 border border-[#DCD8D0] shadow-md group">
        <div className="relative h-56 sm:h-64 md:h-72 w-full bg-[#121212]">
          <img
            src="/assets/artworks/museum-interior-scan.jpg"
            alt="Historia Art Gallery 3D Virtual Gallery Interior"
            className="w-full h-full object-cover opacity-70 group-hover:scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest">
              <span className="text-[9px] uppercase bg-gallery-bronze text-white px-2.5 py-0.5 rounded-sm">
                Spatial Photogrammetry Tour
              </span>
              <span className="text-[10px] text-[#DCD8D0] hidden sm:inline">
                SM MEGAMALL 4TH LEVEL SALON
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="font-serif text-xl sm:text-3xl font-light text-white leading-snug">
                  Experience The Grand Salon in 3D
                </h3>
                <p className="text-xs font-light text-[#DCD8D0] mt-1 leading-relaxed hidden sm:block">
                  High-definition digital twin rendering of our permanent galleries. Examine ambient ceiling track lighting and monumental gilding in real time.
                </p>
              </div>

              <button
                onClick={onOpenPanorama || onOpenAcquire}
                className="py-2 px-5 bg-white text-gallery-obsidian hover:bg-gallery-bronze hover:text-white transition-colors text-xs font-mono tracking-widest uppercase rounded-sm whitespace-nowrap self-start sm:self-auto"
                data-cursor-text="VIRTUAL"
              >
                Launch 3D Walkthrough
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Manila Locations: Clean 1px Top-Hairline Architectural Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {sanctuaries.map((sanctuary, index) => {
          const isHighlighted = highlightedSanctuaryId === sanctuary.id;
          return (
            <div
              key={sanctuary.id}
              className={`border-t pt-6 flex flex-col justify-between group transition-all duration-500 ${
                isHighlighted
                  ? 'border-gallery-bronze bg-[#8C7355]/10 px-4 -mx-4 rounded-sm ring-1 ring-gallery-bronze/50 shadow-md'
                  : 'border-[#DCD8D0] hover:border-gallery-bronze'
              }`}
            >
            <div className="space-y-2.5">
              {/* Location Number & Status */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase">
                <span className="text-gallery-muted">0{index + 1} • {sanctuary.location.split(',')[0]}</span>
                <span className="text-gallery-bronze font-semibold">
                  {sanctuary.status}
                </span>
              </div>

              {/* Sanctuary Title */}
              <h4 className="font-serif text-xl sm:text-2xl text-gallery-obsidian font-normal group-hover:text-gallery-bronze transition-colors">
                {sanctuary.name}
              </h4>

              {/* Type / Specialty */}
              <p className="text-xs font-mono text-gallery-bronze/90">
                {sanctuary.type}
              </p>

              {/* Address */}
              <p className="text-xs text-gallery-muted font-light leading-relaxed pt-1">
                {sanctuary.address}
              </p>
            </div>

            {/* Curatorial Contact Hairline */}
            <div className="mt-6 pt-3 border-t border-[#DCD8D0]/60 space-y-1 text-[11px] font-mono text-gallery-muted">
              <div className="flex items-center gap-2 text-gallery-obsidian">
                <Clock className="w-3.5 h-3.5 stroke-[1.25] text-gallery-bronze" />
                <span className="text-[10px] truncate">{sanctuary.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 stroke-[1.25] text-gallery-bronze" />
                <span className="text-[10px] truncate">{sanctuary.curator}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 stroke-[1.25] text-gallery-bronze" />
                <span className="text-[10px]">{sanctuary.phone}</span>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
};
