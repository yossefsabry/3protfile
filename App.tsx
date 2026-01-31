
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useLayoutEffect, Suspense, memo, useRef, useId } from 'react';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, BookOpen, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Lazy load heavy 3D scenes
const HeroScene = React.lazy(() => import('./components/QuantumScene').then(m => ({ default: m.HeroScene })));
const QuantumComputerScene = React.lazy(() => import('./components/QuantumScene').then(m => ({ default: m.QuantumComputerScene })));

const mossGrottoTrack = new URL('./music/Christopher Larkin - Moss Grotto.mp3', import.meta.url).href;
const themeSwitchTrack = new URL('./music/gay.mp3', import.meta.url).href;

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-8 h-8 border-2 border-nobel-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const InfoCard = memo(({ title, detail, href, delay }: { title: string, detail: string, href?: string, delay: string }) => {
  const prefersReducedMotion = useReducedMotion();
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: parseFloat(delay) || 0 },
        viewport: { once: true, amount: 0.35 },
      };

  const content = (
    <>
      <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 text-center mb-3">{title}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 dark:text-stone-400 font-bold uppercase tracking-widest text-center leading-relaxed">{detail}</p>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col group animate-fade-in-up items-center p-8 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50"
        style={{ animationDelay: delay }}
        {...animationProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      className="flex flex-col group animate-fade-in-up items-center p-8 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50"
      style={{ animationDelay: delay }}
      {...animationProps}
    >
      {content}
    </motion.div>
  );
});

const LOADER_MIN_DURATION = 1000;
const LOADER_MAX_DURATION = 2500;

const ThemeWaterTransition = ({ toTheme }: { toTheme: 'light' | 'dark' }) => {
  const prefersReducedMotion = useReducedMotion();
  const idBase = useId().replace(/:/g, '');
  const maskId = `${idBase}-mask`;
  const filterId = `${idBase}-filter`;
  const overlayColor = toTheme === 'dark' ? '#0F1115' : '#F9F8F4';
  const highlightColor = toTheme === 'dark'
    ? 'rgba(197, 160, 89, 0.12)'
    : 'rgba(197, 160, 89, 0.18)';

  return (
    <motion.div
      className="fixed inset-0 z-[60] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
    >
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <motion.circle
              cx="100"
              cy="0"
              r="0"
              fill="white"
              filter={`url(#${filterId})`}
              initial={{ r: 0 }}
              animate={{ r: prefersReducedMotion ? 120 : 140 }}
              transition={{ duration: prefersReducedMotion ? 0.4 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={overlayColor} mask={`url(#${maskId})`} />
      </motion.svg>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 120% at 100% 0%, ${highlightColor} 0%, transparent 65%)` }}
      />
    </motion.div>
  );
};

const LoadingScreen = ({ theme }: { theme: 'light' | 'dark' }) => {
  const prefersReducedMotion = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[70] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ backgroundColor: isDark ? '#0F1115' : '#F9F8F4' }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ clipPath: 'circle(12% at 100% 0%)' }}
        animate={prefersReducedMotion ? undefined : {
          clipPath: [
            'circle(12% at 100% 0%)',
            'circle(28% at 100% 0%)',
            'circle(12% at 100% 0%)'
          ]
        }}
        transition={prefersReducedMotion ? undefined : { duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        style={{ background: isDark ? 'rgba(197,160,89,0.12)' : 'rgba(197,160,89,0.18)' }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          className="font-serif text-4xl tracking-wide"
          style={{ color: isDark ? '#F9F8F4' : '#0F1115' }}
        >
          YON3
        </div>
        <div
          className="text-[10px] uppercase tracking-[0.4em]"
          style={{ color: isDark ? '#A1A1AA' : '#6B7280' }}
        >
          Loading portfolio
        </div>
        <div
          className="mt-3 h-[3px] w-44 rounded-full overflow-hidden"
          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,17,21,0.1)' }}
        >
          <motion.div
            className="h-full w-1/3 bg-nobel-gold"
            initial={{ x: '-40%' }}
            animate={prefersReducedMotion ? { x: '0%' } : { x: '140%' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

class SceneErrorBoundary extends React.Component<React.PropsWithChildren<{ fallback: React.ReactNode }>, { hasError: boolean }> {
  constructor(props: React.PropsWithChildren<{ fallback: React.ReactNode }>) {
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

const SceneFallback = ({ theme }: { theme: 'light' | 'dark' }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: theme === 'dark'
        ? 'radial-gradient(circle at 50% 45%, rgba(197,160,89,0.15) 0%, rgba(15,17,21,0.95) 65%)'
        : 'radial-gradient(circle at 50% 45%, rgba(197,160,89,0.2) 0%, rgba(249,248,244,1) 65%)'
    }}
  />
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState<'light' | 'dark' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canRender3d, setCanRender3d] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const themeTimeoutRef = useRef<number | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);
  const loadingMaxTimeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);
  const audioAutoplayRef = useRef(false);
  const resumeAfterSfxRef = useRef(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setCanRender3d(!!gl);
    } catch {
      setCanRender3d(false);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.12;
    audio.loop = true;

    const handlePlay = () => setIsAudioPlaying(true);
    const handlePause = () => setIsAudioPlaying(false);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    const tryPlay = () => {
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => setIsAudioPlaying(false));
      }
    };

    tryPlay();

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    const sfx = sfxRef.current;
    if (!sfx) return;
    sfx.volume = 0.3;
    sfx.loop = false;

    const handleEnded = () => {
      const bg = audioRef.current;
      if (!bg || !resumeAfterSfxRef.current) return;
      const playPromise = bg.play();
      if (playPromise) {
        playPromise.catch(() => setIsAudioPlaying(false));
      }
    };

    sfx.addEventListener('ended', handleEnded);
    return () => sfx.removeEventListener('ended', handleEnded);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioAutoplayRef.current) return;
      audioAutoplayRef.current = true;
      const audio = audioRef.current;
      if (!audio) return;
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => setIsAudioPlaying(false));
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    return () => window.removeEventListener('pointerdown', handleFirstInteraction);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();
    const fontsReady = typeof document !== 'undefined' && 'fonts' in document
      ? document.fonts.ready
      : Promise.resolve();

    loadingMaxTimeoutRef.current = window.setTimeout(() => {
      if (isMounted) setIsLoading(false);
    }, LOADER_MAX_DURATION);

    Promise.resolve(fontsReady).then(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, LOADER_MIN_DURATION - elapsed);
      loadingTimeoutRef.current = window.setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, remaining);
      if (loadingMaxTimeoutRef.current) {
        window.clearTimeout(loadingMaxTimeoutRef.current);
        loadingMaxTimeoutRef.current = null;
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (themeTimeoutRef.current) window.clearTimeout(themeTimeoutRef.current);
      if (loadingTimeoutRef.current) window.clearTimeout(loadingTimeoutRef.current);
      if (loadingMaxTimeoutRef.current) window.clearTimeout(loadingMaxTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isThemeTransitioning || isLoading) return;
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setIsThemeTransitioning(true);
    setTransitionTheme(nextTheme);
    if (themeTimeoutRef.current) window.clearTimeout(themeTimeoutRef.current);
    if (nextTheme === 'light') {
      const bg = audioRef.current;
      const sfx = sfxRef.current;
      if (bg && sfx) {
        resumeAfterSfxRef.current = !bg.paused;
        if (!bg.paused) bg.pause();
        sfx.currentTime = 0;
        const playPromise = sfx.play();
        if (playPromise) {
          playPromise.catch(() => {
            resumeAfterSfxRef.current = false;
          });
        }
      }
    }
    setTheme(nextTheme);
    themeTimeoutRef.current = window.setTimeout(() => {
      setIsThemeTransitioning(false);
      setTransitionTheme(null);
    }, 900);
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => setIsAudioPlaying(false));
      }
    } else {
      resumeAfterSfxRef.current = false;
      audio.pause();
    }
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Renamed headerOffset to scrollingOffset to avoid collision with standard tag name
      const scrollingOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - scrollingOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-nobel-cream dark:bg-nobel-dark text-stone-800 dark:text-stone-200 transition-colors duration-500 selection:bg-nobel-gold selection:text-white overflow-x-hidden">

      <AnimatePresence>
        {isLoading && <LoadingScreen theme={theme} />}
      </AnimatePresence>

      {/* Water Transition Overlay */}
      <AnimatePresence>
        {transitionTheme && <ThemeWaterTransition toTheme={transitionTheme} />}
      </AnimatePresence>

      <audio ref={audioRef} src={mossGrottoTrack} preload="auto" />
      <audio ref={sfxRef} src={themeSwitchTrack} preload="auto" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-nobel-dark/80 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-nobel-gold rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg transition-transform group-hover:scale-110 pb-1">Y</div>
            <span className={`font-serif font-bold text-xl tracking-wider transition-all ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 md:opacity-100 md:translate-x-0 dark:text-white'}`}>
              YON3
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em] text-stone-600 dark:text-stone-400">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</a>
            <a href="#projects" onClick={scrollToSection('projects')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Projects</a>
            <a href="#focus" onClick={scrollToSection('focus')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Focus</a>
            <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Contact</a>
            
            <div className="w-[1px] h-6 bg-stone-200 dark:bg-stone-800 mx-2"></div>

            <button 
              onClick={toggleTheme}
              disabled={isThemeTransitioning || isLoading}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all text-stone-900 dark:text-stone-100 shadow-sm active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={toggleAudio}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all text-stone-900 dark:text-stone-100 shadow-sm active:scale-95"
              aria-label={isAudioPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            <a 
              href="https://github.com/yossefsabry" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2.5 bg-stone-900 dark:bg-white dark:text-stone-900 text-white rounded-xl hover:bg-stone-800 dark:hover:bg-stone-100 transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
            >
              VIEW GITHUB
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              disabled={isThemeTransitioning || isLoading}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
               {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={toggleAudio}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100"
              aria-label={isAudioPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isAudioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button className="p-2 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-nobel-dark flex flex-col items-center justify-center gap-8 text-2xl font-serif"
          >
              <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors dark:text-white">About</a>
              <a href="#projects" onClick={scrollToSection('projects')} className="hover:text-nobel-gold transition-colors dark:text-white">Projects</a>
              <a href="#focus" onClick={scrollToSection('focus')} className="hover:text-nobel-gold transition-colors dark:text-white">Focus</a>
              <a href="#contact" onClick={scrollToSection('contact')} className="hover:text-nobel-gold transition-colors dark:text-white">Contact</a>
              <a 
                href="https://github.com/yossefsabry" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-3 bg-stone-900 dark:bg-white dark:text-stone-900 text-white rounded-xl shadow-lg"
              >
                View GitHub
              </a>
              <button onClick={() => setMenuOpen(false)} className="mt-8 p-4 rounded-full border border-stone-200 dark:border-stone-800 text-stone-400"><X size={32} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {canRender3d ? (
          <Suspense fallback={<div className="absolute inset-0 bg-nobel-cream dark:bg-nobel-dark transition-colors duration-500" />}>
            <SceneErrorBoundary fallback={<SceneFallback theme={theme} />}>
              <HeroScene theme={theme} />
            </SceneErrorBoundary>
          </Suspense>
        ) : (
          <SceneFallback theme={theme} />
        )}
        
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.7)_0%,rgba(249,248,244,0.2)_60%,rgba(249,248,244,0)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(15,17,21,0.6)_0%,rgba(15,17,21,0.2)_60%,rgba(15,17,21,0)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-4 py-1.5 border-2 border-nobel-gold text-nobel-gold text-xs tracking-[0.3em] uppercase font-black rounded-full backdrop-blur-md bg-white/60 dark:bg-black/40 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
          >
            TECH GEEK • EGYPT
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-8 text-stone-950 dark:text-white tracking-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
          >
            YON3
            <span className="hero-scan-text italic font-light text-2xl md:text-4xl lg:text-5xl block mt-6 tracking-normal drop-shadow-[0_3px_10px_rgba(0,0,0,0.25)]">TECH GEEK</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hero-scan-text max-w-3xl mx-auto text-xl md:text-2xl font-light leading-relaxed mb-16 drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
          >
            Building ambitious software across AI, systems, and expressive UI with a focus on performance and clarity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
             <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-3 text-xs font-black tracking-[0.4em] text-stone-600 hover:text-nobel-gold transition-colors cursor-pointer">
                <span>EXPLORE</span>
                <span className="p-3 border-2 border-stone-300 dark:border-stone-800 rounded-2xl group-hover:border-nobel-gold transition-all bg-white/50 dark:bg-white/5 backdrop-blur-sm group-hover:-translate-y-1">
                    <ArrowDown size={20} className="animate-bounce" />
                </span>
             </a>
          </motion.div>
        </div>
      </header>

      <main>
        <section id="about" className="py-32 bg-white dark:bg-[#121418] transition-colors duration-500">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-5">
              <div className="inline-block mb-4 text-xs font-black tracking-[0.2em] text-nobel-gold uppercase">ABOUT</div>
              <h2 className="font-serif text-5xl lg:text-6xl mb-8 leading-tight text-stone-900 dark:text-white">Building hard things with taste</h2>
              <div className="w-24 h-1.5 bg-nobel-gold rounded-full mb-8"></div>
              <p className="text-stone-500 dark:text-stone-400 italic font-serif text-xl">
                "try be smarter"
              </p>
            </div>
            <div className="md:col-span-7 text-xl text-stone-600 dark:text-stone-400 leading-relaxed space-y-8 font-light">
              <p>
                <span className="text-7xl float-left mr-4 mt-[-4px] font-serif text-nobel-gold font-bold">I</span> am Yossef (YON3), a TECH GEEK from Egypt. I build ambitious software across AI, systems, and expressive UI with a focus on clean execution.
              </p>
              <p>
                I like projects that feel hard: interpreters, AI tooling, graphics systems, and backend services that hold up under pressure.
              </p>
              <div className="p-8 bg-stone-50 dark:bg-stone-900/40 rounded-3xl border border-stone-100 dark:border-stone-800">
                <p className="text-stone-900 dark:text-stone-100 font-medium mb-2">Current focus:</p>
                <p className="text-lg">AI-powered tools, system-level experiments, and elegant UI that feels effortless but performs hard.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-32 bg-stone-50 dark:bg-nobel-dark transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white dark:bg-stone-800 text-nobel-gold text-xs font-black tracking-widest uppercase rounded-2xl mb-8 border border-stone-100 dark:border-stone-700 shadow-sm">
                            <BookOpen size={16}/> SELECTED PROJECTS
                        </div>
                        <h2 className="font-serif text-5xl md:text-6xl mb-8 text-stone-900 dark:text-white">Complex builds, clean execution</h2>
                        <p className="text-xl text-stone-600 dark:text-stone-400 mb-8 leading-relaxed font-light">
                           These are the projects that pushed me into deeper systems, AI workflows, and performance-focused tooling.
                        </p>
                        <ul className="space-y-4 text-stone-700 dark:text-stone-300">
                            <li className="flex gap-4 items-start">
                                <span className="w-6 h-6 rounded-full bg-nobel-gold/20 flex items-center justify-center text-nobel-gold shrink-0 mt-1">•</span>
                                <span><strong>AI + Systems:</strong> Models, tools, and infrastructure that scale.</span>
                            </li>
                            <li className="flex gap-4 items-start">
                                <span className="w-6 h-6 rounded-full bg-nobel-gold/20 flex items-center justify-center text-nobel-gold shrink-0 mt-1">•</span>
                                <span><strong>Graphics + UI:</strong> Clean visuals with fast interaction loops.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-nobel-gold/5 blur-3xl rounded-full"></div>
                        <SurfaceCodeDiagram />
                    </div>
                </div>
            </div>
        </section>

        <section id="focus" className="py-32 bg-stone-900 dark:bg-black text-white overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                     <div className="order-2 lg:order-1 scale-110">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-stone-800 text-nobel-gold text-xs font-black tracking-widest uppercase rounded-2xl mb-8 border border-stone-700 shadow-xl">
                            FOCUS
                        </div>
                        <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">Precision, speed,<br/>and clean systems</h2>
                        <p className="text-xl text-stone-400 leading-relaxed font-light mb-8">
                            I like systems that feel deliberate: tight UI, strong architecture, and experiments that actually ship.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="border-l-2 border-nobel-gold pl-6">
                                <div className="text-3xl font-serif mb-1">70+</div>
                                <div className="text-xs text-stone-500 uppercase font-bold tracking-widest">Public Repos</div>
                            </div>
                            <div className="border-l-2 border-nobel-gold pl-6">
                                <div className="text-3xl font-serif mb-1">AI + C</div>
                                <div className="text-xs text-stone-500 uppercase font-bold tracking-widest">Hybrid Focus</div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        <section id="stack" className="py-32 bg-white dark:bg-nobel-dark">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="font-serif text-5xl md:text-6xl mb-8 text-stone-900 dark:text-white">Stack & Tools</h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400 font-light">
                        A balanced toolkit for fast frontend, reliable backend, and experimental AI workflows.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>

        <section id="now" className="py-32 bg-stone-50 dark:bg-[#121418] border-y border-stone-200 dark:border-stone-800">
              <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-20">
                 <div className="md:col-span-6 relative">
                    <div className="aspect-[4/3] bg-white dark:bg-stone-900 rounded-[2rem] overflow-hidden relative border border-stone-200 dark:border-stone-800 shadow-2xl">
                        {canRender3d ? (
                          <Suspense fallback={<LoadingSpinner />}>
                            <SceneErrorBoundary fallback={<SceneFallback theme={theme} />}>
                              <QuantumComputerScene theme={theme} />
                            </SceneErrorBoundary>
                          </Suspense>
                        ) : (
                          <SceneFallback theme={theme} />
                        )}
                        <div className="absolute top-6 right-6 px-4 py-2 bg-stone-900/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                            Live Scene
                        </div>
                    </div>
                </div>
                 <div className="md:col-span-6 flex flex-col justify-center">
                    <div className="inline-block mb-4 text-xs font-black tracking-[0.2em] text-stone-500 uppercase">NOW BUILDING</div>
                    <h2 className="font-serif text-5xl mb-8 text-stone-900 dark:text-white">Systems that feel effortless</h2>
                    <p className="text-xl text-stone-600 dark:text-stone-400 mb-10 leading-relaxed font-light">
                        I am focused on AI-powered tools, system experiments, and interfaces that move fast without losing precision.
                    </p>
                    <div className="p-10 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-nobel-gold/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                        <p className="font-serif italic text-2xl text-stone-800 dark:text-stone-200 mb-6 leading-snug">
                            "Building hard things should still feel clean and calm."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-nobel-gold rounded-xl flex items-center justify-center text-white font-bold">Y</div>
                            <div>
                                <span className="text-sm font-black text-stone-900 dark:text-white tracking-wider block uppercase">YON3</span>
                                <span className="text-xs text-stone-400 uppercase tracking-widest">TECH GEEK, EGYPT</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        <section id="contact" className="py-32 bg-white dark:bg-nobel-dark">
           <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="font-serif text-5xl mb-6 text-stone-900 dark:text-white">Contact & Links</h2>
                    <p className="text-stone-500 dark:text-stone-400 text-lg">Find me and my work across the web.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch flex-wrap">
                    <InfoCard title="GitHub" detail="github.com/yossefsabry" href="https://github.com/yossefsabry" delay="0s" />
                    <InfoCard title="Website" detail="yossefsabry.me" href="https://yossefsabry.me" delay="0.1s" />
                    <InfoCard title="Email" detail="yossefsabry66@gmail.com" href="https://mail.google.com/mail/?view=cm&to=yossefsabry66@gmail.com" delay="0.2s" />
                </div>
           </div>
        </section>
      </main>

      <footer className="bg-stone-900 dark:bg-black text-stone-500 py-24 border-t border-stone-800">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
                <div className="text-white font-serif font-bold text-3xl mb-6">YON3</div>
                <p className="text-lg max-w-md mb-8 font-light">TECH GEEK building ambitious software across AI, systems, and expressive UI.</p>
                <div className="flex gap-6">
                    <a href="https://github.com/yossefsabry" target="_blank" rel="noopener noreferrer" className="hover:text-nobel-gold transition-colors font-bold text-xs uppercase tracking-widest">GitHub</a>
                    <a href="https://yossefsabry.me" target="_blank" rel="noopener noreferrer" className="hover:text-nobel-gold transition-colors font-bold text-xs uppercase tracking-widest">Website</a>
                </div>
            </div>
            <div className="flex flex-col justify-end text-xs font-mono space-y-2">
                <div className="text-stone-400">CONTACT:</div>
                <p>yossefsabry66@gmail.com</p>
                <p className="text-stone-700">EGYPT · TECH GEEK · YON3</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
