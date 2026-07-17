import { useCallback, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const SESSION_KEY = 'resumeSplash:v1';
const MINIMUM_DURATION_MS = 2000;
const SAFETY_TIMEOUT_MS = 8000;
const PRE_EXIT_DELAY_MS = 500;

interface UseResumeSplashOptions {
  isCriticalVideoSettled: boolean;
  posterUrl: string;
}

interface UseResumeSplashResult {
  isVisible: boolean;
  shouldRender: boolean;
  progress: number;
  prefersReducedMotion: boolean;
  suppressHeroEntrance: boolean;
  isReadyToPlayVideo: boolean;
  completeExit: () => void;
}

const hasVisited = (): boolean => {
  try { return sessionStorage.getItem(SESSION_KEY) === 'complete'; }
  catch { return false; }
};

export const useResumeSplash = ({ isCriticalVideoSettled, posterUrl }: UseResumeSplashOptions): UseResumeSplashResult => {
  const [isEligible] = useState(() => !hasVisited());
  const [shouldRender, setShouldRender] = useState(isEligible);
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [fontsSettled, setFontsSettled] = useState(false);
  const [posterSettled, setPosterSettled] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [exitPhase, setExitPhase] = useState<'loading' | 'pre-exit' | 'exiting'>('loading');
  const prefersReducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (!isEligible) return;
    const startedAt = performance.now();
    const minimumTimer = window.setTimeout(() => setMinimumElapsed(true), MINIMUM_DURATION_MS);
    const safetyTimer = window.setTimeout(() => setTimedOut(true), SAFETY_TIMEOUT_MS);
    
    const image = new Image();
    image.src = posterUrl;
    image.decode().catch(() => undefined).finally(() => setPosterSettled(true));
    
    document.fonts.ready.catch(() => undefined).finally(() => setFontsSettled(true));
    
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && performance.now() - startedAt >= MINIMUM_DURATION_MS) setMinimumElapsed(true);
    };
    
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(safetyTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isEligible, posterUrl]);

  const readiness = useMemo(() => ({
    fonts: fontsSettled || timedOut,
    poster: posterSettled || timedOut,
    video: isCriticalVideoSettled || timedOut,
  }), [fontsSettled, isCriticalVideoSettled, posterSettled, timedOut]);
  
  const progress = 10 + (readiness.fonts ? 20 : 0) + (readiness.poster ? 25 : 0) + (readiness.video ? 45 : 0);

  useEffect(() => {
    if (exitPhase === 'loading' && isEligible && minimumElapsed && progress >= 100) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExitPhase('pre-exit');
    }
  }, [exitPhase, isEligible, minimumElapsed, progress]);

  useEffect(() => {
    if (exitPhase === 'pre-exit') {
      const timer = window.setTimeout(() => setExitPhase('exiting'), PRE_EXIT_DELAY_MS);
      return () => window.clearTimeout(timer);
    }
  }, [exitPhase]);

  const isVisible = isEligible && exitPhase !== 'exiting';
  const isReadyToPlayVideo = !isEligible || exitPhase === 'pre-exit' || exitPhase === 'exiting';

  useEffect(() => {
    if (exitPhase === 'exiting') {
      try { sessionStorage.setItem(SESSION_KEY, 'complete'); }
      catch { /* Storage denial must not block the reveal. */ }
    }
  }, [exitPhase]);

  const completeExit = useCallback(() => setShouldRender(false), []);
  
  return { 
    isVisible, 
    shouldRender, 
    progress, 
    prefersReducedMotion, 
    suppressHeroEntrance: isEligible,
    isReadyToPlayVideo,
    completeExit 
  };
};
