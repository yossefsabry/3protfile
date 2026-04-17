import { useEffect, useRef, useState } from 'react';
import type { PresetPet } from '../data/pets';

type PetTheme = 'light' | 'dark';
type PetAction = 'idle' | 'walk' | 'walkFast' | 'run' | 'swipe';

type PetAnimationState = {
  action: PetAction;
  facing: 1 | -1;
  motionMode: 'calm' | 'roam';
  positionX: number;
  spriteSrc: string;
};

type UsePetAnimationResult = PetAnimationState & {
  triggerReaction: () => void;
};

const PET_ACTION_STEP_MS = 125;
const PET_EDGE_MARGIN = 32;

const resolveSprite = (pet: PresetPet, theme: PetTheme, action: PetAction) => {
  const skin = pet.skins[theme];

  if (action === 'walkFast') {
    return skin.walkFast;
  }

  if (action === 'run') {
    return skin.run;
  }

  if (action === 'swipe') {
    return skin.swipe;
  }

  if (action === 'walk') {
    return skin.walk;
  }

  return skin.idle;
};

const clampPosition = (positionX: number, viewportWidth: number) => {
  return Math.min(Math.max(PET_EDGE_MARGIN, positionX), Math.max(PET_EDGE_MARGIN, viewportWidth - PET_EDGE_MARGIN));
};

const pickTargetX = (viewportWidth: number, currentX: number) => {
  const minimum = PET_EDGE_MARGIN;
  const maximum = Math.max(PET_EDGE_MARGIN, viewportWidth - PET_EDGE_MARGIN);
  const distance = Math.max(96, viewportWidth * 0.28);
  const direction = Math.random() < 0.5 ? -1 : 1;
  return clampPosition(currentX + distance * direction, viewportWidth || window.innerWidth || 1024);
};

export const usePetAnimation = (
  pet: PresetPet,
  theme: PetTheme,
  reducedMotion: boolean,
): UsePetAnimationResult => {
  const [state, setState] = useState<PetAnimationState>(() => ({
    action: 'idle',
    facing: 1,
    motionMode: reducedMotion ? 'calm' : 'roam',
    positionX: 80,
    spriteSrc: resolveSprite(pet, theme, 'idle'),
  }));

  const stateRef = useRef(state);
  const targetXRef = useRef(220);
  const idleUntilRef = useRef(0);
  const lastStepTimeRef = useRef(0);
  const reactionUntilRef = useRef(0);
  const reactionTimeoutRef = useRef<number | null>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // Immediate hover check for better reactivity
      const current = stateRef.current;
      const hoverDist = 60;
      const petRect = {
        x: current.positionX,
        y: (window.innerHeight || 768) - 40,
      };
      const distToMouse = Math.hypot(e.clientX - petRect.x, e.clientY - petRect.y);
      const isHovered = distToMouse <= hoverDist;

      if (isHovered && performance.now() > reactionUntilRef.current && current.action !== 'swipe') {
        const nextState: PetAnimationState = {
          ...current,
          action: 'swipe',
          spriteSrc: resolveSprite(pet, theme, 'swipe'),
        };
        stateRef.current = nextState;
        setState(nextState);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pet, theme]);

  useEffect(() => {
    const resetState: PetAnimationState = {
      action: 'idle',
      facing: 1,
      motionMode: reducedMotion ? 'calm' : 'roam',
      positionX: 80,
      spriteSrc: resolveSprite(pet, theme, 'idle'),
    };

    stateRef.current = resetState;
    targetXRef.current = 220;
    idleUntilRef.current = 0;
    lastStepTimeRef.current = 0;
    reactionUntilRef.current = 0;
    setState(resetState);
  }, [pet, reducedMotion, theme]);

  useEffect(() => {
    return () => {
      if (reactionTimeoutRef.current !== null) {
        window.clearTimeout(reactionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    let frameId = 0;

    const animate = (timestamp: number) => {
      if (timestamp - lastStepTimeRef.current < PET_ACTION_STEP_MS) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      lastStepTimeRef.current = timestamp;
      const viewportWidth = window.innerWidth || 1024;
      const current = stateRef.current;

      // Hover detection logic in loop
      const hoverDist = 60;
      const petRect = {
        x: current.positionX,
        y: window.innerHeight - 40,
      };
      const distToMouse = Math.hypot(mousePosRef.current.x - petRect.x, mousePosRef.current.y - petRect.y);
      const isHovered = distToMouse <= hoverDist;

      if (isHovered && timestamp > reactionUntilRef.current) {
        const nextState: PetAnimationState = {
          ...current,
          action: 'swipe',
          spriteSrc: resolveSprite(pet, theme, 'swipe'),
        };
        stateRef.current = nextState;
        setState(nextState);
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      if (timestamp < reactionUntilRef.current) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      if (timestamp < idleUntilRef.current) {
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      const diffX = targetXRef.current - current.positionX;
      const dist = Math.abs(diffX);

      if (dist < 12) {
        idleUntilRef.current = timestamp + 1000 + Math.random() * 2000;
        targetXRef.current = pickTargetX(viewportWidth, current.positionX);
        
        const nextIdle: PetAnimationState = {
          ...current,
          action: 'idle',
          spriteSrc: resolveSprite(pet, theme, 'idle'),
        };
        stateRef.current = nextIdle;
        setState(nextIdle);
        frameId = window.requestAnimationFrame(animate);
        return;
      }

      const nextFacing: 1 | -1 = diffX < 0 ? -1 : 1;
      const stepSize = pet.speed * 6;
      const nextPositionX = clampPosition(current.positionX + Math.sign(diffX) * stepSize, viewportWidth);
      const nextAction: PetAction = dist > 240 ? 'run' : 'walk';
      const nextState: PetAnimationState = {
        action: nextAction,
        facing: nextFacing,
        motionMode: 'roam',
        positionX: nextPositionX,
        spriteSrc: resolveSprite(pet, theme, nextAction),
      };

      stateRef.current = nextState;
      setState(nextState);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pet, reducedMotion, theme]);

  const triggerReaction = () => {
    if (reactionTimeoutRef.current !== null) {
      window.clearTimeout(reactionTimeoutRef.current);
    }

    reactionUntilRef.current = performance.now() + 700;

    const reactionState: PetAnimationState = {
      ...stateRef.current,
      action: 'swipe',
      spriteSrc: resolveSprite(pet, theme, 'swipe'),
    };

    stateRef.current = reactionState;
    setState(reactionState);

    reactionTimeoutRef.current = window.setTimeout(() => {
      reactionUntilRef.current = 0;
      const nextState: PetAnimationState = {
        ...stateRef.current,
        action: 'idle',
        spriteSrc: resolveSprite(pet, theme, 'idle'),
      };
      stateRef.current = nextState;
      setState(nextState);
    }, 700);
  };

  return { ...state, triggerReaction };
};
