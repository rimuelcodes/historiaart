import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  Scale,
  ArrowRight,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  Info,
  Check,
  ShoppingBag,
} from 'lucide-react';
import { Artwork } from '../types';

interface ViewingRoomModalProps {
  artwork: Artwork;
  artworks: Artwork[];
  initialViewMode?: 'study' | 'scale';
  onSelectArtwork: (artwork: Artwork) => void;
  onClose: () => void;
  onOpenScaleView: (artwork: Artwork) => void;
  onOpenAcquire: (artwork: Artwork) => void;
  onAddToBag?: (artwork: Artwork) => void;
}

export const ViewingRoomModal: React.FC<ViewingRoomModalProps> = ({
  artwork,
  artworks,
  initialViewMode = 'study',
  onSelectArtwork,
  onClose,
  onOpenAcquire,
  onAddToBag,
}) => {
  const [viewMode, setViewMode] = useState<'study' | 'scale'>(initialViewMode);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialViewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode, artwork.id]);

  // Current artwork index in collection
  const currentIndex = artworks.findIndex((a) => a.id === artwork.id);
  const totalArtworks = artworks.length;

  const navigateArtwork = (direction: 'prev' | 'next') => {
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= totalArtworks) nextIndex = 0;
    if (nextIndex < 0) nextIndex = totalArtworks - 1;
    setZoomLevel(1);
    onSelectArtwork(artworks[nextIndex]);
  };

  // Keyboard navigation: Escape to close, Left/Right arrows to cycle artworks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        navigateArtwork('next');
      } else if (e.key === 'ArrowLeft') {
        navigateArtwork('prev');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalArtworks, onClose]);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || viewMode !== 'study') return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x, y });
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 2.2 : 1));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  // 170cm collector relative scale calculation
  const personHeightPx = 200;
  const pixelsPerCm = personHeightPx / 170;
  const artHeightPx = Math.min(340, Math.max(65, artwork.heightCm * pixelsPerCm));
  const artWidthPx = (artHeightPx * artwork.widthCm) / artwork.heightCm;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-hidden flex flex-col h-[100dvh]"
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewing-room-title"
    >
      {/* 1. Fixed Institutional Top Bar (h-16, shrink-0) */}
      <header className="h-16 shrink-0 border-b border-white/10 px-6 sm:px-8 flex items-center justify-between bg-[#121212]/90 backdrop-blur-md z-20">
        {/* Left: Institutional Badge & Accession */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono tracking-widest text-[#B3936E] uppercase border border-[#8C7355]/40 px-2.5 py-0.5 rounded-sm whitespace-nowrap">
            MUSEUM VIEWING ROOM
          </span>

          <span className="text-xs font-mono text-[#7E766D] hidden md:inline whitespace-nowrap">
            ACCESSION: {artwork.catalogId}
          </span>

          {/* Artwork Carousel Controls */}
          <div className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-2 py-1 rounded-sm text-xs font-mono">
            <button
              onClick={() => navigateArtwork('prev')}
              className="text-[#A29D94] hover:text-white transition-colors p-0.5"
              aria-label="Previous Artwork"
              title="Previous Artwork (Left Arrow)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-[#DCD8D0] px-1 font-mono tracking-wider">
              0{currentIndex + 1} / 0{totalArtworks}
            </span>
            <button
              onClick={() => navigateArtwork('next')}
              className="text-[#A29D94] hover:text-white transition-colors p-0.5"
              aria-label="Next Artwork"
              title="Next Artwork (Right Arrow)"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center / Right: Interactive Segmented Mode Switcher & Close */}
        <div className="flex items-center gap-4">
          {/* 2-State Segmented Pill Switcher */}
          <div className="flex items-center p-0.5 border border-white/15 bg-white/5 rounded-sm text-[10px] font-mono tracking-widest uppercase">
            <button
              onClick={() => setViewMode('study')}
              className={`px-3 py-1 rounded-sm transition-all ${
                viewMode === 'study'
                  ? 'bg-[#8C7355] text-white shadow-sm'
                  : 'text-[#A29D94] hover:text-white'
              }`}
            >
              STUDY VIEW
            </button>
            <button
              onClick={() => {
                setViewMode('scale');
                setZoomLevel(1);
              }}
              className={`px-3 py-1 rounded-sm transition-all flex items-center gap-1.5 ${
                viewMode === 'scale'
                  ? 'bg-[#8C7355] text-white shadow-sm'
                  : 'text-[#A29D94] hover:text-white'
              }`}
            >
              <Scale className="w-3 h-3 stroke-[1.25]" />
              <span>GALLERY SCALE (170CM)</span>
            </button>
          </div>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2 text-[#7E766D] hover:text-white hover:bg-white/10 rounded-sm transition-colors"
            aria-label="Close Viewing Room (Esc)"
          >
            <X className="w-5 h-5 stroke-[1.25]" />
          </button>
        </div>
      </header>

      {/* 2. Fixed Viewport Split-Screen Grid (h-[calc(100dvh-64px)]) */}
      <div className="flex-1 h-[calc(100dvh-64px)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column (7 cols): Pinned Artwork / Scale Stage */}
        <div className="lg:col-span-7 h-full overflow-hidden flex flex-col justify-between bg-[#0D0D0D] relative p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10 select-none">
          {/* Museum Lighting Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,147,110,0.10),transparent_65%)] pointer-events-none" />

          {/* Center Stage: Study View (Loupe) vs Gallery Scale View */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-auto w-full">
            {viewMode === 'study' ? (
              /* Study View: High-Res Canvas with 2.2x Loupe */
              <div
                ref={imageContainerRef}
                onMouseMove={handleImageMouseMove}
                onClick={toggleZoom}
                className="relative w-full h-full flex items-center justify-center cursor-crosshair overflow-hidden group"
              >
                <div
                  className={`relative transition-all duration-300 ${
                    artwork.isTondo
                      ? 'rounded-full aspect-square max-w-[400px] border-4 border-[#8C7355]/60 overflow-hidden'
                      : 'rounded-none max-w-full'
                  }`}
                  style={{
                    transform:
                      zoomLevel > 1
                        ? `scale(${zoomLevel}) translate(${50 - loupePos.x}%, ${50 - loupePos.y}%)`
                        : 'scale(1)',
                    transformOrigin: `${loupePos.x}% ${loupePos.y}%`,
                    transition: zoomLevel > 1 ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
                  }}
                >
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className={`max-h-[58vh] w-auto ${
                      artwork.isTondo ? 'rounded-full object-cover' : 'object-contain'
                    } shadow-2xl`}
                  />
                </div>
              </div>
            ) : (
              /* Gallery Scale Mode: 170cm Collector & 45cm Bench Simulation */
              <div className="relative w-full h-full flex flex-col justify-end p-4 animate-fadeIn">
                <div className="relative z-10 flex items-end justify-center gap-10 sm:gap-16 pb-4">
                  {/* 170cm Collector Silhouette */}
                  <div className="flex flex-col items-center">
                    <div
                      className="relative flex flex-col items-center justify-end"
                      style={{ height: `${personHeightPx}px` }}
                    >
                      <svg
                        className="w-14 h-full text-[#5A5A5A]"
                        viewBox="0 0 100 300"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="50" cy="25" r="16" />
                        <path d="M30 50 C20 60 20 90 20 120 L25 190 L25 295 L45 295 L45 200 L55 200 L55 295 L75 295 L75 190 L80 120 C80 90 80 60 70 50 Z" />
                      </svg>
                      <div className="absolute -left-8 top-0 bottom-0 border-l border-dashed border-[#B3936E]/60 flex items-center">
                        <span className="text-[8px] font-mono text-[#B3936E] -rotate-90 whitespace-nowrap pl-1">
                          170 cm
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Artwork at Proportional Scale */}
                  <div className="flex flex-col items-center mb-6">
                    <div
                      className={`relative bg-[#EDEAE4] p-1.5 shadow-2xl border border-[#8C7355]/40 flex items-center justify-center transition-all ${
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
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[8px] font-mono text-[#B3936E] whitespace-nowrap border border-[#B3936E]/30">
                        {artwork.widthCm} × {artwork.heightCm} cm
                      </div>
                    </div>
                  </div>

                  {/* 45cm Museum Bench */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div
                      className="relative bg-[#2D2822] border-t-2 border-[#8C7355] w-28 shadow-lg flex items-center justify-center"
                      style={{ height: `${45 * pixelsPerCm}px` }}
                    >
                      <span className="text-[7px] font-mono text-[#A29D94] uppercase tracking-wider">
                        Bench (45cm)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full border-t border-[#333] pt-2 flex justify-between text-[9px] font-mono text-[#7E766D]">
                  <span>PARQUET FLOOR LEVEL</span>
                  <span>1:1 RELATIVE ARCHITECTURAL ELEVATION</span>
                </div>
              </div>
            )}
          </div>

          {/* Unified Bottom Metadata Bar (Zero Overlapping Pills) */}
          <div className="w-full pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8E8A82] shrink-0">
            <span className="text-[11px] truncate max-w-[320px]">
              Dimensions: {artwork.dimensions} • {artwork.medium}
            </span>

            {viewMode === 'study' ? (
              <button
                onClick={toggleZoom}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#B3936E] hover:text-white uppercase transition-colors"
              >
                {zoomLevel === 1 ? (
                  <>
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>ACTIVATE 2.2X LOUPE</span>
                  </>
                ) : (
                  <>
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span>RESET LOUPE</span>
                  </>
                )}
              </button>
            ) : (
              <span className="text-[10px] text-[#B3936E]">
                CALIBRATED SCALE SIMULATION
              </span>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Independently Scrollable Curatorial Dossier & Sticky Footer */}
        <div className="lg:col-span-5 h-full flex flex-col border-l border-white/10 bg-[#141414] overflow-hidden">
          {/* Middle Dossier Area (Independently Scrollable with data-lenis-prevent) */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 lg:px-10 py-8 custom-scrollbar space-y-6 text-white"
            data-lenis-prevent="true"
          >
            {/* Category & Title */}
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#B3936E] uppercase block mb-1">
                {artwork.category} • Year {artwork.year}
              </span>
              <h2
                id="viewing-room-title"
                className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug"
              >
                {artwork.title}
              </h2>
              <div className="text-xs font-mono text-[#A29D94] mt-1.5">
                {artwork.artist} <span className="text-[#7E766D]">({artwork.artistDates})</span>
              </div>
            </div>

            {/* Curatorial Valuation & Institutional Status */}
            <div className="bg-[#1C1C1C] border border-white/10 p-4 rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#7E766D] uppercase block">
                  Curatorial Valuation
                </span>
                <span className="font-serif text-2xl text-[#B3936E]">
                  {artwork.valuationPHP}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono tracking-widest text-[#7E766D] uppercase block">
                  Status
                </span>
                <span className="text-xs font-mono text-emerald-400 font-medium">
                  Available for Private Treaty
                </span>
              </div>
            </div>

            {/* Curatorial Critique & Analysis */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#B3936E] uppercase block">
                Curatorial Critique &amp; Analysis
              </span>
              <p className="text-xs font-light text-[#DCD8D0] leading-relaxed">
                {artwork.curatorialNote}
              </p>
            </div>

            {/* Institutional Dossier & Provenance */}
            <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
              <span className="text-[10px] font-mono tracking-widest text-[#B3936E] uppercase block mb-2">
                Institutional Dossier &amp; Provenance
              </span>
              <div className="space-y-2 text-[#A29D94]">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#7E766D]">Medium</span>
                  <span className="text-white text-right max-w-[240px] truncate">{artwork.medium}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#7E766D]">Dimensions</span>
                  <span className="text-white">{artwork.dimensions}</span>
                </div>
                <div className="flex flex-col py-1 border-b border-white/5">
                  <span className="text-[#7E766D] mb-1">Provenance Register</span>
                  <span className="text-white text-[11px] font-light leading-relaxed">
                    {artwork.provenance}
                  </span>
                </div>
              </div>
            </div>

            {/* Exhibition & Literature History */}
            <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
              <span className="text-[10px] font-mono tracking-widest text-[#B3936E] uppercase block">
                Exhibition &amp; Literature History
              </span>
              <ul className="space-y-1.5 text-[11px] text-[#A29D94]">
                {artwork.exhibitionHistory.map((exh, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#B3936E]">•</span>
                    <span>{exh}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-white/5 border border-white/5 rounded-sm text-[10px] font-mono text-[#7E766D] flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#B3936E] shrink-0" />
              <span>
                Microclimate archival guarantee and certified bill of sale issued upon acquisition.
              </span>
            </div>
          </div>

          {/* 3. Sticky Acquisition Footer Bar (shrink-0, non-scrolling) */}
          <div className="shrink-0 border-t border-white/10 bg-[#141414]/95 backdrop-blur-md px-6 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onOpenAcquire(artwork)}
              className="flex-1 w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#8C7355] hover:bg-[#B3936E] text-white text-xs font-mono tracking-widest uppercase transition-all rounded-sm shadow-md shadow-[#8C7355]/20"
              data-cursor-text="INQUIRE"
            >
              <span>INQUIRE TO ACQUIRE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onAddToBag?.(artwork);
                setAddedToBag(true);
                setTimeout(() => setAddedToBag(false), 2000);
              }}
              className={`w-full sm:w-auto px-4 py-3 border text-xs font-mono tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-2 whitespace-nowrap ${
                addedToBag
                  ? 'bg-emerald-800/40 border-emerald-500 text-emerald-300'
                  : 'border-white/20 hover:border-[#8C7355] text-white hover:bg-white/[0.05]'
              }`}
              data-cursor-text="ADD BAG"
              title="Add Artwork to Collector Portfolio Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B3936E]" />
              <span>{addedToBag ? 'ADDED TO BAG' : '+ PORTFOLIO BAG'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={handleDownloadPDF}
                className="flex-1 sm:flex-none p-3 border border-white/15 hover:border-[#8C7355] text-[#DCD8D0] hover:text-white text-xs font-mono tracking-widest uppercase transition-colors rounded-sm flex items-center justify-center gap-1.5"
                title="Download Curatorial Dossier (PDF)"
                aria-label="Download Curatorial Dossier"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="sm:hidden text-[10px]">PDF</span>
              </button>

              <button
                onClick={handleShare}
                className="flex-1 sm:flex-none p-3 border border-white/15 hover:border-[#8C7355] text-[#DCD8D0] hover:text-white text-xs font-mono tracking-widest uppercase transition-colors rounded-sm flex items-center justify-center gap-1.5"
                title="Share Artwork"
                aria-label="Share Artwork"
              >
                {copiedLink ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
                <span className="sm:hidden text-[10px]">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
