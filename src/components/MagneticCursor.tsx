import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface MagneticCursorProps {
  isModalOpen?: boolean;
}

export const MagneticCursor: React.FC<MagneticCursorProps> = ({ isModalOpen = false }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isOverDark, setIsOverDark] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) {
      setIsTouch(true);
      return;
    }

    if (cursorRef.current) {
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
      xTo.current = gsap.quickTo(cursorRef.current, 'x', {
        duration: 0.18,
        ease: 'power3.out',
      });
      yTo.current = gsap.quickTo(cursorRef.current, 'y', {
        duration: 0.18,
        ease: 'power3.out',
      });
    }

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
      } else if (!isVisible) {
        setIsVisible(true);
      }

      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);

      if (isModalOpen) {
        setCursorText('');
        setIsHovered(false);
        return;
      }

      // Check hovered element for active examine/inspect target and dark theme section
      const target = e.target as HTMLElement | null;
      if (target) {
        // Dark section detection: Sanctum Wing, Architectural Footer, or dark-theme tagged elements
        const darkParent = target.closest('#tondo-sanctuary, #architectural-footer, [data-dark-theme="true"]');
        setIsOverDark(!!darkParent);

        // Interactive target detection
        const interactiveParent = target.closest(
          '[data-cursor], [data-cursor-text], [data-artwork-card]'
        );
        if (interactiveParent) {
          const customText =
            interactiveParent.getAttribute('data-cursor-text') ||
            interactiveParent.getAttribute('data-cursor');
          if (customText) {
            setCursorText(customText.toUpperCase());
            setIsHovered(true);
          } else if (interactiveParent.hasAttribute('data-artwork-card')) {
            setCursorText('EXAMINE');
            setIsHovered(true);
          } else {
            setCursorText('VIEW');
            setIsHovered(true);
          }
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      setCursorText('');
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible, isModalOpen]);

  // Touch device or modal open: do not render cursor
  if (isTouch || isModalOpen) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform transition-opacity duration-200 select-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate3d(-500px, -500px, 0)',
      }}
      aria-hidden="true"
    >
      {isHovered ? (
        /* Morph into Brushed-Bronze EXAMINE / Action Pill */
        <div className="flex items-center justify-center px-3.5 py-1.5 rounded-full bg-[#8C7355] text-white shadow-xl shadow-[#8C7355]/30 border border-[#B3936E]/60 backdrop-blur-sm transition-all duration-200 animate-fadeIn">
          <span className="text-[9px] font-mono tracking-widest font-semibold uppercase whitespace-nowrap">
            {cursorText || 'EXAMINE'}
          </span>
        </div>
      ) : (
        /* Default 10px Circular Dot with Adaptive Contrast */
        <div
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
            isOverDark
              ? 'bg-[#F6F4F0] ring-1 ring-white/30 shadow-[0_0_8px_rgba(255,255,255,0.4)]'
              : 'bg-[#121212] ring-1 ring-black/15 shadow-[0_0_8px_rgba(0,0,0,0.25)]'
          }`}
        />
      )}
    </div>
  );
};
