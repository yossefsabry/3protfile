import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SectionPetRail } from '../components/pets/SectionPetRail';

describe('SectionPetRail', () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
  });

  it('renders a thin rail with the mapped pet icon', () => {
    render(<SectionPetRail sectionId="about" theme="dark" isActive={false} reducedMotion={false} />);

    expect(screen.getByTestId('section-pet-rail')).toBeInTheDocument();
    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-section-id', 'about');
    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-pet-id', 'vampire');
  });

  it('renders nothing when the section mapping is missing', () => {
    render(<SectionPetRail sectionId="unknown" theme="dark" isActive={false} reducedMotion={false} />);
    expect(screen.queryByTestId('section-pet-rail')).not.toBeInTheDocument();
  });

  it('fails closed when rerendered from a valid section to an unknown section', () => {
    const { rerender } = render(<SectionPetRail sectionId="about" theme="dark" isActive={false} reducedMotion={false} />);
    expect(screen.getByTestId('section-pet-rail')).toBeInTheDocument();

    rerender(<SectionPetRail sectionId="unknown" theme="dark" isActive={false} reducedMotion={false} />);
    expect(screen.queryByTestId('section-pet-rail')).not.toBeInTheDocument();
  });

  it('animates only when the rail is active', () => {
    render(<SectionPetRail sectionId="projects" theme="dark" isActive reducedMotion={false} />);
    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-motion-mode', 'active');
  });

  it('stays calm when the rail is inactive', () => {
    render(<SectionPetRail sectionId="projects" theme="dark" isActive={false} reducedMotion={false} />);
    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-motion-mode', 'idle');
  });

  it('uses calm mode when reduced motion is enabled', () => {
    render(<SectionPetRail sectionId="contact" theme="dark" isActive reducedMotion />);
    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-motion-mode', 'calm');
  });

  it('uses compact travel bounds on narrow screens', () => {
    window.innerWidth = 390;
    render(<SectionPetRail sectionId="contact" theme="dark" isActive reducedMotion={false} />);
    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-compact', 'true');
  });

  it('updates compact mode when the viewport width changes after mount', () => {
    window.innerWidth = 390;
    render(<SectionPetRail sectionId="contact" theme="dark" isActive reducedMotion={false} />);
    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-compact', 'true');

    window.innerWidth = 1024;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-compact', 'false');
  });

  it('uses the configured per-section icon size', () => {
    render(<SectionPetRail sectionId="projects" theme="dark" isActive={false} reducedMotion={false} />);
    expect(screen.getByTestId('section-pet-rail')).toHaveAttribute('data-icon-size', '58');
  });
});
