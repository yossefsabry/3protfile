/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useMemo, useRef, useState, Suspense } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Navigation } from './components/layout/Navigation';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';

const HeroSection = React.lazy(() => import('./components/sections/HeroSection').then(m => ({ default: m.HeroSection })));
const AboutSection = React.lazy(() => import('./components/sections/AboutSection').then(m => ({ default: m.AboutSection })));
const ProjectsSection = React.lazy(() => import('./components/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const ContactSection = React.lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })));
import { useAudioController } from './hooks/useAudioController';
import { useDeviceProfile } from './hooks/useDeviceProfile';
import { useLoadingSequence } from './hooks/useLoadingSequence';
import { useScrolledState } from './hooks/useScrolledState';
import { useThemeTransition } from './hooks/useThemeTransition';
import { useActiveSectionRail } from './hooks/useActiveSectionRail';

const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const isCvRoute = typeof window !== 'undefined' && window.location.pathname === '/cv';
  const scrolled = useScrolledState();
  const { theme } = useThemeTransition({});
  const { isLoading } = useLoadingSequence(false);
  const audio = useAudioController();
  const railSectionRefs = useMemo(() => (
    isCvRoute
      ? {}
      : {
          hero: heroSectionRef,
          about: aboutSectionRef,
          projects: projectsSectionRef,
          contact: contactSectionRef,
        }
  ), [isCvRoute]);
  const { activeSectionId } = useActiveSectionRail(railSectionRefs);

  const scrollToSection = useCallback((id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const scrollingOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - scrollingOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      data-testid="app-shell"
      data-theme={theme}
      className={`min-h-[100dvh] overflow-x-hidden transition-colors duration-500 selection:bg-[#c4a7e7]/30 selection:text-white ${isCvRoute ? 'text-stone-700 dark:text-stone-200' : `bg-[#09090b] ${theme === 'light' ? 'text-[#232136]' : 'text-[#fafafa]'}`}`}
    >
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <audio ref={audio.audioRef} src={audio.activeTrackUrl} preload="auto" autoPlay playsInline />
      <audio ref={audio.sfxRef} src={audio.sfxUrl} preload="auto" playsInline />

      {audio.needsAudioUnlock && (
        <div className="fixed bottom-6 right-6 z-[60]">
          <button
            type="button"
            onClick={audio.requestAudioStart}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-medium text-white/80 shadow-2xl backdrop-blur-xl transition-all hover:bg-white/10"
          >
            Enable Sound
          </button>
        </div>
      )}

      {/* Subtle ambient gradients */}
      {!isCvRoute && (
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,167,231,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(86,148,159,0.05),transparent_50%)]" />
        </div>
      )}

      <div className="relative z-10">
        <Navigation
          scrolled={scrolled}
          menuOpen={menuOpen}
          isLoading={isLoading}
          isAudioPlaying={audio.isAudioPlaying}
          tracks={audio.tracks}
          activeTrackId={audio.activeTrackId}
          onSelectTrack={audio.setSelectedTrackId}
          onToggleAudio={audio.toggleAudio}
          onToggleMenu={() => setMenuOpen((prev) => !prev)}
          onScrollTop={handleScrollTop}
          onScrollTo={scrollToSection}
          theme={theme}
        />
        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onScrollTo={scrollToSection}
        />

        <Suspense fallback={<div className="min-h-[100dvh]" />}>
          <HeroSection
            onScrollTo={scrollToSection}
            reducedMotion={Boolean(prefersReducedMotion)}
            sectionRef={heroSectionRef}
          />
          <main>
            <AboutSection
              reducedMotion={Boolean(prefersReducedMotion)}
              sectionRef={aboutSectionRef}
            />
            <ProjectsSection
              reducedMotion={Boolean(prefersReducedMotion)}
              sectionRef={projectsSectionRef}
            />
            <ContactSection
              reducedMotion={Boolean(prefersReducedMotion)}
              sectionRef={contactSectionRef}
            />
          </main>
        </Suspense>
      </div>

      <Footer footerRef={footerRef} />
    </div>
  );
};

export default App;
