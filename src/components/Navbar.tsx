import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Compass, ShoppingBag, Search, ChevronDown } from 'lucide-react';
import { PageView, ArtworkCategory } from '../types';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onSelectCategory?: (category: ArtworkCategory) => void;
  onOpenAcquire: () => void;
  bagCount: number;
  onOpenBag: () => void;
  onOpenSearch: () => void;
  isDarkTheme?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onSelectCategory,
  onOpenAcquire,
  bagCount,
  onOpenBag,
  onOpenSearch,
  isDarkTheme = false,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const collectionCategories: { label: string; value: ArtworkCategory }[] = [
    { label: 'All Artworks', value: 'all' },
    { label: 'Paintings', value: 'paintings' },
    { label: 'Sculptures', value: 'sculptures' },
    { label: 'Digital Art', value: 'digital' },
    { label: "Collector's Jewelry", value: 'jewelry' },
  ];

  // Scroll-Spy to observe active section when on home page
  useEffect(() => {
    if (currentView !== 'home') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['masterworks', 'tondo-sanctuary', 'artists-index', 'sanctuaries'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [currentView]);

  const handleSelectCollectionCategory = (category: ArtworkCategory) => {
    setCollectionDropdownOpen(false);
    onSelectCategory?.(category);

    if (currentView === 'home') {
      const el = document.querySelector('#masterworks');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector('#masterworks');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const handleNavClick = (link: 'collection' | 'exhibitions' | 'artists' | 'about' | 'contact') => {
    setMobileMenuOpen(false);
    setCollectionDropdownOpen(false);

    if (link === 'collection') {
      handleSelectCollectionCategory('all');
      return;
    }

    if (link === 'artists') {
      if (currentView === 'home') {
        const el = document.querySelector('#artists-index');
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('home');
        setTimeout(() => {
          const el = document.querySelector('#artists-index');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
      return;
    }

    onNavigate(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-colors duration-500 flex items-center ${
          isDarkTheme
            ? 'bg-[#121212]/90 backdrop-blur-md border-b border-white/10 text-[#F6F4F0]'
            : scrolled
            ? 'bg-[#F6F4F0]/95 backdrop-blur-md shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border-b border-[#DCD8D0] text-gallery-obsidian'
            : 'bg-[#F6F4F0]/85 backdrop-blur-sm border-b border-[#DCD8D0]/60 text-gallery-obsidian'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 h-20 flex lg:grid lg:grid-cols-[240px_1fr_auto] items-center justify-between">
          {/* Zone 1: Brand Lockup (Left, justify-self-start) */}
          <div className="flex items-center justify-start lg:justify-self-start">
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col items-start focus:outline-none focus-visible:ring-1 focus-visible:ring-gallery-bronze shrink-0 text-left"
              data-cursor-text="HISTORIA"
            >
              <span
                className={`font-serif text-2xl md:text-3xl font-normal tracking-[0.2em] uppercase leading-none transition-colors duration-500 ${
                  isDarkTheme ? 'text-white' : 'text-gallery-obsidian'
                }`}
              >
                HISTORIA
              </span>
              <span
                className={`text-[9px] font-mono tracking-[0.25em] uppercase transition-colors duration-500 mt-1 ${
                  isDarkTheme
                    ? 'text-[#A29D94] group-hover:text-[#B3936E]'
                    : 'text-gallery-muted group-hover:text-gallery-bronze'
                }`}
              >
                Fine Art Gallery & Repository
              </span>
            </button>
          </div>

          {/* Zone 2: Center Primary Navigation (5 Concise Single-Line Links, 40px gaps) */}
          <nav className="hidden lg:flex items-center justify-center lg:justify-self-center gap-10" aria-label="Curatorial Menu">
            {/* COLLECTION with Minimal Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionDropdownOpen(true)}
              onMouseLeave={() => setCollectionDropdownOpen(false)}
            >
              <button
                onClick={() => handleNavClick('collection')}
                className={`relative inline-flex items-center gap-1 text-[11px] font-mono tracking-[0.18em] uppercase transition-colors duration-300 whitespace-nowrap py-1 focus:outline-none ${
                  isDarkTheme
                    ? currentView === 'home' && activeSection === 'masterworks'
                      ? 'text-[#B3936E] font-medium'
                      : 'text-[#F6F4F0]/85 hover:text-[#B3936E]'
                    : currentView === 'home' && activeSection === 'masterworks'
                    ? 'text-gallery-bronze font-medium'
                    : 'text-gallery-obsidian/85 hover:text-gallery-bronze'
                }`}
                data-cursor-text="COLLECTION"
              >
                <span>COLLECTION</span>
                <ChevronDown className="w-3 h-3 opacity-60 stroke-[1.5]" />
                {currentView === 'home' && activeSection === 'masterworks' && (
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isDarkTheme ? 'bg-[#B3936E]' : 'bg-gallery-bronze'
                    }`}
                  />
                )}
              </button>

              {/* Minimalist Floating Category Dropdown */}
              {collectionDropdownOpen && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 py-2 rounded-sm border shadow-2xl backdrop-blur-md text-xs font-mono transition-all duration-200 z-50 animate-fadeIn ${
                    isDarkTheme
                      ? 'bg-[#121212]/95 border-white/10 text-[#F6F4F0]'
                      : 'bg-[#F6F4F0]/95 border-[#DCD8D0] text-gallery-obsidian'
                  }`}
                >
                  <div className="px-4 py-1 text-[9px] font-mono tracking-widest uppercase text-gallery-muted border-b border-white/5 pb-1 mb-1">
                    Fine Art Catalog Pillars
                  </div>
                  {collectionCategories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleSelectCollectionCategory(cat.value)}
                      className={`px-4 py-2 text-[10px] tracking-wider uppercase block text-left w-full transition-colors ${
                        isDarkTheme
                          ? 'hover:bg-white/10 hover:text-[#B3936E]'
                          : 'hover:bg-black/5 hover:text-gallery-bronze'
                      }`}
                      data-cursor-text={cat.label.toUpperCase()}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* EXHIBITIONS */}
            <button
              onClick={() => handleNavClick('exhibitions')}
              className={`relative text-[11px] font-mono tracking-[0.18em] uppercase transition-colors duration-300 whitespace-nowrap py-1 focus:outline-none ${
                isDarkTheme
                  ? currentView === 'exhibitions'
                    ? 'text-[#B3936E] font-medium'
                    : 'text-[#F6F4F0]/85 hover:text-[#B3936E]'
                  : currentView === 'exhibitions'
                  ? 'text-gallery-bronze font-medium'
                  : 'text-gallery-obsidian/85 hover:text-gallery-bronze'
              }`}
              data-cursor-text="EXHIBITS"
            >
              <span>EXHIBITIONS</span>
              {currentView === 'exhibitions' && (
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isDarkTheme ? 'bg-[#B3936E]' : 'bg-gallery-bronze'
                  }`}
                />
              )}
            </button>

            {/* ARTISTS */}
            <button
              onClick={() => handleNavClick('artists')}
              className={`relative text-[11px] font-mono tracking-[0.18em] uppercase transition-colors duration-300 whitespace-nowrap py-1 focus:outline-none ${
                isDarkTheme
                  ? currentView === 'home' && activeSection === 'artists-index'
                    ? 'text-[#B3936E] font-medium'
                    : 'text-[#F6F4F0]/85 hover:text-[#B3936E]'
                  : currentView === 'home' && activeSection === 'artists-index'
                  ? 'text-gallery-bronze font-medium'
                  : 'text-gallery-obsidian/85 hover:text-gallery-bronze'
              }`}
              data-cursor-text="ARTISTS"
            >
              <span>ARTISTS</span>
              {currentView === 'home' && activeSection === 'artists-index' && (
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isDarkTheme ? 'bg-[#B3936E]' : 'bg-gallery-bronze'
                  }`}
                />
              )}
            </button>

            {/* ABOUT */}
            <button
              onClick={() => handleNavClick('about')}
              className={`relative text-[11px] font-mono tracking-[0.18em] uppercase transition-colors duration-300 whitespace-nowrap py-1 focus:outline-none ${
                isDarkTheme
                  ? currentView === 'about'
                    ? 'text-[#B3936E] font-medium'
                    : 'text-[#F6F4F0]/85 hover:text-[#B3936E]'
                  : currentView === 'about'
                  ? 'text-gallery-bronze font-medium'
                  : 'text-gallery-obsidian/85 hover:text-gallery-bronze'
              }`}
              data-cursor-text="ABOUT"
            >
              <span>ABOUT</span>
              {currentView === 'about' && (
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isDarkTheme ? 'bg-[#B3936E]' : 'bg-gallery-bronze'
                  }`}
                />
              )}
            </button>

            {/* CONTACT */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`relative text-[11px] font-mono tracking-[0.18em] uppercase transition-colors duration-300 whitespace-nowrap py-1 focus:outline-none ${
                isDarkTheme
                  ? currentView === 'contact'
                    ? 'text-[#B3936E] font-medium'
                    : 'text-[#F6F4F0]/85 hover:text-[#B3936E]'
                  : currentView === 'contact'
                  ? 'text-gallery-bronze font-medium'
                  : 'text-gallery-obsidian/85 hover:text-gallery-bronze'
              }`}
              data-cursor-text="CONTACT"
            >
              <span>CONTACT</span>
              {currentView === 'contact' && (
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isDarkTheme ? 'bg-[#B3936E]' : 'bg-gallery-bronze'
                  }`}
                />
              )}
            </button>
          </nav>

          {/* Zone 3: Right Utility & Concierge Cluster (32px left padding & 1px hairline divider) */}
          <div
            className={`hidden sm:flex items-center justify-end lg:justify-self-end gap-6 pl-8 border-l shrink-0 transition-colors duration-500 ${
              isDarkTheme ? 'border-white/15' : 'border-[#DCD8D0]'
            }`}
          >
            {/* Minimalist Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-sm transition-colors duration-300 focus:outline-none ${
                isDarkTheme
                  ? 'text-[#F6F4F0] hover:text-[#B3936E]'
                  : 'text-gallery-obsidian hover:text-gallery-bronze'
              }`}
              title="Search Artworks, Artists & Exhibitions (⌘K)"
              aria-label="Search Collection"
              data-cursor-text="SEARCH"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>

            {/* Portfolio Bag Trigger */}
            <button
              onClick={onOpenBag}
              className={`inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.16em] uppercase px-3.5 py-2 rounded-sm border transition-all duration-300 whitespace-nowrap ${
                isDarkTheme
                  ? 'border-white/20 text-[#F6F4F0] hover:border-[#B3936E] hover:text-[#B3936E] bg-white/[0.04]'
                  : 'border-[#DCD8D0] text-gallery-obsidian hover:border-gallery-bronze hover:text-gallery-bronze bg-white/60'
              }`}
              data-cursor-text="BAG"
              title="Open Collector Acquisition Portfolio"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-gallery-bronze stroke-[1.5]" />
              <span>BAG ({bagCount})</span>
            </button>

            {/* Dark Obsidian CTA */}
            <button
              onClick={onOpenAcquire}
              className={`inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.16em] uppercase px-5 py-2.5 rounded-sm transition-all duration-500 shadow-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-gallery-bronze ${
                isDarkTheme
                  ? 'bg-[#8C7355] text-white hover:bg-[#B3936E] border border-[#B3936E]/40'
                  : 'bg-gallery-obsidian text-gallery-alabaster hover:bg-gallery-bronze hover:text-white'
              }`}
              data-cursor-text="VIEWING"
            >
              <span>PRIVATE VIEWING</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.25]" />
            </button>
          </div>

          {/* Mobile Menu & Utility Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className={`p-2 transition-colors duration-300 ${
                isDarkTheme ? 'text-white' : 'text-gallery-obsidian'
              }`}
              aria-label="Open Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={onOpenBag}
              className={`p-2 transition-colors duration-300 relative ${
                isDarkTheme ? 'text-white' : 'text-gallery-obsidian'
              }`}
              aria-label="Open Acquisition Bag"
            >
              <ShoppingBag className="w-5 h-5 text-gallery-bronze" />
              {bagCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gallery-bronze text-white text-[9px] font-mono flex items-center justify-center">
                  {bagCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-gallery-bronze ${
                isDarkTheme
                  ? 'text-white hover:text-[#B3936E]'
                  : 'text-gallery-obsidian hover:text-gallery-bronze'
              }`}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.25]" /> : <Menu className="w-6 h-6 stroke-[1.25]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gallery-obsidian/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-[#F6F4F0] p-8 flex flex-col justify-between border-l border-[#DCD8D0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#DCD8D0]">
                <div>
                  <span className="font-serif text-xl tracking-[0.18em] uppercase text-gallery-obsidian block">
                    HISTORIA
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-gallery-muted uppercase">
                    Fine Art Institution • 2015
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-gallery-muted hover:text-gallery-obsidian"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5 stroke-[1.25]" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4" aria-label="Mobile Navigation">
                <button
                  onClick={() => handleNavClick('collection')}
                  className="text-sm font-mono tracking-widest uppercase text-gallery-obsidian hover:text-gallery-bronze transition-colors flex items-center justify-between py-2 border-b border-dashed border-[#DCD8D0]/50 text-left"
                >
                  <span>COLLECTION</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[1.25] text-gallery-bronze opacity-60" />
                </button>

                <button
                  onClick={() => handleNavClick('exhibitions')}
                  className="text-sm font-mono tracking-widest uppercase text-gallery-obsidian hover:text-gallery-bronze transition-colors flex items-center justify-between py-2 border-b border-dashed border-[#DCD8D0]/50 text-left"
                >
                  <span>EXHIBITIONS</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[1.25] text-gallery-bronze opacity-60" />
                </button>

                <button
                  onClick={() => handleNavClick('artists')}
                  className="text-sm font-mono tracking-widest uppercase text-gallery-obsidian hover:text-gallery-bronze transition-colors flex items-center justify-between py-2 border-b border-dashed border-[#DCD8D0]/50 text-left"
                >
                  <span>ARTISTS</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[1.25] text-gallery-bronze opacity-60" />
                </button>

                <button
                  onClick={() => handleNavClick('about')}
                  className="text-sm font-mono tracking-widest uppercase text-gallery-obsidian hover:text-gallery-bronze transition-colors flex items-center justify-between py-2 border-b border-dashed border-[#DCD8D0]/50 text-left"
                >
                  <span>ABOUT</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[1.25] text-gallery-bronze opacity-60" />
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="text-sm font-mono tracking-widest uppercase text-gallery-obsidian hover:text-gallery-bronze transition-colors flex items-center justify-between py-2 border-b border-dashed border-[#DCD8D0]/50 text-left"
                >
                  <span>CONTACT</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[1.25] text-gallery-bronze opacity-60" />
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#DCD8D0] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase py-3 border border-[#DCD8D0] bg-white text-gallery-obsidian hover:border-gallery-bronze"
              >
                <Search className="w-4 h-4 text-gallery-bronze" />
                <span>Search Repository (⌘K)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBag();
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase py-3 border border-[#DCD8D0] bg-white text-gallery-obsidian hover:border-gallery-bronze"
              >
                <ShoppingBag className="w-4 h-4 text-gallery-bronze" />
                <span>Collector Bag ({bagCount})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAcquire();
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase py-3.5 bg-gallery-obsidian text-gallery-alabaster hover:bg-gallery-bronze transition-colors"
              >
                <Compass className="w-4 h-4 stroke-[1.25]" />
                <span>Book Private Viewing</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
