import React, { useState } from 'react';
import { ArrowUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ArtworkCategory, PageView } from '../types';
import { PolicyTab } from './PolicyModal';

interface FooterProps {
  onSelectCategory?: (category: ArtworkCategory) => void;
  onSelectArtist?: (artistId: string) => void;
  onSelectSanctuary?: (sanctuaryId: string) => void;
  onNavigate?: (view: PageView) => void;
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectArtist,
  onSelectSanctuary,
  onNavigate,
  onOpenPolicy,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer
      id="architectural-footer"
      className="bg-[#121212] text-[#F6F4F0] pt-24 pb-12 px-6 md:px-12 border-t border-[#222222] relative z-20 select-none"
      data-dark-theme="true"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Monogram & Curator Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#242424]">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.2em] uppercase text-white font-normal">
                HISTORIA
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#B3936E] border border-[#8C7355]/40 px-2 py-0.5 rounded-sm">
                FOUNDED 2015
              </span>
            </div>
            <p className="text-xs sm:text-sm font-light text-[#A29D94] max-w-lg leading-relaxed">
              Historia Art Gallery serves as a flagship fine art repository dedicated to the preservation, scholarship, and curatorial presentation of canonical Philippine masterworks and international classical fine art.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B3936E]">
              <ShieldCheck className="w-4 h-4 stroke-[1.25]" />
              <span>Full Provenance Guarantee & Microclimate Conservation</span>
            </div>
          </div>

          {/* Curatorial Newsletter for Confidential Releases */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-[#B3936E] uppercase block">
              Private Curatorial Gazette
            </span>
            <p className="text-xs font-light text-[#A29D94]">
              Receive privileged notices for uncatalogued acquisitions, private treaty previews, and exhibition vernissages.
            </p>

            {isSubscribed ? (
              <div className="py-3 px-4 bg-[#8C7355]/15 border border-[#8C7355]/60 text-[#F6F4F0] text-xs font-mono rounded-sm flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#B3936E] shrink-0 stroke-[1.5]" />
                <span className="tracking-wide">
                  Invitation Registered — Welcome to the Private Curatorial Gazette
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="collector@domain.com"
                  className="flex-1 bg-[#1A1A1A] border border-[#2C2C2C] focus:border-[#8C7355] px-4 py-2.5 text-xs text-white rounded-sm outline-none font-mono transition-colors"
                />
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#8C7355] text-white text-xs font-mono tracking-widest uppercase hover:bg-[#B3936E] transition-colors rounded-sm whitespace-nowrap"
                  data-cursor-text="JOIN"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation & Pavilion Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#242424] text-xs font-mono text-[#A29D94]">
          {/* Permanent Collection */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#B3936E] uppercase tracking-widest block font-medium">
              Permanent Collection
            </span>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      onSelectCategory?.('paintings');
                      scrollToSection('#masterworks');
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="FILTER"
                >
                  19th C. Academic Masters
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => scrollToSection('#tondo-sanctuary'), 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="EXHIBIT"
                >
                  Amorsolo Luminism (Tondo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      onSelectCategory?.('sculptures');
                      scrollToSection('#masterworks');
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="FILTER"
                >
                  Classical Bronze Sculpture
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      onSelectCategory?.('digital');
                      scrollToSection('#masterworks');
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="FILTER"
                >
                  Contemporary Digital Fine Art
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      onSelectCategory?.('jewelry');
                      scrollToSection('#masterworks');
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="FILTER"
                >
                  Collector's Sculptural Jewelry
                </button>
              </li>
            </ul>
          </div>

          {/* Curatorial Index */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#B3936E] uppercase tracking-widest block font-medium">
              Curatorial Index
            </span>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      onSelectArtist?.('juan-luna');
                      scrollToSection('#artists-index');
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="BIO"
                >
                  Juan Luna y Novicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      onSelectArtist?.('fernando-amorsolo');
                      scrollToSection('#artists-index');
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="BIO"
                >
                  Fernando Amorsolo
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      onSelectArtist?.('guillermo-tolentino');
                      scrollToSection('#artists-index');
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="BIO"
                >
                  Guillermo Tolentino
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('home');
                    setTimeout(() => {
                      onSelectArtist?.('eman-santos');
                      scrollToSection('#artists-index');
                    }, 100);
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="BIO"
                >
                  Eman Santos (Contemporary)
                </button>
              </li>
            </ul>
          </div>

          {/* Sanctuary Wings */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#B3936E] uppercase tracking-widest block font-medium">
              Sanctuary Wings
            </span>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('about');
                    onSelectSanctuary?.('gh-mall-greenhills');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="SPACE"
                >
                  3F GH Mall Greenhills
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('about');
                    onSelectSanctuary?.('tiendesitas-mall');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="SPACE"
                >
                  Level 1 Tiendesitas Mall
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('about');
                    onSelectSanctuary?.('white-plains-katipunan');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="SPACE"
                >
                  White Plains Katipunan Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate?.('exhibitions');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-left focus:outline-none"
                  data-cursor-text="BULLETIN"
                >
                  Ongoing Bulletin & Art Fairs ↗
                </button>
              </li>
            </ul>
          </div>

          {/* Directorate Desk */}
          <div className="space-y-3">
            <span className="text-[10px] text-[#B3936E] uppercase tracking-widest block font-medium">
              Directorate Desk
            </span>
            <ul className="space-y-2 text-[11px]">
              <li><a href="mailto:historiaartopc@gmail.com" className="hover:text-white transition-colors">historiaartopc@gmail.com</a></li>
              <li><span>0967-100-0468 | 0995-245-5840</span></li>
              <li><span>3F, GH Mall, San Juan City</span></li>
              <li><span>Metro Manila, Philippines</span></li>
            </ul>
          </div>
        </div>

        {/* Institutional Governance Quick Links (Zero Dead Links!) */}
        <div className="py-6 border-b border-[#242424] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#A29D94]">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-[10px] uppercase text-[#B3936E] tracking-widest">
              Institutional Governance:
            </span>
            <button
              onClick={() => onOpenPolicy?.('faq')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline focus:outline-none"
              data-cursor-text="FAQ"
            >
              Collector FAQs
            </button>
            <button
              onClick={() => onOpenPolicy?.('terms')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline focus:outline-none"
              data-cursor-text="TERMS"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onOpenPolicy?.('privacy')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline focus:outline-none"
              data-cursor-text="PRIVACY"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy?.('refund')}
              className="hover:text-white transition-colors underline-offset-4 hover:underline focus:outline-none"
              data-cursor-text="REFUND"
            >
              Return & Refund Policy
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                onNavigate?.('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white text-[#B3936E] transition-colors uppercase tracking-widest text-[10px]"
            >
              Direct Advisory Consultation ↗
            </button>
          </div>
        </div>

        {/* Bottom Rights & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#7E766D] gap-4">
          <div>
            © 2015–2026 Historia Fine Art Gallery Inc. All Rights Reserved. Cataloged under Republic Act 10066 (National Cultural Heritage Act).
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#B3936E] transition-colors uppercase tracking-widest focus:outline-none"
            data-cursor-text="TOP"
          >
            <span>Back to Crest</span>
            <ArrowUp className="w-3.5 h-3.5 stroke-[1.25]" />
          </button>
        </div>

        {/* Subtle Monumental Bottom Wordmark (Edge-to-Edge Architectural Facade) */}
        <div className="pt-12 sm:pt-16 pb-2 overflow-hidden border-t border-white/[0.04] mt-10 text-center select-none pointer-events-none">
          <span className="font-serif text-[15vw] sm:text-[18vw] font-normal leading-none tracking-[0.28em] text-white/[0.04] uppercase whitespace-nowrap block pl-[0.28em]">
            HISTORIA
          </span>
        </div>
      </div>
    </footer>
  );
};
