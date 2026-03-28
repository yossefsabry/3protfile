import React, { useEffect, useRef } from 'react';

type MatrixBackgroundProps = {
  isPhone: boolean;
  isLowPower: boolean;
  reducedMotion: boolean;
};

const GLYPHS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-<>/[]{}';
const ROSE_PINE_GLOW = [
  'rgba(196, 167, 231, 0.9)',
  'rgba(144, 122, 169, 0.82)',
  'rgba(246, 193, 119, 0.78)',
  'rgba(180, 99, 122, 0.78)',
  'rgba(86, 148, 159, 0.76)',
];

export const MatrixBackground = ({
  isPhone,
  isLowPower,
  reducedMotion,
}: MatrixBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const fontSize = isPhone ? 14 : 18;
    const columnStep = isPhone ? 18 : 22;
    const dpr = Math.min(window.devicePixelRatio || 1, isLowPower ? 1.2 : 1.5);
    const frameInterval = reducedMotion ? 220 : isLowPower ? 70 : 44;
    let columns = 0;
    let drops: number[] = [];
    let frameId = 0;
    let lastFrameTime = 0;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.textBaseline = 'top';
      context.font = `${fontSize}px monospace`;
      columns = Math.max(12, Math.floor(width / columnStep));
      drops = Array.from({ length: columns }, () => Math.random() * height);
      paint(true);
    };

    const pickGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

    const paint = (reset = false) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      context.fillStyle = reset ? '#191724' : 'rgba(25, 23, 36, 0.18)';
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < columns; index += 1) {
        const x = index * columnStep;
        const y = drops[index];
        context.fillStyle = ROSE_PINE_GLOW[index % ROSE_PINE_GLOW.length];
        context.fillText(pickGlyph(), x, y);

        const nextY = y + fontSize * (reducedMotion ? 0.6 : isLowPower ? 0.85 : 1.05);
        drops[index] = nextY > height + Math.random() * height * 0.35 ? -Math.random() * height * 0.4 : nextY;
      }
    };

    const animate = (time: number) => {
      if (!lastFrameTime || time - lastFrameTime >= frameInterval) {
        lastFrameTime = time;
        paint();
      }
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reducedMotion) {
      frameId = window.requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [isLowPower, isPhone, reducedMotion]);

  return (
    <div
      data-testid="matrix-background"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#191724]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,167,231,0.12),transparent_38%),radial-gradient(circle_at_bottom,rgba(86,148,159,0.12),transparent_42%),radial-gradient(circle_at_center,rgba(180,99,122,0.08),transparent_52%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,23,36,0.16),rgba(25,23,36,0.62))]" />
    </div>
  );
};
