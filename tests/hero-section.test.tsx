import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HeroSection } from '../components/sections/HeroSection';

describe('HeroSection', () => {
  it('renders human studio copy and keeps CTA navigation wired', () => {
    const clickHandler = vi.fn((event: React.MouseEvent) => event.preventDefault());
    const onScrollTo = vi.fn(() => clickHandler);

    render(<HeroSection onScrollTo={onScrollTo} reducedMotion />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /I build software that makes AI useful/i,
    );
    expect(screen.getByText(/Egypt-based engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Current desk/i)).toBeInTheDocument();
    expect(screen.getByText(/Model serving/i)).toBeInTheDocument();

    const projectsLink = screen.getByRole('link', { name: /see the work/i });
    const contactLink = screen.getByRole('link', { name: /start a conversation/i });

    expect(projectsLink).toHaveAttribute('href', '#projects');
    expect(contactLink).toHaveAttribute('href', '#contact');

    fireEvent.click(projectsLink);
    expect(onScrollTo).toHaveBeenCalledWith('projects');
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
