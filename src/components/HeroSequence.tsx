import brand from '../../brand.json';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { frameEngine, FRAME_COUNT } from '../lib/frameLoader';
import { ArrowDown } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

export const HeroSequence: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track current frame for light UI indicators (using ref for high performance drawing)
  const currentFrameRef = useRef<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Canvas drawing function with high-DPI and aspect-ratio preservation
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const img = frameEngine.getFrame(frameNumber);
    if (!img) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Compute contained fitting with optimal visual size
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;

    let drawW: number;
    let drawH: number;

    // Responsive sizing: slightly tighter on mobile, generous on desktop
    const scaleFactor = rect.width < 768 ? 0.96 : 0.94;

    if (canvasRatio > imgRatio) {
      drawH = rect.height * scaleFactor;
      drawW = drawH * imgRatio;
    } else {
      drawW = rect.width * scaleFactor;
      drawH = drawW / imgRatio;
    }

    const drawX = (rect.width - drawW) / 2;
    // Slight vertical optical center adjustment so watch sits majestically
    const drawY = (rect.height - drawH) / 2 + (rect.width < 768 ? 20 : 0);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Initialize frame loader silently on mount
  useEffect(() => {
    frameEngine.startProgressivePreload();

    const unsubscribe = frameEngine.subscribe(() => {
      // Re-draw current frame when new frames settle in cache
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(currentFrameRef.current);
      });
    });

    // Draw initial frame as soon as possible
    frameEngine.loadSingleFrame(1).then(() => {
      drawFrame(1);
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Handle scroll events and map directly to frame sequence 1..100
  useEffect(() => {
    let animationId = 0;
    let targetProgress = 0;
    let easedProgress = 0;
    let lastTime = 0;
    const animate = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      easedProgress += (targetProgress - easedProgress) * (1 - Math.exp(-elapsed / 95));
      if (Math.abs(targetProgress - easedProgress) < 0.0005) easedProgress = targetProgress;
      const frame = reducedMotion ? 1 : Math.round(1 + easedProgress * (FRAME_COUNT - 1));
      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame;
        drawFrame(frame);
      }
      setScrollProgress(easedProgress);
      animationId = easedProgress !== targetProgress ? requestAnimationFrame(animate) : 0;
      if (!animationId) lastTime = 0;
    };
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableHeight = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollableHeight <= 0) return;

      // Calculate progress between 0 and 1
      const rawProgress = -rect.top / totalScrollableHeight;
      const progress = Math.max(0, Math.min(1, rawProgress));

      targetProgress = progress;
      if (!animationId) animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [drawFrame, reducedMotion]);

  // Handle window resize for canvas redraw
  useEffect(() => {
    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Opacity fading for hero text as user scrolls down the sequence
  // Text fades out smoothly between progress 0.05 and 0.40, giving full prominence to the rotating watch
  const textOpacity = Math.max(0, 1 - scrollProgress * 2.8);
  const textTranslateY = scrollProgress * -40;

  // Bottom scroll cue fades out quickly
  const scrollCueOpacity = Math.max(0, 1 - scrollProgress * 4);

  return (
    <div
      ref={containerRef}
      className="hero-sequence relative w-full bg-white"
      style={{ height: reducedMotion ? '100svh' : '300svh' }}
    >
      {/* Pinned Sticky Viewport */}
      <div className="hero-stage sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-white">
        
        {/* Subtle Luxury Radial Vignette for Depth (Pure White Center to Delicate Warm White Edge) */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #faf8f5 65%, #f4f1ea 100%)'
          }}
        />

        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-inner" aria-hidden="true" />
        {/* 100-Frame Animation Canvas */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`${brand.name} timepiece, rotating as you scroll`}
          className="hero-canvas absolute inset-0 z-10 h-full w-full object-contain pointer-events-none"
        />

        {/* Hero Text Overlay (NO Eyebrow above heading!) */}
        <div 
          className="relative z-20 w-full mx-auto px-6 pt-28 flex flex-col items-center text-center pointer-events-none md:sr-only"
          style={{
            opacity: textOpacity,
            transform: `translate3d(0, ${textTranslateY}px, 0)`,
            willChange: 'opacity, transform'
          }}
        >
          {/* Main Display Heading */}
          <h1 className="hero-heading font-serif text-5xl sm:text-6xl tracking-[0.04em] text-neutral-900 font-normal leading-[1.05]">
            {brand.name.toUpperCase()}
          </h1>
        </div>

        {/* Minimal Scroll Progress Indicator Bar at Bottom (Very subtle) */}
        <div 
          className="absolute bottom-0 z-20 w-full pb-6 px-6 sm:px-12 flex items-center justify-between pointer-events-none"
        >
          {/* Scroll Cue (Fades away quickly) */}
          <div 
            className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-neutral-500 font-medium transition-opacity duration-150"
            style={{ opacity: scrollCueOpacity }}
          >
            <ArrowDown aria-hidden="true" className="hero-scroll-arrow w-4 h-4 text-neutral-500" />
          </div>

          {/* Minimal Horizon Progress Bar */}
          <div className="ml-auto flex items-center gap-3">
            <div className="w-24 sm:w-36 h-[1.5px] bg-neutral-200 overflow-hidden">
              <div 
                className="h-full bg-[#a48754] origin-left"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
