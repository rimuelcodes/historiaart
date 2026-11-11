import React, { useRef, useState, useEffect } from 'react';
import { Eye, Sparkles, Scale, Volume2, VolumeX, Shield } from 'lucide-react';
import { Artwork } from '../types';

interface DarkGalleryWingProps {
  tondoArtwork: Artwork;
  onOpenArtwork: (artwork: Artwork, mode?: 'study' | 'scale') => void;
  onOpenScaleView: (artwork: Artwork) => void;
}

export const DarkGalleryWing: React.FC<DarkGalleryWingProps> = ({
  tondoArtwork,
  onOpenArtwork,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      // Fade out smoothly
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(
          0.0001,
          audioCtxRef.current.currentTime,
          0.3
        );
      }
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Ignore if already stopped
          }
        });
        oscillatorsRef.current = [];
        setIsPlayingAudio(false);
      }, 350);
    } else {
      // Synthesize ambient classical gallery acoustic resonance (warm D chord)
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioCtx();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm resonant harmonic drone frequencies: D2, A2, D3, F#3
        const freqs = [73.42, 110.0, 146.83, 185.0];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(idx === 0 ? 300 : 500, ctx.currentTime);

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(filter);
          filter.connect(masterGain);
          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setIsPlayingAudio(true);
      } catch {
        setIsPlayingAudio(!isPlayingAudio);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section
      id="tondo-sanctuary"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#141414] text-[#F6F4F0] py-20 lg:py-24 px-6 md:px-12 overflow-hidden transition-colors duration-700 min-h-[min(100vh,940px)] flex flex-col justify-center"
    >
      {/* Subtle Radial Warm Gallery Spotlight Behind Circular Tondo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle 550px at 32% 50%, rgba(212, 175, 115, 0.14) 0%, transparent 65%)`,
        }}
      />

      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 420px at ${mousePos.x}% ${mousePos.y}%, rgba(179, 147, 110, 0.12), transparent 70%)`,
        }}
      />

      {/* Museum Vitrine Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#B3936E_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Curatorial Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#262626] pb-5 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 text-[10px] font-mono tracking-[0.25em] text-[#B3936E] uppercase mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B3936E] animate-ping" />
              <span>Sanctum Wing • Spotlight Exhibition</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
              The Golden Hour Tondo
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#B3936E] mt-0.5 font-light">
              Fernando Amorsolo y Cuenca (1892–1972)
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#8E8A82]">
            <div className="border border-[#2A2A2A] bg-[#1A1A1A] px-3.5 py-1.5 rounded-sm">
              <span className="text-[#B3936E] block text-[9px]">VALUATION</span>
              <span className="text-white font-medium text-[11px]">{tondoArtwork.valuationPHP}</span>
            </div>
            <div className="border border-[#2A2A2A] bg-[#1A1A1A] px-3.5 py-1.5 rounded-sm">
              <span className="text-[#B3936E] block text-[9px]">ACCESSION</span>
              <span className="text-white font-medium text-[11px]">{tondoArtwork.catalogId}</span>
            </div>
          </div>
        </div>

        {/* Tightened 1080px Single Viewport Layout: Circular Tondo & Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Circular Tondo Display Container */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative group">
              {/* Backlight Glow Ring */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-[#8C7355]/30 via-transparent to-[#B3936E]/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Brushed Bronze Circular Frame */}
              <div
                className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full p-3 sm:p-4 bg-gradient-to-br from-[#8C7355] via-[#2A231A] to-[#121212] shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer overflow-hidden border border-[#8C7355]/50 group"
                onClick={() => onOpenArtwork(tondoArtwork, 'study')}
                data-artwork-card="true"
                data-cursor-text="TONDO"
              >
                {/* Internal Canvas Ring */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center border border-[#8C7355]/50">
                  <img
                    src={tondoArtwork.image}
                    alt={tondoArtwork.title}
                    className="w-full h-full object-cover rounded-full transform scale-100 group-hover:scale-106 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Circular Hover Lens Overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <span className="text-[9px] font-mono tracking-widest text-[#B3936E] uppercase mb-1">
                      Inspect Masterpiece
                    </span>
                    <span className="font-serif text-lg text-white font-light">
                      {tondoArtwork.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#DCD8D0] mt-1">
                      120 cm Circular Tondo
                    </span>
                  </div>
                </div>
              </div>

              {/* Curatorial Spec Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border border-[#8C7355]/50 px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#B3936E] whitespace-nowrap">
                <Sparkles className="w-3 h-3 stroke-[1.25]" />
                <span>CIRCULAR MAHOGANY TONDO • 1938</span>
              </div>
            </div>
          </div>

          {/* Right Curatorial Analysis & Interactive Controls */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#B3936E] uppercase block">
                Botticellian Renaissance Meets Tropical Luminism
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                The Golden Hour Gathering
              </h3>
              <p className="text-xs sm:text-sm font-light text-[#A29D94] leading-relaxed">
                Painted at the height of Amorsolo’s mastery in 1938, this circular tondo represents a rare synthesis: Florentine Renaissance circular composition infused with Amorsolo’s legendary backlighting (“contra-luz”). Radiant sunlight glints off baro’t saya silks, creating harmonious eternal balance.
              </p>
            </div>

            {/* Compact Curatorial Dossier Table */}
            <div className="border border-[#262626] bg-[#161616] p-4 rounded-sm space-y-2 font-mono text-xs">
              <div className="flex justify-between pb-1.5 border-b border-[#242424]">
                <span className="text-[#7E766D] uppercase text-[10px]">Medium</span>
                <span className="text-[#F6F4F0] text-right text-[11px]">Oil on Circular Mahogany Tondo</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#242424]">
                <span className="text-[#7E766D] uppercase text-[10px]">Dimensions</span>
                <span className="text-[#F6F4F0] text-[11px]">120 cm (Diameter)</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#242424]">
                <span className="text-[#7E766D] uppercase text-[10px]">Provenance</span>
                <span className="text-[#B3936E] text-right text-[11px] truncate max-w-[220px]">
                  Don Enrique Zóbel de Ayala Collection
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7E766D] uppercase text-[10px]">Conservation</span>
                <span className="text-emerald-400 flex items-center gap-1.5 text-[11px]">
                  <Shield className="w-3.5 h-3.5 stroke-[1.25]" />
                  Microclimate Sealed (99.8%)
                </span>
              </div>
            </div>

            {/* Interactive Triggers (Direct Gallery Scale Link) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => onOpenArtwork(tondoArtwork, 'study')}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 bg-[#8C7355] text-white text-xs font-mono tracking-widest uppercase hover:bg-[#B3936E] transition-all rounded-sm shadow-md shadow-[#8C7355]/20"
                data-cursor-text="INSPECT"
              >
                <Eye className="w-4 h-4 stroke-[1.25]" />
                <span>Enter Virtual Viewing Room</span>
              </button>

              <button
                onClick={() => onOpenArtwork(tondoArtwork, 'scale')}
                className="flex items-center justify-center gap-2 py-3 px-4 border border-[#8C7355]/60 text-[#B3936E] hover:text-white hover:bg-[#8C7355]/20 text-xs font-mono tracking-widest uppercase transition-all rounded-sm"
                data-cursor-text="SCALE"
              >
                <Scale className="w-4 h-4 stroke-[1.25]" />
                <span>View in Gallery Scale</span>
              </button>
            </div>

            {/* Audio Curatorial Guide Toggle with Web Audio API & Waveform */}
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] border border-[#262626] rounded-sm text-xs font-mono text-[#A29D94]">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isPlayingAudio
                      ? 'bg-[#8C7355] text-white shadow-md shadow-[#8C7355]/30'
                      : 'bg-[#262626] text-[#B3936E] hover:bg-[#8C7355] hover:text-white'
                  }`}
                  aria-label="Toggle Curatorial Audio Guide"
                >
                  {isPlayingAudio ? (
                    <Volume2 className="w-4 h-4 stroke-[1.25] animate-pulse" />
                  ) : (
                    <VolumeX className="w-4 h-4 stroke-[1.25]" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white block text-[11px] font-medium">Curatorial Audio Guide</span>
                    {isPlayingAudio && (
                      <div className="flex items-center gap-0.5" aria-hidden="true">
                        <span className="w-0.5 h-2.5 bg-[#B3936E] animate-pulse" />
                        <span className="w-0.5 h-3.5 bg-[#B3936E] animate-pulse delay-75" />
                        <span className="w-0.5 h-2 bg-[#B3936E] animate-pulse delay-150" />
                        <span className="w-0.5 h-4 bg-[#B3936E] animate-pulse delay-100" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#7E766D]">
                    {isPlayingAudio
                      ? 'Synthesized Ambient Acoustic Resonance • Playing'
                      : 'Analysis by Dr. Zialcita (Click to Play)'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#B3936E] tracking-widest uppercase font-semibold">
                AUDIO 04
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
