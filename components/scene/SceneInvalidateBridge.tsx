/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

type SceneInvalidateBridgeProps = {
  onInvalidateReady?: (invalidate: (() => void) | null) => void;
};

export const SceneInvalidateBridge = ({ onInvalidateReady }: SceneInvalidateBridgeProps) => {
  const { invalidate } = useThree();

  useEffect(() => {
    onInvalidateReady?.(invalidate);
    return () => onInvalidateReady?.(null);
  }, [invalidate, onInvalidateReady]);

  return null;
};
