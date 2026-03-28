/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useRef, useState, Suspense } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { Navigation } from './components/layout/Navigation';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { MatrixBackground } from './components/effects/MatrixBackground';

const HeroSection = React.lazy(() => import('./components/sections/HeroSection').then(m => ({ default: m.HeroSection })));
const AboutSection = React.lazy(() => import('./components/sections/AboutSection').then(m => ({ default: m.AboutSection })));
const ProjectsSection = React.lazy(() => import('./components/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const ContactSection = React.lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })));
import { useAudioController } from './hooks/useAudioController';
import { useDeviceProfile } from './hooks/useDeviceProfile';
import { useLoadingSequence } from './hooks/useLoadingSequence';
import { useScrolledState } from './hooks/useScrolledState';

const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const isCvRoute = typeof window !== 'undefined' && window.location.pathname === '/cv';
  const scrolled = useScrolledState();
  const { isPhone, isLowPower } = useDeviceProfile(Boolean(prefersReducedMotion));
  const { isLoading } = useLoadingSequence(false);
  const audio = useAudioController();

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
      className={`no-radius min-h-[100dvh] overflow-x-hidden transition-colors duration-500 selection:bg-[#f6c177] selection:text-[#000000] ${isCvRoute ? 'text-stone-700 dark:text-stone-200' : 'matrix-shell rose-pine-shell text-[#f6f2ff]'}`}
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
            className="flex items-center gap-3 rounded-full border border-[#907aa9]/28 bg-[#1f1d2e]/92 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#f6f2ff] shadow-2xl transition-transform hover:-translate-y-0.5 hover:bg-[#26233a]"
          >
            Enable Sound
          </button>
        </div>
      )}



      <div className="relative">
        {!isCvRoute && (
          <MatrixBackground
            isPhone={isPhone}
            isLowPower={isLowPower}
            reducedMotion={Boolean(prefersReducedMotion)}
          />
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
          />
          <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onScrollTo={scrollToSection} />

          <Suspense fallback={<div className="min-h-[100dvh]" />}>
            <HeroSection onScrollTo={scrollToSection} />
            <main>
              <AboutSection />
              <ProjectsSection />
              <ContactSection />
            </main>
          </Suspense>
        </div>
      </div>

      <Footer footerRef={footerRef} />
    </div>
  );
};

export default App;
