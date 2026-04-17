import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MobileMenu } from '../components/layout/MobileMenu';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    },
  };
});

describe('MobileMenu', () => {
  it('shows pet controls in the mobile menu', () => {
    render(
      <MobileMenu
        isOpen
        onClose={vi.fn()}
        onScrollTo={() => vi.fn()}
        theme="dark"
        petsEnabled
        onTogglePets={vi.fn()}
        onTogglePetSettings={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /toggle pets/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pet settings/i })).toBeInTheDocument();
  });
});
