/**
 * High-performance frame sequence loader and cache for 100 Cloudinary WebP frames.
 * Completely silent, progressive preloading with nearest-frame fallback.
 */

export const FRAME_COUNT = 100;

export const getFrameUrl = (index: number): string => {
  // Clamp between 1 and 100
  const clamped = Math.max(1, Math.min(FRAME_COUNT, Math.round(index)));
  const frame = String(clamped).padStart(3, '0');
  return `https://res.cloudinary.com/z08v8we6/image/upload/v1791334500/frame-${frame}.webp`;
};

class FrameCacheEngine {
  private cache: Map<number, HTMLImageElement> = new Map();
  private loadingStates: Map<number, 'loading' | 'loaded' | 'failed'> = new Map();
  private retryCounts: Map<number, number> = new Map();
  private listeners: Set<() => void> = new Set();
  private isPreloadingStarted = false;

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  public getFrame(index: number): HTMLImageElement | null {
    const clamped = Math.max(1, Math.min(FRAME_COUNT, Math.round(index)));
    
    // Exact match
    const exact = this.cache.get(clamped);
    if (exact && exact.complete && exact.naturalWidth > 0) {
      return exact;
    }

    // Nearest loaded frame fallback
    let closestIndex = -1;
    let minDiff = Infinity;

    for (const [cachedIdx, img] of this.cache.entries()) {
      if (img.complete && img.naturalWidth > 0) {
        const diff = Math.abs(cachedIdx - clamped);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = cachedIdx;
        }
      }
    }

    if (closestIndex !== -1) {
      return this.cache.get(closestIndex) || null;
    }

    return null;
  }

  public loadSingleFrame(index: number): Promise<HTMLImageElement | null> {
    if (this.cache.has(index)) {
      const img = this.cache.get(index)!;
      if (img.complete && img.naturalWidth > 0) return Promise.resolve(img);
    }

    if (this.loadingStates.get(index) === 'loading') {
      return Promise.resolve(null);
    }

    this.loadingStates.set(index, 'loading');

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';

      img.onload = () => {
        this.cache.set(index, img);
        this.loadingStates.set(index, 'loaded');
        this.notify();
        resolve(img);
      };

      img.onerror = () => {
        const retries = (this.retryCounts.get(index) || 0) + 1;
        this.retryCounts.set(index, retries);

        if (retries <= 3) {
          // Retry with slight delay
          setTimeout(() => {
            this.loadingStates.delete(index);
            this.loadSingleFrame(index);
          }, 400 * retries);
        } else {
          this.loadingStates.set(index, 'failed');
        }
        resolve(null);
      };

      img.src = getFrameUrl(index);
    });
  }

  public startProgressivePreload() {
    if (this.isPreloadingStarted) return;
    this.isPreloadingStarted = true;

    // Phase 1: High priority initial frames (1..10) so the first view and initial scroll is instant
    const phase1: number[] = [];
    for (let i = 1; i <= 10; i++) phase1.push(i);

    // Phase 2: Key anchor frames across the timeline (15, 20, 25 ... 100)
    const phase2: number[] = [];
    for (let i = 15; i <= FRAME_COUNT; i += 5) phase2.push(i);

    // Phase 3: Fill all remaining intermediary frames
    const phase3: number[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      if (!phase1.includes(i) && !phase2.includes(i)) phase3.push(i);
    }

    const loadBatch = async (batch: number[], concurrency: number = 4) => {
      for (let i = 0; i < batch.length; i += concurrency) {
        const chunk = batch.slice(i, i + concurrency);
        await Promise.all(chunk.map((idx) => this.loadSingleFrame(idx)));
      }
    };

    // Load sequentially by phase without blocking main thread
    loadBatch(phase1, 4).then(() => {
      loadBatch(phase2, 4).then(() => {
        loadBatch(phase3, 4);
      });
    });
  }

  public getLoadedCount(): number {
    return this.cache.size;
  }
}

export const frameEngine = new FrameCacheEngine();
