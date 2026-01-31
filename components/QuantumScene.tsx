
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Stars, Environment, Box } from '@react-three/drei';
import * as THREE from 'three';

type ThemeMode = 'light' | 'dark';

const QuantumParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.15;
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.z = t * 0.25;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 16, 16]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={0.8}
        clearcoat={0.5}
        metalness={0.6}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const MacroscopicWave = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.1) * 0.15;
       ref.current.rotation.y = t * 0.08;
    }
  });

  return (
    <Torus ref={ref} args={[3, 0.05, 12, 64]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={0.3} transparent opacity={0.4} wireframe />
    </Torus>
  );
}

export const HeroScene: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  const isDark = theme === 'dark';
  const isLowPower = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    if (typeof navigator.hardwareConcurrency === 'number') {
      return navigator.hardwareConcurrency <= 4;
    }
    return false;
  }, []);
  const starCount = useMemo(() => {
    const base = isDark ? 2000 : 800;
    return isLowPower ? Math.round(base * 0.6) : base;
  }, [isDark, isLowPower]);
  
  return (
    <div className="absolute inset-0 z-[1] opacity-90 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={isDark ? 0.2 : 0.6} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 1} color={isDark ? "#C5A059" : "#fff"} />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <QuantumParticle position={[0, 0, 0]} color={isDark ? "#6366f1" : "#4F46E5"} scale={1.4} />
          <MacroscopicWave />
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
           <QuantumParticle position={[-4, 1.5, -3]} color={isDark ? "#a855f7" : "#9333EA"} scale={0.6} />
           <QuantumParticle position={[4, -1.5, -4]} color="#C5A059" scale={0.7} />
        </Float>

        <Suspense fallback={null}>
          <Environment preset={isDark ? "night" : "city"} />
        </Suspense>
        <Stars radius={100} depth={50} count={starCount} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

const QuantumAssembly = ({ isDark }: { isDark: boolean }) => {
  const assemblyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!assemblyRef.current) return;
    const t = state.clock.getElapsedTime();
    assemblyRef.current.position.x = Math.sin(t * 0.35) * 0.35;
    assemblyRef.current.position.y = 0.35 + Math.cos(t * 0.5) * 0.18;
    assemblyRef.current.rotation.y = Math.sin(t * 0.25) * 0.2;
    assemblyRef.current.rotation.z = Math.cos(t * 0.2) * 0.05;
  });

  return (
    <Float rotationIntensity={0.4} floatIntensity={0.25} speed={1.1}>
      <group ref={assemblyRef}>
        {/* Top Plate */}
        <Cylinder args={[1.2, 1.2, 0.08, 32]} position={[0, 1, 0]}>
          <meshStandardMaterial color={isDark ? "#8a6d3b" : "#C5A059"} metalness={1} roughness={0.1} />
        </Cylinder>
        
        {/* Middle Stage */}
        <Cylinder args={[1, 1, 0.08, 32]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color={isDark ? "#8a6d3b" : "#C5A059"} metalness={1} roughness={0.1} />
        </Cylinder>
        
        {/* Bottom Stage */}
        <Cylinder args={[0.6, 0.6, 0.08, 32]} position={[0, -0.6, 0]}>
          <meshStandardMaterial color={isDark ? "#8a6d3b" : "#C5A059"} metalness={1} roughness={0.1} />
        </Cylinder>

        {/* Rods */}
        {[0.5, -0.5].map((x, i) => (
           <Cylinder key={`rod-${i}`} args={[0.03, 0.03, 0.8, 8]} position={[x, 0.6, 0]}>
             <meshStandardMaterial color={isDark ? "#444" : "#D1D5DB"} metalness={0.9} roughness={0.1} />
           </Cylinder>
        ))}

        {/* Copper Coils */}
        <Torus args={[0.7, 0.012, 12, 48]} position={[0, -0.2, 0]} rotation={[Math.PI/2, 0, 0]}>
           <meshStandardMaterial color="#B87333" metalness={0.9} roughness={0.2} />
        </Torus>
        
        {/* Processor */}
        <Box args={[0.25, 0.04, 0.25]} position={[0, -0.7, 0]}>
            <meshStandardMaterial color={isDark ? "#000" : "#111"} metalness={0.8} roughness={0.2} emissive={isDark ? "#C5A059" : "#000"} emissiveIntensity={isDark ? 0.3 : 0} />
        </Box>
      </group>
    </Float>
  );
};

export const QuantumComputerScene: React.FC<{ theme: ThemeMode }> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: true }}>
        <ambientLight intensity={isDark ? 0.35 : 1} />
        <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={isDark ? 3.2 : 2} color="#C5A059" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <pointLight position={[0, 2.5, 2]} intensity={isDark ? 0.8 : 0.4} color="#F5E7C1" />
        <Suspense fallback={null}>
          <Environment preset={isDark ? "night" : "studio"} />
        </Suspense>
        <QuantumAssembly isDark={isDark} />
      </Canvas>
    </div>
  );
}
