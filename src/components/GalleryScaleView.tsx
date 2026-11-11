import React from 'react';
import { X, Scale, Info } from 'lucide-react';
import { Artwork } from '../types';

interface GalleryScaleViewProps {
  artwork: Artwork;
  onClose: () => void;
}

export const GalleryScaleView: React.FC<GalleryScaleViewProps> = ({ artwork, onClose }) => {
  // Base scale calculation: 170cm person = 220px in reference room
  // artwork height in pixels = (artwork.heightCm / 170) * 220
  const personHeightPx = 220;
  const pixelsPerCm = personHeightPx / 170;
  const artHeightPx = Math.min(360, Math.max(70, artwork.heightCm * pixelsPerCm));
  const artWidthPx = (artHeightPx * artwork.widthCm) / artwork.heightCm;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="scale-dialog-title"
    >
      <div
        className="relative w-full max-w-5xl bg-[#181818] border border-[#2A2A2A] rounded-sm p-6 sm:p-10 text-white shadow-2xl flex flex-col justify-between max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#282828] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 stroke-[1.25] text-[#B3936E]" />
            <div>
              <h3 id="scale-dialog-title" className="font-serif text-xl sm:text-2xl font-light">
                Architectural Gallery Scale Simulation
              </h3>
              <span className="text-[10px] font-mono tracking-widest text-[#B3936E] uppercase block">
                Proportional Physical Presence • 1:1 Relative Scale
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7E766D] hover:text-white transition-colors"
            aria-label="Close Gallery Scale View"
          >
            <X className="w-6 h-6 stroke-[1.25]" />
          </button>
        </div>

        {/* Gallery Wall Elevation View */}
        <div className="relative bg-[#1F1F1F] rounded-sm p-6 sm:p-12 border border-[#2C2C2C] flex flex-col justify-end min-h-[420px] overflow-hidden">
          {/* Gallery Wall Spotlight Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(179,147,110,0.12),transparent_70%)] pointer-events-none" />

          {/* Wall Hanging Plane */}
          <div className="relative z-10 flex items-end justify-center gap-12 sm:gap-20 pb-4">
            {/* 170cm Collector Silhouette */}
            <div className="flex flex-col items-center">
              <div
                className="relative flex flex-col items-center justify-end"
                style={{ height: `${personHeightPx}px` }}
              >
                {/* SVG Silhouette */}
                <svg
                  className="w-16 h-full text-[#4A4A4A]"
                  viewBox="0 0 100 300"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="25" r="16" />
                  <path d="M30 50 C20 60 20 90 20 120 L25 190 L25 295 L45 295 L45 200 L55 200 L55 295 L75 295 L75 190 L80 120 C80 90 80 60 70 50 Z" />
                </svg>

                {/* Height line indicator */}
                <div className="absolute -left-10 top-0 bottom-0 border-l border-dashed border-[#B3936E]/60 flex items-center">
                  <span className="text-[9px] font-mono text-[#B3936E] -rotate-90 whitespace-nowrap pl-2">
                    170 cm Collector
                  </span>
                </div>
              </div>
            </div>

            {/* Artwork at Proportional Scale */}
            <div className="flex flex-col items-center mb-8">
              <div
                className={`relative bg-[#E8E4DC] p-2 shadow-2xl border border-[#8C7355]/40 flex items-center justify-center transition-all ${
                  artwork.isTondo ? 'rounded-full' : 'rounded-none'
                }`}
                style={{
                  height: `${artHeightPx}px`,
                  width: `${artWidthPx}px`,
                }}
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className={`w-full h-full ${
                    artwork.isTondo ? 'object-cover rounded-full' : 'object-contain'
                  }`}
                />

                {/* Dimension label */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-[#B3936E] whitespace-nowrap border border-[#B3936E]/30">
                  {artwork.widthCm} × {artwork.heightCm} cm
                </div>
              </div>
            </div>

            {/* Minimalist Museum Gallery Bench (45cm height) */}
            <div className="hidden sm:flex flex-col items-center">
              <div
                className="relative bg-[#2D2822] border-t-2 border-[#8C7355] w-36 shadow-lg flex items-center justify-center"
                style={{ height: `${45 * pixelsPerCm}px` }}
              >
                <span className="text-[8px] font-mono text-[#A29D94] uppercase tracking-wider">
                  Museum Bench (45cm)
                </span>
              </div>
            </div>
          </div>

          {/* Gallery Parquet Floor Line */}
          <div className="w-full border-t border-[#3A3A3A] pt-2 flex justify-between text-[9px] font-mono text-[#7E766D] tracking-widest">
            <span>PARQUET GALLERY FLOORING LEVEL</span>
            <span>PROPORTIONAL ARCHITECTURAL ELEVATION</span>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#A29D94] gap-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#B3936E] shrink-0" />
            <span>
              Scale calibrated against a standard 170cm curator silhouette and institutional 45cm seating bench.
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 bg-[#8C7355] text-white tracking-widest uppercase hover:bg-[#B3936E] transition-colors rounded-sm text-[11px]"
          >
            Return to Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
