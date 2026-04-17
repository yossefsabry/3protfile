import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';

describe('section rails layout', () => {
  it('renders one section rail in each major section', () => {
    render(
      <>
        <HeroSection onScrollTo={() => () => undefined} />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </>,
    );

    expect(screen.getAllByTestId('section-pet-rail')).toHaveLength(4);
  });
});
