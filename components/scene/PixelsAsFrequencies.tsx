/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useVideoTexture, useAspect } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  uniform sampler2D uTexture;
  uniform float uDisplacementStrength;
  uniform float uLayers;
  uniform float uSoftness;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;
  varying float vElevation;

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  void main() {
    vUv = uv;
    vec4 color = texture2D(uTexture, uv);
    float brightness = getLuminance(color.rgb);
    
    float stepped = floor(brightness * uLayers) / uLayers;
    float smoothVal = brightness;
    float elevation = mix(stepped, smoothVal, uSoftness);

    // Mouse interaction: Map uMouse (-1 to 1) to UV space (0 to 1)
    vec2 mouseUV = uMouse * 0.5 + 0.5;
    float mouseDist = distance(uv, mouseUV);
    float mouseInfluence = smoothstep(0.45, 0.0, mouseDist);
    
    // Scroll interaction: Increase displacement on scroll
    float displacement = uDisplacementStrength + (uScroll * 0.25);
    
    // Add wave noise and mouse distortion (EXTREME frequencies)
    // Massive multipliers for hyper-energetic movement
    float noise = sin(uv.x * 85.0 + uTime * 2.5) * 0.08 + cos(uv.y * 85.0 + uTime * 2.5) * 0.08;
    float finalElevation = (elevation + noise + (mouseInfluence * 0.25)) * displacement;
    
    vElevation = finalElevation;
    
    vec3 newPos = position + normal * finalElevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    vec4 color = texture2D(uTexture, vUv);
    
    // Mouse glow effect
    vec2 mouseUV = uMouse * 0.5 + 0.5;
    float mouseDist = distance(vUv, mouseUV);
    float glow = smoothstep(0.35, 0.0, mouseDist) * 0.25;
    
    // Elevation-based coloring (slight highlight on peaks)
    vec3 peakColor = vec3(0.77, 0.63, 0.35); // Nobel Gold #C5A059
    vec3 finalRGB = mix(color.rgb, peakColor, clamp(vElevation * 2.5, 0.0, 0.5));
    
    // Scanline effect
    float scanline = sin(vUv.y * 1200.0 + uTime * 4.0) * 0.02;
    finalRGB += scanline + glow;
    
    gl_FragColor = vec4(finalRGB, color.a * uOpacity);
  }
`;

type PixelsAsFrequenciesProps = {
  lowPower?: boolean;
  reducedMotion?: boolean;
  active?: boolean;
  isPhone?: boolean;
  theme: 'light' | 'dark';
};

export const PixelsAsFrequencies: React.FC<PixelsAsFrequenciesProps> = ({
  lowPower = false,
  reducedMotion = false,
  active = true,
  isPhone = false,
  theme,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseLerpRef = useRef(new THREE.Vector2(0, 0));
  const scrollLerpRef = useRef(0);
  const rotationYRef = useRef(0);
  const lastScrollYRef = useRef(0);
  
  const videoUrl = lowPower 
    ? 'https://ik.imagekit.io/sqiqig7tz/e4d8fe34-ac0f-4485-9c56-716f218acdc1_hd.mp4?tr=w-480,q-50' 
    : 'https://ik.imagekit.io/sqiqig7tz/e4d8fe34-ac0f-4485-9c56-716f218acdc1_hd.mp4';
  
  const texture = useVideoTexture(videoUrl, {
    muted: true,
    loop: true,
    start: true,
    crossOrigin: 'Anonymous',
  });

  const { viewport, mouse } = useThree();
  
  // Conditionally set aspect ratio based on device
  const scale = useAspect(isPhone ? 1080 : 1920, isPhone ? 1920 : 1080, 1);

  const resolution = useMemo(() => {
    if (lowPower) return [100, 100]; 
    if (reducedMotion) return [150, 150];
    return [400, 400]; // High resolution for extreme frequency detail
  }, [lowPower, reducedMotion]);

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, resolution[0], resolution[1]), [resolution]);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uDisplacementStrength: { value: isPhone ? 0.45 : 0.32 }, 
    uLayers: { value: 160.0 },               // Double the previous layers
    uSoftness: { value: 1.0 },                
    uTime: { value: 0.0 },
    uOpacity: { value: theme === 'dark' ? 0.6 : 0.4 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0.0 },
  }), [texture, theme, isPhone]);

  useFrame((state) => {
    if (!active) return;
    const t = state.clock.getElapsedTime();
    
    // Spring-like smooth mouse follow
    mouseLerpRef.current.lerp(mouse, 0.04);
    
    const targetScroll = typeof window !== 'undefined' ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1) : 0;
    scrollLerpRef.current = THREE.MathUtils.lerp(scrollLerpRef.current, targetScroll, 0.08);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uMouse.value.copy(mouseLerpRef.current);
      materialRef.current.uniforms.uScroll.value = scrollLerpRef.current;
    }
    
    if (meshRef.current) {
      // 1. Interactive Rotation Logic
      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (Math.abs(scrollDelta) > 0.5) {
        // While scrolling, add to the rotation based on delta
        rotationYRef.current += scrollDelta * 0.0003;
      } else {
        // When stopped, lerp towards the nearest "original place" (multiple of 2 * PI)
        const targetRotation = Math.round(rotationYRef.current / (Math.PI * 2)) * (Math.PI * 2);
        rotationYRef.current = THREE.MathUtils.lerp(rotationYRef.current, targetRotation, 0.0008);
      }

      // Apply cumulative rotation plus mouse influence
      meshRef.current.rotation.y = rotationYRef.current + mouseLerpRef.current.x * 0.8;
      meshRef.current.rotation.x = mouseLerpRef.current.y * -0.4 + (scrollLerpRef.current * 0.4);
      
      // 2. Floating Motion
      meshRef.current.position.z = -2.8 + Math.sin(t * 0.2) * 0.1;
      meshRef.current.position.y = Math.cos(t * 0.15) * 0.05;
      
      // 3. Subtle Z-tilt
      meshRef.current.rotation.z = mouseLerpRef.current.x * 0.1;
      
      // Dynamic scaling
      const fillScale = Math.max(viewport.width / scale[0], viewport.height / scale[1]);
      const s = fillScale * (1.1 + scrollLerpRef.current * 0.25);
      meshRef.current.scale.set(scale[0] * s, scale[1] * s, 1);
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, 0, -2.5]}
      geometry={geometry}
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        precision="highp"
      />
    </mesh>
  );
};
