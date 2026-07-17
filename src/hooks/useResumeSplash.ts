import { useCallback, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import psuHeroPoster from '../assets/resume/hero/psu-poster.jpg';

const SESSION_KEY = 'resumeSplash:v1';
const MINIMUM_DURATION_MS = 2000;
const SAFETY_TIMEOUT_MS = 8000;

interface UseResumeSplashOptions { isCriticalVideoSettled: boolean; }

interface UseResumeSplashResult {
  isVisible: boolean;
  shouldRender: boolean;
  progress: number;
  prefersReducedMotion: boolean;
  suppressHeroEntrance: boolean;
  completeExit: () => void;
}

const hasVisited = (): boolean => {
  try { return sessionStorage.getItem(SESSION_KEY) === 'complete'; }
  catch { return false; }
};

export const useResumeSplash = ({ isCriticalVideoSettled }: UseResumeSplashOptions): UseResumeSplashResult => {
  const [isEligible] = useState(() => !hasVisited());
  const [shouldRender, setShouldRender] = useState(isEligible);
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [fontsSettled, setFontsSettled] = useState(false);
  const [posterSettled, setPosterSettled] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const prefersReducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (!isEligible) return;
    const startedAt = performance.now();
    const minimumTimer = window.setTimeout(() => setMinimumElapsed(true), MINIMUM_DURATION_MS);
    const safetyTimer = window.setTimeout(() => setTimedOut(true), SAFETY_TIMEOUT_MS);
    const image = new Image();
    image.src = psuHeroPoster;
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
  }, [isEligible]);

  const readiness = useMemo(() => ({
    fonts: fontsSettled || timedOut,
    poster: posterSettled || timedOut,
    video: isCriticalVideoSettled || timedOut,
  }), [fontsSettled, isCriticalVideoSettled, posterSettled, timedOut]);
  const progress = 10 + (readiness.fonts ? 20 : 0) + (readiness.poster ? 25 : 0) + (readiness.video ? 45 : 0);
  const isVisible = isEligible && (!minimumElapsed || progress < 100);

  useEffect(() => {
    if (!isEligible || !minimumElapsed || progress < 100) return;
    try { sessionStorage.setItem(SESSION_KEY, 'complete'); }
    catch { /* Storage denial must not block the reveal. */ }
  }, [isEligible, minimumElapsed, progress]);

  const completeExit = useCallback(() => setShouldRender(false), []);
  return { isVisible, shouldRender, progress, prefersReducedMotion, suppressHeroEntrance: isEligible, completeExit };
};
