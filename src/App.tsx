import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { MagneticCursor } from './components/MagneticCursor';
import { HeroSection } from './components/HeroSection';
import { DarkGalleryWing } from './components/DarkGalleryWing';
import { CuratedMasterworks } from './components/CuratedMasterworks';
import { ArtistsIndex } from './components/ArtistsIndex';
import { SanctuariesSection } from './components/SanctuariesSection';
import { Footer } from './components/Footer';
import { ViewingRoomModal } from './components/ViewingRoomModal';
import { GalleryScaleView } from './components/GalleryScaleView';
import { AcquireModal } from './components/AcquireModal';
import { PanoramaModal } from './components/PanoramaModal';
import { AcquisitionBagDrawer } from './components/AcquisitionBagDrawer';
import { PolicyModal, PolicyTab } from './components/PolicyModal';
import { SearchOverlay } from './components/SearchOverlay';

import { ExhibitionsPage } from './components/ExhibitionsPage';
import { AboutSpacesPage } from './components/AboutSpacesPage';
import { ContactPage } from './components/ContactPage';

import { ARTWORKS_DATA } from './data/artworks';
import { ARTISTS_DATA } from './data/artists';
import { SANCTUARIES_DATA } from './data/sanctuaries';
import { Artwork, ArtworkCategory, PageView } from './types';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [viewingRoomMode, setViewingRoomMode] = useState<'study' | 'scale'>('study');
  const [scaleArtwork, setScaleArtwork] = useState<Artwork | null>(null);
  const [acquireArtwork, setAcquireArtwork] = useState<Artwork | null>(null);
  const [isAcquireOpen, setIsAcquireOpen] = useState<boolean>(false);
  const [isPanoramaOpen, setIsPanoramaOpen] = useState<boolean>(false);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [bagItems, setBagItems] = useState<Artwork[]>([ARTWORKS_DATA[2]]); // Seed with 1 curated item for immediate discoverability
  const [isPolicyOpen, setIsPolicyOpen] = useState<boolean>(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>('faq');
  const [isDarkHeader, setIsDarkHeader] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ArtworkCategory>('all');
  const [focusedArtistId, setFocusedArtistId] = useState<string | null>(null);
  const [highlightedSanctuaryId, setHighlightedSanctuaryId] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scrolling synchronized with GSAP ScrollTrigger
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Context-Aware Sticky Header: Detect overlap with BOTH dark sections (#tondo-sanctuary & #architectural-footer)
  useEffect(() => {
    const checkDarkHeader = () => {
      const headerThreshold = 80;
      const tondo = document.getElementById('tondo-sanctuary');
      const footer = document.getElementById('architectural-footer');

      let isOverDark = false;

      if (tondo && currentView === 'home') {
        const rect = tondo.getBoundingClientRect();
        if (rect.top <= headerThreshold && rect.bottom >= headerThreshold) {
          isOverDark = true;
        }
      }

      if (!isOverDark && footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top <= headerThreshold && rect.bottom >= 0) {
          isOverDark = true;
        }
      }

      setIsDarkHeader(isOverDark);
    };

    window.addEventListener('scroll', checkDarkHeader, { passive: true });
    window.addEventListener('resize', checkDarkHeader, { passive: true });
    checkDarkHeader();

    return () => {
      window.removeEventListener('scroll', checkDarkHeader);
      window.removeEventListener('resize', checkDarkHeader);
    };
  }, [currentView]);

  const isModalOpen =
    selectedArtwork !== null ||
    scaleArtwork !== null ||
    isAcquireOpen ||
    isPanoramaOpen ||
    isBagOpen ||
    isPolicyOpen ||
    isSearchOpen;

  // Lock body scroll and pause Lenis while modals or drawers are active
  useEffect(() => {
    if (isModalOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleOpenArtwork = (artwork: Artwork, mode: 'study' | 'scale' = 'study') => {
    setViewingRoomMode(mode);
    setSelectedArtwork(artwork);
  };

  const handleOpenScaleView = (artwork: Artwork) => {
    setScaleArtwork(artwork);
  };

  const handleOpenAcquire = (artwork?: Artwork) => {
    setAcquireArtwork(artwork || null);
    setIsAcquireOpen(true);
  };

  const handleAddToBag = (artwork: Artwork) => {
    setBagItems((prev) => {
      if (prev.some((item) => item.id === artwork.id)) return prev;
      return [...prev, artwork];
    });
  };

  const handleRemoveFromBag = (id: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const handleOpenPolicy = (tab: PolicyTab) => {
    setPolicyTab(tab);
    setIsPolicyOpen(true);
  };

  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroArtwork = ARTWORKS_DATA[0];
  const tondoArtwork = ARTWORKS_DATA[1];

  return (
    <div className="relative min-h-screen bg-gallery-alabaster text-gallery-obsidian gallery-grain">
      {/* Magnetic Curatorial Cursor */}
      <MagneticCursor isModalOpen={isModalOpen} />

      {/* Context-Aware Primary Header with Bag Counter & Client-Side Multi-View Routing */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onSelectCategory={setSelectedCategory}
        onOpenAcquire={() => handleOpenAcquire()}
        bagCount={bagItems.length}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkTheme={isDarkHeader}
      />

      {/* Multi-View Sub-Routes with Seamless Client-Side Navigation */}
      <main id="main-content" className="transition-opacity duration-300">
        {currentView === 'home' && (
          <>
            {/* Monumental Hero Curtain Reveal & Parallax in 12-Col Split Stage */}
            <HeroSection
              heroArtwork={heroArtwork}
              onOpenArtwork={(art) => handleOpenArtwork(art, 'study')}
              onOpenAcquire={() => handleOpenAcquire(heroArtwork)}
            />

            {/* Dark Gallery Wing: Circular Tondo Spotlight */}
            <DarkGalleryWing
              tondoArtwork={tondoArtwork}
              onOpenArtwork={handleOpenArtwork}
              onOpenScaleView={handleOpenScaleView}
            />

            {/* Filterable Curated Masterworks Wall (Paintings, Sculptures, Digital Art, Jewelry) */}
            <CuratedMasterworks
              artworks={ARTWORKS_DATA}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onOpenArtwork={(art) => handleOpenArtwork(art, 'study')}
              onOpenScaleView={handleOpenScaleView}
              onOpenAcquire={(art) => handleOpenAcquire(art)}
              onAddToBag={handleAddToBag}
            />

            {/* Master Artists Curatorial Index (Canonical vs Contemporary Roster Toggle) */}
            <ArtistsIndex
              artists={ARTISTS_DATA}
              artworks={ARTWORKS_DATA}
              focusedArtistId={focusedArtistId}
              onSelectArtwork={(art) => handleOpenArtwork(art, 'study')}
              onOpenAcquire={(art) => handleOpenAcquire(art)}
            />

            {/* Manila Gallery Spaces & 3D Virtual Tour (Architectural Hairline Columns) */}
            <SanctuariesSection
              sanctuaries={SANCTUARIES_DATA}
              highlightedSanctuaryId={highlightedSanctuaryId}
              onOpenAcquire={() => handleOpenAcquire()}
              onOpenPanorama={() => setIsPanoramaOpen(true)}
            />
          </>
        )}

        {currentView === 'exhibitions' && (
          <ExhibitionsPage
            onOpenAcquire={() => handleOpenAcquire()}
            onOpenTondo={() => {
              setCurrentView('home');
              setTimeout(() => {
                document.querySelector('#tondo-sanctuary')?.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
          />
        )}

        {currentView === 'about' && (
          <AboutSpacesPage
            onOpenPanorama={() => setIsPanoramaOpen(true)}
            onOpenAcquire={() => handleOpenAcquire()}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Curatorial Footer with Wired Directory Links & Monumental Facade Wordmark */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onSelectArtist={(artistId) => setFocusedArtistId(artistId)}
        onSelectSanctuary={(sanctuaryId) => {
          setHighlightedSanctuaryId(sanctuaryId);
          setTimeout(() => setHighlightedSanctuaryId(null), 3000);
        }}
        onNavigate={handleNavigate}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Collector Acquisition Bag Drawer */}
      <AcquisitionBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        bagItems={bagItems}
        onRemoveItem={handleRemoveFromBag}
        onClearBag={handleClearBag}
        onOpenArtwork={(art) => {
          setIsBagOpen(false);
          handleOpenArtwork(art, 'study');
        }}
      />

      {/* Curatorial Full-Width Instant Search Overlay (⌘K) */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArtwork={(art) => handleOpenArtwork(art, 'study')}
        onSelectArtist={(artistId) => {
          setCurrentView('home');
          setFocusedArtistId(artistId);
          setTimeout(() => {
            document.querySelector('#artists-index')?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
        onSelectExhibition={() => {
          setCurrentView('exhibitions');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Institutional Governance & FAQ Modal */}
      <PolicyModal
        isOpen={isPolicyOpen}
        initialTab={policyTab}
        onClose={() => setIsPolicyOpen(false)}
      />

      {/* Interactive Grand Salon 3D Photogrammetry Panorama Inspector */}
      {isPanoramaOpen && (
        <PanoramaModal
          isOpen={isPanoramaOpen}
          onClose={() => setIsPanoramaOpen(false)}
          onBookVisit={() => {
            setIsPanoramaOpen(false);
            handleOpenAcquire();
          }}
        />
      )}

      {/* Museum Viewing Room Modal with Deep-Linked Initial View Mode & Bag Support */}
      {selectedArtwork && (
        <ViewingRoomModal
          artwork={selectedArtwork}
          artworks={ARTWORKS_DATA}
          initialViewMode={viewingRoomMode}
          onSelectArtwork={handleOpenArtwork}
          onClose={() => setSelectedArtwork(null)}
          onOpenScaleView={(art) => {
            setSelectedArtwork(null);
            setScaleArtwork(art);
          }}
          onOpenAcquire={(art) => {
            setSelectedArtwork(null);
            handleOpenAcquire(art);
          }}
          onAddToBag={handleAddToBag}
        />
      )}

      {/* Architectural Gallery Scale Simulation Modal (170cm Collector Silhouette) */}
      {scaleArtwork && (
        <GalleryScaleView
          artwork={scaleArtwork}
          onClose={() => setScaleArtwork(null)}
        />
      )}

      {/* Private Concierge Acquisition Modal */}
      {isAcquireOpen && (
        <AcquireModal
          artwork={acquireArtwork}
          onClose={() => {
            setIsAcquireOpen(false);
            setAcquireArtwork(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
