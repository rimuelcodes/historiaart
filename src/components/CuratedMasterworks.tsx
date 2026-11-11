import React, { useState, useMemo } from 'react';
import { Eye, Scale, ArrowRight, ShoppingBag } from 'lucide-react';
import { Artwork, ArtworkCategory } from '../types';

interface CuratedMasterworksProps {
  artworks: Artwork[];
  selectedCategory?: ArtworkCategory;
  onSelectCategory?: (category: ArtworkCategory) => void;
  onOpenArtwork: (artwork: Artwork) => void;
  onOpenScaleView: (artwork: Artwork) => void;
  onOpenAcquire: (artwork: Artwork) => void;
  onAddToBag?: (artwork: Artwork) => void;
}

export const CuratedMasterworks: React.FC<CuratedMasterworksProps> = ({
  artworks,
  selectedCategory,
  onSelectCategory,
  onOpenArtwork,
  onOpenScaleView,
  onOpenAcquire,
  onAddToBag,
}) => {
  const [internalCategory, setInternalCategory] = useState<ArtworkCategory>('all');
  const activeCategory = selectedCategory !== undefined ? selectedCategory : internalCategory;

  const handleCategoryClick = (category: ArtworkCategory) => {
    setInternalCategory(category);
    onSelectCategory?.(category);
  };

  const categories: { label: string; value: ArtworkCategory }[] = [
    { label: 'All Works', value: 'all' },
    { label: 'Paintings', value: 'paintings' },
    { label: 'Sculptures', value: 'sculptures' },
    { label: 'Digital Art', value: 'digital' },
    { label: "Collector's Jewelry", value: 'jewelry' },
  ];

  // Exclude BOTH Hero Centerpiece (luna-academic-conclave) AND Section 2 Tondo (amorsolo-golden-hour-tondo)
  // so every single card in Curated Masterworks is 100% unique!
  const distinctArtworks = useMemo(() => {
    return artworks.filter(
      (item) => item.id !== 'luna-academic-conclave' && item.id !== 'amorsolo-golden-hour-tondo'
    );
  }, [artworks]);

  const filteredArtworks = useMemo(() => {
    if (activeCategory === 'all') return distinctArtworks;
    return distinctArtworks.filter((item) => item.category === activeCategory);
  }, [distinctArtworks, activeCategory]);

  // Salon hang vertical offset per column in a 3-col layout
  const getSalonOffsetClass = (index: number) => {
    const col = index % 3;
    if (col === 0) return 'lg:mt-0';
    if (col === 1) return 'lg:mt-14';
    return 'lg:mt-6';
  };

  return (
    <section id="masterworks" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DCD8D0] pb-6 mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-gallery-bronze uppercase mb-2">
            <span>Catalogue Raisonné</span>
            <span className="text-[#DCD8D0]">•</span>
            <span>Permanent Repository</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-gallery-obsidian tracking-tight">
            Curated Masterworks
          </h2>
          <p className="text-gallery-muted text-xs sm:text-sm font-light mt-2 max-w-xl leading-relaxed">
            Salon hang presentation. Each work is accessioned with verified provenance, physical spectroscopic analysis, and institutional ownership records.
          </p>
        </div>

        {/* Minimalist Category Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-mono tracking-widest uppercase">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`px-4 py-2 rounded-sm transition-all duration-300 border ${
                activeCategory === cat.value
                  ? 'bg-gallery-obsidian text-gallery-alabaster border-gallery-obsidian shadow-sm'
                  : 'bg-white/60 text-gallery-muted hover:text-gallery-obsidian border-[#DCD8D0] hover:border-gallery-bronze'
              }`}
              data-cursor-text={cat.label.toUpperCase()}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetrical Editorial Salon Hang (Zero Letterboxing, Natural Frames) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-12 gap-y-16 lg:gap-y-24 items-start">
        {filteredArtworks.map((artwork, idx) => (
          <div
            key={artwork.id}
            className={`group flex flex-col transition-all duration-500 ${getSalonOffsetClass(
              idx
            )}`}
            data-artwork-card="true"
          >
            {/* Museum Matting Frame Floating Directly on Alabaster Wall */}
            <div
              onClick={() => onOpenArtwork(artwork)}
              className="relative cursor-pointer"
              data-cursor-text="EXAMINE"
            >
              {/* If circular tondo: pure rounded-full border with zero rectangular mat box behind it */}
              <div
                className={`relative transition-all duration-500 group-hover:border-gallery-bronze ${
                  artwork.isTondo
                    ? 'rounded-full aspect-square border-2 border-[#8C7355]/60 shadow-[0_20px_50px_rgba(0,0,0,0.20)] p-2 max-w-[320px] mx-auto bg-transparent'
                    : 'bg-[#EDE9E1] p-3 sm:p-4 rounded-sm border border-[#D5CFC3] shadow-[0_24px_48px_-12px_rgba(18,18,18,0.18)] group-hover:shadow-[0_32px_60px_-15px_rgba(18,18,18,0.28)]'
                }`}
              >
                {/* Clean Canvas */}
                <div
                  className={`relative overflow-hidden ${
                    artwork.isTondo ? 'rounded-full w-full h-full' : 'w-full'
                  }`}
                >
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className={`w-full ${
                      artwork.isTondo ? 'h-full object-cover rounded-full' : 'h-auto object-cover'
                    } block transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                    loading="lazy"
                  />

                  {/* Curatorial Inspection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-white">
                    <span className="text-[9px] font-mono tracking-widest text-[#B3936E] uppercase">
                      Inspect Work
                    </span>
                    <span className="text-[10px] font-mono text-white/80">
                      {artwork.dimensions}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimalist Borderless Museum Placard Beneath Frame */}
            <div className="mt-4 pt-1 space-y-1.5 px-0.5">
              {/* Single-Line Small-Caps Catalog ID & Artist (Truncated to Prevent Wrapping) */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.16em] uppercase gap-2 min-w-0">
                <span className="text-gallery-bronze truncate whitespace-nowrap min-w-0 pr-1">
                  {artwork.catalogId} • {artwork.artist}
                </span>
                <span className="text-gallery-obsidian font-semibold whitespace-nowrap shrink-0">
                  {artwork.valuationPHP}
                </span>
              </div>

              {/* Italicized Title */}
              <h3
                onClick={() => onOpenArtwork(artwork)}
                className="font-serif italic text-xl sm:text-2xl text-gallery-obsidian font-normal group-hover:text-gallery-bronze transition-colors cursor-pointer leading-snug line-clamp-1"
              >
                {artwork.title}
                <span className="font-mono not-italic text-xs text-gallery-muted ml-2 font-light">
                  ({artwork.year})
                </span>
              </h3>

              {/* Medium & Dimensions */}
              <div className="text-[11px] font-mono text-gallery-muted truncate">
                {artwork.medium} — {artwork.dimensions}
              </div>

              {/* Sleek Hairline Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#DCD8D0]/60 text-xs font-mono">
                <button
                  onClick={() => onOpenAcquire(artwork)}
                  className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-gallery-bronze border-b border-gallery-bronze/40 hover:border-gallery-bronze hover:text-gallery-obsidian transition-colors pb-0.5"
                  data-cursor-text="INQUIRE"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3 h-3 stroke-[1.25]" />
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToBag?.(artwork);
                    }}
                    className="text-[10px] uppercase text-gallery-muted hover:text-gallery-bronze transition-colors flex items-center gap-1"
                    data-cursor-text="ADD BAG"
                    title="Add to Portfolio Bag"
                  >
                    <ShoppingBag className="w-3 h-3 text-gallery-bronze" />
                    <span>+ Bag</span>
                  </button>

                  <button
                    onClick={() => onOpenArtwork(artwork)}
                    className="text-[10px] uppercase text-gallery-muted hover:text-gallery-obsidian transition-colors flex items-center gap-1"
                    data-cursor-text="DOSSIER"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Dossier</span>
                  </button>

                  <button
                    onClick={() => onOpenScaleView(artwork)}
                    className="text-[10px] uppercase text-gallery-muted hover:text-gallery-obsidian transition-colors flex items-center gap-1"
                    title="Scale Comparison"
                    data-cursor-text="SCALE"
                  >
                    <Scale className="w-3 h-3" />
                    <span>Scale</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
