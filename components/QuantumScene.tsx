
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Cylinder, Environment, Box, useProgress } from '@react-three/drei';
import * as THREE from 'three';

type ThemeMode = 'light' | 'dark';
type ScrollState = { progress: number; velocity: number; direction: number; fade: number };
type ScrollStateRef = React.MutableRefObject<ScrollState>;

const SceneLoadWatcher = ({ onReady, reducedMotion, lowPower }: { onReady?: () => void; reducedMotion: boolean; lowPower: boolean }) => {
  const { active, progress, total } = useProgress();
  const calledRef = useRef(false);
  const settledFramesRef = useRef(0);

  useFrame(() => {
    if (calledRef.current) return;
    const assetsLoaded = total === 0 || progress >= 100;
    const allowEarlyReady = reducedMotion || lowPower || total === 0;
    const readyToSettle = !active && (assetsLoaded || allowEarlyReady);

    if (!readyToSettle) {
      settledFramesRef.current = 0;
      return;
    }

    settledFramesRef.current += 1;
    if (settledFramesRef.current < 6) return;
    calledRef.current = true;
    onReady?.();
  });

  return null;
};

const SceneInvalidateBridge = ({ onInvalidateReady }: { onInvalidateReady?: (invalidate: (() => void) | null) => void }) => {
  const { invalidate } = useThree();

  useEffect(() => {
    onInvalidateReady?.(invalidate);
    return () => onInvalidateReady?.(null);
  }, [invalidate, onInvalidateReady]);

  return null;
};

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

const ScrollRig = ({ scrollState, reducedMotion, isDark }: { scrollState: ScrollStateRef; reducedMotion: boolean; isDark: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreGroupRef = useRef<THREE.Group>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const leftGroupRef = useRef<THREE.Group>(null);
  const rightGroupRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(0);
  const initializedRef = useRef(false);
  const baseLeft = useMemo(() => new THREE.Vector3(-4, 1.5, -3), []);
  const baseRight = useMemo(() => new THREE.Vector3(4, -1.5, -4), []);

  const keyframes = useMemo(
    () => [
      { at: 0, pos: [0, 0, 0], rot: [0.12, 0.2, 0], scale: 1 },
      { at: 0.32, pos: [-1, 0.6, -0.2], rot: [0.22, -0.6, 0.18], scale: 1.05 },
      { at: 0.62, pos: [1, -0.5, 0.25], rot: [-0.25, 0.7, -0.22], scale: 0.92 },
      { at: 1, pos: [0, -0.9, 0], rot: [0.18, -0.35, 0.12], scale: 0.85 },
    ],
    []
  );

  const sampleKeyframe = (progress: number) => {
    const clamped = Math.min(Math.max(progress, 0), 1);
    let index = 0;
    while (index < keyframes.length - 1 && clamped > keyframes[index + 1].at) {
      index += 1;
    }
    const start = keyframes[index];
    const end = keyframes[Math.min(index + 1, keyframes.length - 1)];
    const span = Math.max(0.0001, end.at - start.at);
    const t = Math.min(Math.max((clamped - start.at) / span, 0), 1);

    return {
      pos: [
        THREE.MathUtils.lerp(start.pos[0], end.pos[0], t),
        THREE.MathUtils.lerp(start.pos[1], end.pos[1], t),
        THREE.MathUtils.lerp(start.pos[2], end.pos[2], t),
      ],
      rot: [
        THREE.MathUtils.lerp(start.rot[0], end.rot[0], t),
        THREE.MathUtils.lerp(start.rot[1], end.rot[1], t),
        THREE.MathUtils.lerp(start.rot[2], end.rot[2], t),
      ],
      scale: THREE.MathUtils.lerp(start.scale, end.scale, t),
    };
  };

  useFrame((_, delta) => {
    const group = groupRef.current;
    const coreGroup = coreGroupRef.current;
    const ringGroup = ringGroupRef.current;
    const leftGroup = leftGroupRef.current;
    const rightGroup = rightGroupRef.current;
    if (!group || !coreGroup || !ringGroup || !leftGroup || !rightGroup) return;

    const { progress, velocity, direction } = scrollState.current;
    const motionProgress = reducedMotion ? 0 : progress;
    const target = sampleKeyframe(motionProgress);

    const pulse = (center: number, width: number) => {
      const dist = Math.abs(motionProgress - center);
      const raw = Math.max(0, 1 - dist / width);
      return raw * raw * (3 - 2 * raw);
    };

    const aboutPulse = pulse(0.18, 0.18);
    const projectsPulse = pulse(0.42, 0.18);
    const focusPulse = pulse(0.66, 0.18);
    const contactPulse = pulse(0.88, 0.14);

    velocityRef.current = THREE.MathUtils.damp(
      velocityRef.current,
      reducedMotion ? 0 : velocity,
      4,
      delta
    );

    const velocityBoost = velocityRef.current;
    const spinBoost = velocityBoost * 0.45 * direction;

    const targetScale = target.scale + velocityBoost * 0.12;
    const coreScale = 1 + aboutPulse * 0.85 + focusPulse * 0.55 - contactPulse * 0.15;
    const coreY = aboutPulse * 0.45 - focusPulse * 0.35 + contactPulse * 0.25;
    const coreX = projectsPulse * -0.35 + focusPulse * 0.35;
    const ringScale = 1 + aboutPulse * 1.05 + contactPulse * 0.55;

    const leftTargetX = baseLeft.x + projectsPulse * 3.4 - focusPulse * 0.8;
    const leftTargetY = baseLeft.y + projectsPulse * 1.1 - contactPulse * 0.5;
    const leftTargetZ = baseLeft.z + projectsPulse * 2.8 + contactPulse * 1.1;
    const leftScale = 0.75 + projectsPulse * 1.05;

    const rightTargetX = baseRight.x - focusPulse * 3.2 + contactPulse * 0.25;
    const rightTargetY = baseRight.y + focusPulse * 1.4 + contactPulse * 0.35;
    const rightTargetZ = baseRight.z + focusPulse * 3.0 + contactPulse * 1.1;
    const rightScale = 0.75 + focusPulse * 1.1;

    if (!initializedRef.current) {
      group.position.set(target.pos[0], target.pos[1], target.pos[2]);
      group.rotation.set(target.rot[0], target.rot[1], target.rot[2]);
      group.scale.setScalar(targetScale);
      coreGroup.position.set(coreX, coreY, 0);
      coreGroup.scale.setScalar(coreScale);
      ringGroup.rotation.set(0, aboutPulse * 3.6 + focusPulse * 2.1 + spinBoost * 0.6, projectsPulse * 1.9 - focusPulse * 1.6);
      ringGroup.scale.setScalar(ringScale);
      leftGroup.position.set(leftTargetX, leftTargetY, leftTargetZ);
      leftGroup.rotation.set(projectsPulse * 2.2, projectsPulse * 3.6 + spinBoost * 0.8, 0);
      leftGroup.scale.setScalar(leftScale);
      rightGroup.position.set(rightTargetX, rightTargetY, rightTargetZ);
      rightGroup.rotation.set(focusPulse * 2.0, focusPulse * 3.4 - spinBoost * 0.6, 0);
      rightGroup.scale.setScalar(rightScale);
      initializedRef.current = true;
      return;
    }

    group.position.x = THREE.MathUtils.damp(group.position.x, target.pos[0], 4, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, target.pos[1], 4, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, target.pos[2], 4, delta);

    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, target.rot[0] + velocityBoost * 0.2, 4, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, target.rot[1] + spinBoost, 4, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, target.rot[2] - spinBoost * 0.6, 4, delta);

    const nextScale = THREE.MathUtils.damp(group.scale.x, targetScale, 4, delta);
    group.scale.setScalar(nextScale);

    coreGroup.position.x = THREE.MathUtils.damp(coreGroup.position.x, coreX, 5, delta);
    coreGroup.position.y = THREE.MathUtils.damp(coreGroup.position.y, coreY, 5, delta);
    const coreScaleValue = THREE.MathUtils.damp(coreGroup.scale.x, coreScale, 5, delta);
    coreGroup.scale.setScalar(coreScaleValue);

    ringGroup.rotation.y = THREE.MathUtils.damp(ringGroup.rotation.y, aboutPulse * 3.6 + focusPulse * 2.1 + spinBoost * 0.6, 4, delta);
    ringGroup.rotation.z = THREE.MathUtils.damp(ringGroup.rotation.z, projectsPulse * 1.9 - focusPulse * 1.6, 4, delta);
    const ringScaleValue = THREE.MathUtils.damp(ringGroup.scale.x, ringScale, 4, delta);
    ringGroup.scale.setScalar(ringScaleValue);

    leftGroup.position.x = THREE.MathUtils.damp(leftGroup.position.x, leftTargetX, 4, delta);
    leftGroup.position.y = THREE.MathUtils.damp(leftGroup.position.y, leftTargetY, 4, delta);
    leftGroup.position.z = THREE.MathUtils.damp(leftGroup.position.z, leftTargetZ, 4, delta);
    leftGroup.rotation.y = THREE.MathUtils.damp(leftGroup.rotation.y, projectsPulse * 3.6 + spinBoost * 0.8, 4, delta);
    leftGroup.rotation.x = THREE.MathUtils.damp(leftGroup.rotation.x, projectsPulse * 2.2, 4, delta);
    const leftScaleValue = THREE.MathUtils.damp(leftGroup.scale.x, leftScale, 4, delta);
    leftGroup.scale.setScalar(leftScaleValue);

    rightGroup.position.x = THREE.MathUtils.damp(rightGroup.position.x, rightTargetX, 4, delta);
    rightGroup.position.y = THREE.MathUtils.damp(rightGroup.position.y, rightTargetY, 4, delta);
    rightGroup.position.z = THREE.MathUtils.damp(rightGroup.position.z, rightTargetZ, 4, delta);
    rightGroup.rotation.y = THREE.MathUtils.damp(rightGroup.rotation.y, focusPulse * 3.4 - spinBoost * 0.6, 4, delta);
    rightGroup.rotation.x = THREE.MathUtils.damp(rightGroup.rotation.x, focusPulse * 2.0, 4, delta);
    const rightScaleValue = THREE.MathUtils.damp(rightGroup.scale.x, rightScale, 4, delta);
    rightGroup.scale.setScalar(rightScaleValue);
  });

  return (
    <group ref={groupRef}>
      <group ref={coreGroupRef}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <QuantumParticle position={[0, 0, 0]} color={isDark ? "#6366f1" : "#4F46E5"} scale={1.4} />
          <group ref={ringGroupRef}>
            <MacroscopicWave />
          </group>
        </Float>
      </group>

      <group ref={leftGroupRef}>
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
          <QuantumParticle position={[0, 0, 0]} color={isDark ? "#a855f7" : "#9333EA"} scale={0.6} />
        </Float>
      </group>

      <group ref={rightGroupRef}>
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
          <QuantumParticle position={[0, 0, 0]} color="#C5A059" scale={0.7} />
        </Float>
      </group>
    </group>
  );
};

export const HeroScene: React.FC<{ theme: ThemeMode; scrollState: ScrollStateRef; reducedMotion?: boolean; lowPower?: boolean; active?: boolean; onReady?: () => void; onInvalidateReady?: (invalidate: (() => void) | null) => void }> = ({ theme, scrollState, reducedMotion = false, lowPower = false, active = true, onReady, onInvalidateReady }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={reducedMotion || lowPower ? 1 : [1, 1.5]}
        gl={{ antialias: !(reducedMotion || lowPower), powerPreference: 'high-performance', alpha: true }}
        frameloop={active ? 'always' : 'demand'}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isDark ? 0.2 : 0.6} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 1} color={isDark ? "#C5A059" : "#fff"} />

        <SceneLoadWatcher onReady={onReady} reducedMotion={reducedMotion} lowPower={lowPower} />
        <SceneInvalidateBridge onInvalidateReady={onInvalidateReady} />
        <ScrollRig scrollState={scrollState} reducedMotion={reducedMotion} isDark={isDark} />

        {!reducedMotion && !lowPower && (
          <Suspense fallback={null}>
            <Environment preset={isDark ? "night" : "city"} />
          </Suspense>
        )}
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
