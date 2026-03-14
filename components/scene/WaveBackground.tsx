/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface WaveBackgroundProps {
  theme: 'light' | 'dark';
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let width: number, height: number;
    const cols = 40;
    const rows = 40;
    const numPoints = rows * cols;
    const spacing = 80;
    
    // Performance: Use typed arrays to avoid object creation in loops
    const pointsX = new Float32Array(numPoints);
    const pointsZ = new Float32Array(numPoints);
    const projectedX = new Float32Array(numPoints);
    const projectedY = new Float32Array(numPoints);
    const projectedScale = new Float32Array(numPoints);
    const projectedZ = new Float32Array(numPoints);
    const projectedMouseForce = new Float32Array(numPoints);
    const pointValid = new Uint8Array(numPoints);

    let time = 0;

    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Initialize points
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const idx = i * cols + j;
        pointsX[idx] = (j - cols / 2) * spacing;
        pointsZ[idx] = (i - rows / 2) * spacing;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      rotationRef.current.targetY = ((e.clientX / width) * 2 - 1) * 0.25;
      rotationRef.current.targetX = ((e.clientY / height) * 2 - 1) * 0.15;
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleScroll = () => {
      scrollRef.current.target = window.scrollY * 0.0015;
    };

    // Optimization: Visibility check
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // Update state
      rotationRef.current.y = lerp(rotationRef.current.y, rotationRef.current.targetY, 0.05);
      rotationRef.current.x = lerp(rotationRef.current.x, rotationRef.current.targetX, 0.05);
      scrollRef.current.current = lerp(scrollRef.current.current, scrollRef.current.target, 0.08);
      mouseRef.current.x = lerp(mouseRef.current.x, mouseRef.current.targetX, 0.1);
      mouseRef.current.y = lerp(mouseRef.current.y, mouseRef.current.targetY, 0.1);

      const isDark = theme === 'dark';
      const dotColor = isDark ? [197, 160, 89] : [139, 111, 61]; 
      const lineColor = isDark ? [255, 255, 255] : [15, 17, 21];

      const rotY = time * 0.04 + rotationRef.current.y;
      const rotX = 1.1 + rotationRef.current.x + (scrollRef.current.current * 0.1);

      const focalLength = 600;
      const cameraZ = 1100 - (scrollRef.current.current * 200);

      const cosRotY = Math.cos(rotY);
      const sinRotY = Math.sin(rotY);
      const cosRotX = Math.cos(rotX);
      const sinRotX = Math.sin(rotX);

      // Pass 1: Projection
      for (let i = 0; i < numPoints; i++) {
        const px = pointsX[i];
        const pz = pointsZ[i];
        const distFromCenter = Math.sqrt(px * px + pz * pz);

        const y = Math.sin(distFromCenter * (0.006 + scrollRef.current.current * 0.002) - time * 2) * (100 + scrollRef.current.current * 50) +
                  Math.cos(px * 0.012 + time) * 40;

        let rx = px * cosRotY - pz * sinRotY;
        let rz = pz * cosRotY + px * sinRotY;

        const finalY = y * cosRotX - rz * sinRotX;
        const finalZ = rz * cosRotX + y * sinRotX;

        const tz = finalZ + cameraZ;

        if (tz > 0) {
          const scale = focalLength / tz;
          const projX = width / 2 + rx * scale;
          const projY = height / 2 + finalY * scale + 250;

          const dx = projX - mouseRef.current.x;
          const dy = projY - mouseRef.current.y;
          const mouseDistSq = dx * dx + dy * dy;
          const mouseForce = Math.max(0, (180 - Math.sqrt(mouseDistSq)) / 180);

          projectedX[i] = projX + (dx * mouseForce * 0.2);
          projectedY[i] = projY + (dy * mouseForce * 0.2);
          projectedScale[i] = scale;
          projectedZ[i] = tz;
          projectedMouseForce[i] = mouseForce;
          pointValid[i] = 1;
        } else {
          pointValid[i] = 0;
        }
      }

      // Pass 2: Draw Connections (Optimized: Group by alpha for fewer draw calls)
      // Since connections have varyng alphas, we'll draw them in a single path
      // with a mid-range alpha for high performance, or split into 2-3 alpha groups.
      // Here we'll use a single path with a representative alpha for maximum speed.
      ctx.beginPath();
      ctx.lineWidth = 0.55;
      ctx.strokeStyle = isDark ? `rgba(255, 255, 255, 0.15)` : `rgba(15, 17, 21, 0.12)`;
      
      for (let i = 0; i < numPoints; i++) {
        if (pointValid[i] === 0) continue;
        const pz = projectedZ[i];
        if (pz > 2500) continue; // Distance culling

        const row = Math.floor(i / cols);
        const col = i % cols;
        const px = projectedX[i];
        const py = projectedY[i];

        if (col < cols - 1 && pointValid[i + 1]) {
          ctx.moveTo(px, py);
          ctx.lineTo(projectedX[i + 1], projectedY[i + 1]);
        }
        if (row < rows - 1 && pointValid[i + cols]) {
          ctx.moveTo(px, py);
          ctx.lineTo(projectedX[i + cols], projectedY[i + cols]);
        }
      }
      ctx.stroke();

      // Pass 3: Draw Points
      // We can batch these too, but since they have different colors/sizes, 
      // per-point arc is needed. However, we Cull distant points.
      for (let i = 0; i < numPoints; i++) {
        if (pointValid[i] === 0) continue;
        const pz = projectedZ[i];
        if (pz > 2800) continue; // Distance culling

        const mForce = projectedMouseForce[i];
        const alpha = Math.max(0, Math.min(1, 1 - (pz / 2800)));
        const radius = Math.max(0.4, (2.2 + mForce * 3) * projectedScale[i]);

        const r = lerp(dotColor[0], 255, mForce) | 0;
        const g = lerp(dotColor[1], 255, mForce) | 0;
        const b = lerp(dotColor[2], 255, mForce) | 0;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(projectedX[i], projectedY[i], radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ background: 'transparent' }}
    />
  );
};
