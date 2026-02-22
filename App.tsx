/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { CustomCursor } from './components/ui/CustomCursor';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ThemeWaterTransition } from './components/ui/ThemeWaterTransition';
import { Navigation } from './components/layout/Navigation';
import { MobileMenu } from './components/layout/MobileMenu';
import { SceneLayers } from './components/layout/SceneLayers';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { FocusSection } from './components/sections/FocusSection';
import { ContactSection } from './components/sections/ContactSection';
import { useAudioController } from './hooks/useAudioController';
import { useDeviceProfile } from './hooks/useDeviceProfile';
import { useLoadingSequence } from './hooks/useLoadingSequence';
import { useSceneActivity } from './hooks/useSceneActivity';
import { useSceneScroll } from './hooks/useSceneScroll';
import { useScrolledState } from './hooks/useScrolledState';
import { useThemeTransition } from './hooks/useThemeTransition';

const App: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledState();
  const { isPhone, isLowPower, canRender3d } = useDeviceProfile(prefersReducedMotion);
  const shouldRender3d = canRender3d && !isPhone;
  const { markSceneActive, setSceneInvalidate, invalidateScene } = useSceneActivity(shouldRender3d);
  const { scrollStateRef, sceneWrapperRef, meteorWrapperRef, footerRef } = useSceneScroll(markSceneActive);
  const { isLoading, setSceneReady } = useLoadingSequence(shouldRender3d);
  const audio = useAudioController();

  const { theme, isThemeTransitioning, transitionTheme, toggleTheme } = useThemeTransition({
    isBlocked: isLoading,
    onBeforeChange: (nextTheme) => {
      if (nextTheme === 'light') audio.playThemeSwitchSfx();
    },
    onAfterChange: () => markSceneActive(),
  });

  useEffect(() => {
    invalidateScene();
  }, [invalidateScene, isLowPower, prefersReducedMotion, theme]);

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
    <div className="no-radius min-h-screen text-stone-800 dark:text-stone-200 transition-colors duration-500 selection:bg-nobel-gold selection:text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen theme={theme} />}
      </AnimatePresence>

      <AnimatePresence>
        {transitionTheme && <ThemeWaterTransition toTheme={transitionTheme} />}
      </AnimatePresence>

      <audio ref={audio.audioRef} src={audio.activeTrackUrl} preload="auto" autoPlay playsInline />
      <audio ref={audio.sfxRef} src={audio.sfxUrl} preload="auto" playsInline />

      {audio.needsAudioUnlock && (
        <div className="fixed bottom-6 right-6 z-[60]">
          <button
            type="button"
            onClick={audio.requestAudioStart}
            className="flex items-center gap-3 rounded-full bg-stone-900/90 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-2xl transition-transform hover:-translate-y-0.5 dark:bg-white/90 dark:text-stone-900"
          >
            Enable Sound
          </button>
        </div>
      )}

      <CustomCursor theme={theme} disabled={isLoading || prefersReducedMotion || isLowPower} />

      <div className="relative">
        <SceneLayers
          theme={theme}
          shouldRender3d={shouldRender3d}
          reducedMotion={prefersReducedMotion}
          lowPower={isLowPower}
          active={shouldRender3d && !prefersReducedMotion}
          onSceneReady={() => setSceneReady(true)}
          onInvalidateReady={setSceneInvalidate}
          scrollStateRef={scrollStateRef}
          sceneWrapperRef={sceneWrapperRef}
          meteorWrapperRef={meteorWrapperRef}
        />

        <div className="relative z-10">
          <Navigation
            scrolled={scrolled}
            menuOpen={menuOpen}
            theme={theme}
            isThemeTransitioning={isThemeTransitioning}
            isLoading={isLoading}
            isAudioPlaying={audio.isAudioPlaying}
            tracks={audio.tracks}
            activeTrackId={audio.activeTrackId}
            onSelectTrack={audio.setSelectedTrackId}
            onToggleTheme={toggleTheme}
            onToggleAudio={audio.toggleAudio}
            onToggleMenu={() => setMenuOpen((prev) => !prev)}
            onScrollTop={handleScrollTop}
            onScrollTo={scrollToSection}
          />
          <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onScrollTo={scrollToSection} />

          <HeroSection onScrollTo={scrollToSection} />
          <main>
            <AboutSection />
            <ProjectsSection />
            <FocusSection />
            <ContactSection />
          </main>
        </div>
      </div>

      <Footer footerRef={footerRef} />
    </div>
  );
};

export default App;
