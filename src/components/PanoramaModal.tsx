import React, { useState, useRef, useEffect } from 'react';
import { X, Compass, Eye, ShieldCheck, MoveHorizontal } from 'lucide-react';

interface PanoramaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookVisit: () => void;
}

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  tag: string;
  description: string;
}

export const PanoramaModal: React.FC<PanoramaModalProps> = ({
  isOpen,
  onClose,
  onBookVisit,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [panX, setPanX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'lighting',
      x: 28,
      y: 35,
      title: 'Track Lighting Calibration',
      tag: 'OPTICAL ILLUMINANCE',
      description:
        'Museum-grade 4000K daylight-balanced track spotlights calibrated with 98+ Color Rendering Index (CRI), minimizing UV/IR degradation while accentuating historical impasto reliefs.',
    },
    {
      id: 'hanging-wall',
      x: 52,
      y: 50,
      title: 'Main Salon Hanging Wall',
      tag: 'STRUCTURAL REINFORCEMENT',
      description:
        'Reinforced multi-ply archival plaster walls coated in custom breathable matte alabaster pigment, equipped with internal anti-seismic stainless steel anchoring cleats.',
    },
    {
      id: 'microclimate',
      x: 76,
      y: 62,
      title: 'Microclimate Stabilization',
      tag: 'CONSERVATION SYSTEM',
      description:
        'Continuous hermetic environmental stabilization maintaining strictly 21°C (±1°C) ambient temperature and 50% (±3%) relative humidity to prevent canvas hygroscopic warping.',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - panX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newPan = e.clientX - startX;
    // Limit panning bounds
    const boundedPan = Math.max(-400, Math.min(400, newPan));
    setPanX(boundedPan);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex flex-col h-[100dvh] overflow-hidden animate-fadeIn select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="panorama-title"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top Institutional Header */}
      <div className="h-16 shrink-0 border-b border-white/10 px-6 sm:px-8 flex items-center justify-between bg-[#121212]/90 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-widest text-[#B3936E] uppercase border border-[#8C7355]/40 px-2.5 py-0.5 rounded-sm">
            SPATIAL PHOTOGRAMMETRY
          </span>
          <h3 id="panorama-title" className="font-serif text-lg text-white font-light hidden sm:block">
            The Grand Salon • 3D Panoramic Inspection
          </h3>
          <span className="text-xs font-mono text-[#7E766D] hidden md:inline">
            SM MEGAMALL 4TH LEVEL
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onBookVisit}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-[#8C7355] hover:bg-[#B3936E] text-white text-[11px] font-mono tracking-widest uppercase transition-colors rounded-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Book In-Person Visit</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-[#7E766D] hover:text-white transition-colors"
            aria-label="Close 3D Panorama"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>
      </div>

      {/* Main Panoramic Interactive Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        className={`relative flex-1 overflow-hidden flex items-center justify-center bg-[#0D0D0D] cursor-${
          isDragging ? 'grabbing' : 'grab'
        }`}
      >
        {/* Panoramic Image Canvas with Drag Translation */}
        <div
          className="relative w-[140%] h-[120%] flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${panX}px)`,
          }}
        >
          <img
            src="/assets/artworks/museum-interior-scan.jpg"
            alt="Historia Art Gallery Grand Salon 3D Panorama"
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Interactive Architectural Hotspots */}
          {hotspots.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id;

            return (
              <div
                key={spot.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isSelected ? null : spot);
                }}
              >
                {/* Hotspot Pulsing Beacon */}
                <div className="relative group">
                  <span className="absolute -inset-2 rounded-full bg-[#8C7355]/40 animate-ping" />
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#B3936E] border-white scale-110 shadow-lg'
                        : 'bg-[#181818]/90 border-[#8C7355] hover:border-white hover:scale-105'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-white stroke-[1.5]" />
                  </div>

                  {/* Hotspot Label Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 top-9 bg-black/85 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[9px] font-mono tracking-wider text-white whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                    {spot.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hotspot Callout Card (Floating in Viewport) */}
        {activeHotspot && (
          <div
            className="absolute bottom-16 left-6 sm:left-12 max-w-sm bg-[#181818]/95 border border-[#8C7355]/50 backdrop-blur-md p-5 rounded-sm shadow-2xl text-white z-30 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <span className="text-[9px] font-mono tracking-widest text-[#B3936E] uppercase">
                {activeHotspot.tag}
              </span>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-[#7E766D] hover:text-white p-1"
                aria-label="Close Hotspot Info"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="font-serif text-lg font-normal mb-1.5">{activeHotspot.title}</h4>
            <p className="text-xs font-light text-[#DCD8D0] leading-relaxed">
              {activeHotspot.description}
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#A29D94]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                Validated Specification
              </span>
              <button
                onClick={onBookVisit}
                className="text-[#B3936E] hover:underline uppercase"
              >
                Reserve Tour →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="h-14 shrink-0 border-t border-white/10 px-6 sm:px-8 flex items-center justify-between bg-[#121212]/90 backdrop-blur-md text-xs font-mono text-[#A29D94] z-30">
        <div className="flex items-center gap-2">
          <MoveHorizontal className="w-4 h-4 text-[#B3936E]" />
          <span>Click &amp; drag horizontally to pan across gallery interior • Click hotspots for architectural specs</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[#7E766D] hidden sm:inline uppercase">
            360° Photogrammetric Scan
          </span>
          <button
            onClick={onBookVisit}
            className="sm:hidden text-[10px] text-[#B3936E] uppercase font-semibold"
          >
            Book Visit →
          </button>
        </div>
      </div>
    </div>
  );
};
