import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { Artwork } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  heroArtwork: Artwork;
  onOpenArtwork: (artwork: Artwork) => void;
  onOpenAcquire: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroArtwork,
  onOpenArtwork,
  onOpenAcquire,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered left column editorial entrance
      tl.fromTo(
        leftColRef.current ? leftColRef.current.children : [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, delay: 0.1 }
      );

      // Smooth frame reveal for hero masterpiece
      tl.fromTo(
        rightColRef.current,
        { scale: 0.97, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' },
        '-=0.7'
      );

      // Subtle parallax on scroll
      if (imageRef.current && containerRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-24 pb-10 md:pb-12 px-6 md:px-12 max-w-7xl mx-auto min-h-[calc(100svh-80px)] lg:max-h-[890px] flex flex-col justify-center overflow-hidden"
    >
      {/* Streamlined Sub-Header Exhibition Ticker Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 md:mb-5 text-[10px] font-mono tracking-[0.2em] text-gallery-muted border-b border-[#DCD8D0] pb-2 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gallery-bronze animate-pulse" />
          <span className="uppercase text-gallery-obsidian font-semibold tracking-wider">
            Flagship Exhibition 2026
          </span>
          <span className="text-[#DCD8D0]">•</span>
          <span className="hidden sm:inline uppercase">
            Catalogue Raisonné Vol. VIII
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 tracking-widest uppercase text-gallery-muted text-[9px] sm:text-[10px]">
          <span>GREENHILLS</span>
          <span className="text-[#DCD8D0]">•</span>
          <span>MEGAMALL</span>
          <span className="text-[#DCD8D0]">•</span>
          <span>TIENDESITAS</span>
          <span className="text-[#DCD8D0]">•</span>
          <span>KATIPUNAN</span>
        </div>
      </div>

      {/* Asymmetrical 12-Column Split Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center flex-1 my-auto">
        {/* Left Column (5 cols): Editorial Headline & Side-by-Side CTAs */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 flex flex-col justify-center space-y-4 lg:pr-2"
        >
          {/* Archival Badge */}
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] text-gallery-bronze uppercase">
            <Sparkles className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Manila • Est. 2015 • Salon Flagship</span>
          </div>

          {/* Tightened Monumental Serif Headline */}
          <div className="space-y-0.5">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight leading-[0.98] text-gallery-obsidian font-light">
              WHERE HISTORY MEETS
            </h1>
            <h1 className="font-serif italic text-3xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight leading-[0.98] text-gallery-bronze font-light">
              Contemporary Mastery.
            </h1>
          </div>

          {/* Curatorial Lead Paragraph */}
          <p className="text-gallery-muted text-xs sm:text-sm font-light leading-relaxed max-w-lg">
            Founded in 2015, Historia Art Gallery safeguards canonical 19th-century academic masterworks alongside luminous Philippine Modernism under institutional microclimate conservation.
          </p>

          {/* Curatorial Spec Pill (Untruncated) */}
          <div className="border border-[#DCD8D0] bg-white/70 backdrop-blur-sm p-3 rounded-sm flex items-center justify-between text-xs font-mono max-w-md">
            <div>
              <span className="text-[9px] text-gallery-muted uppercase tracking-widest block">
                Current Centerpiece
              </span>
              <span className="font-serif text-sm text-gallery-obsidian font-medium block leading-snug">
                The Academic Conclave
              </span>
              <span className="text-[10px] text-gallery-muted font-mono block">
                Juan Luna &amp; Rembrandt Study
              </span>
            </div>
            <div className="text-right shrink-0 pl-3">
              <span className="text-[9px] text-gallery-bronze uppercase tracking-widest block">
                Valuation
              </span>
              <span className="text-gallery-obsidian font-mono font-medium text-xs">
                {heroArtwork.valuationPHP}
              </span>
            </div>
          </div>

          {/* Side-by-Side Hero CTAs (Horizontal Flex Row) */}
          <div className="flex flex-wrap items-center gap-3 pt-1 whitespace-nowrap">
            <button
              onClick={() => onOpenArtwork(heroArtwork)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gallery-bronze text-white text-[11px] font-mono tracking-[0.16em] uppercase hover:bg-gallery-bronzedark transition-all duration-300 shadow-sm"
              data-cursor-text="EXAMINE"
            >
              <Eye className="w-3.5 h-3.5 stroke-[1.25]" />
              <span>ENTER VIEWING ROOM</span>
            </button>

            <button
              onClick={onOpenAcquire}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm border border-[#DCD8D0] hover:border-gallery-bronze bg-white/70 hover:bg-white text-gallery-obsidian text-[11px] font-mono tracking-[0.16em] uppercase transition-all duration-300"
              data-cursor-text="INQUIRE"
            >
              <span>CURATORIAL ADVISORY</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.25]" />
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Soft Archival Museum Matting with 100% Unobstructed Canvas */}
        <div
          ref={rightColRef}
          className="lg:col-span-7 relative flex flex-col items-center justify-center"
        >
          {/* Subtle Ambient Gallery Spotlight */}
          <div
            className="pointer-events-none absolute -inset-8 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 65% 65% at 50% 45%, rgba(179, 147, 110, 0.20) 0%, transparent 70%)',
            }}
          />

          {/* Floating Museum Frame */}
          <div
            onClick={() => onOpenArtwork(heroArtwork)}
            className="relative cursor-pointer group w-full"
            data-artwork-card="true"
            data-cursor-text="EXAMINE"
          >
            {/* Soft Archival Museum Matting (bg-[#EDEAE4]/70) */}
            <div className="relative bg-[#EDEAE4]/70 p-3 sm:p-5 md:p-6 rounded-sm border border-[#DCD8D0] shadow-[0_20px_50px_-12px_rgba(18,18,18,0.22)] transition-all duration-500 group-hover:border-gallery-bronze">
              {/* Painting Canvas (100% Unobstructed - Zero Overlaid Badges) */}
              <div className="relative overflow-hidden bg-[#1A1A1A] border border-[#2B231A]">
                <img
                  ref={imageRef}
                  src={heroArtwork.image}
                  alt={heroArtwork.title}
                  className="w-full h-auto max-h-[48vh] lg:max-h-[50vh] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Subtle Ambient Vignette on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5 text-white">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#B3936E] uppercase block">
                      Click to Inspect in High-Resolution Loupe
                    </span>
                    <span className="font-serif text-base sm:text-lg font-light">
                      {heroArtwork.title}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#B3936E] uppercase bg-black/60 px-2.5 py-1 rounded-sm border border-[#8C7355]/40">
                    <Eye className="w-3 h-3 stroke-[1.25]" />
                    <span>Loupe 2.2x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Single Baseline Curatorial Placard Beneath Artwork */}
            <div className="mt-3 flex items-baseline justify-between text-xs font-mono px-1 border-t border-[#DCD8D0]/60 pt-2.5">
              <div className="flex items-baseline gap-2">
                <span className="font-serif italic text-sm sm:text-base text-gallery-obsidian font-normal">
                  The Academic Conclave
                </span>
                <span className="text-gallery-muted text-[11px] font-mono hidden sm:inline">
                  — Juan Luna &amp; Rembrandt Study (1887)
                </span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-gallery-muted uppercase shrink-0 ml-3">
                ACC. {heroArtwork.catalogId} • 240 × 160 CM • OIL ON BELGIAN LINEN
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
