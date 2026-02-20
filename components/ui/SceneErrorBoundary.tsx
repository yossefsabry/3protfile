/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

type SceneErrorBoundaryProps = React.PropsWithChildren<{ fallback: React.ReactNode }>;

export class SceneErrorBoundary extends React.Component<SceneErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: SceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
