import { useCallback, useEffect, useState } from 'react';

export type TrackedRoute = '/' | '/resume';

interface RouteVisit {
  path: TrackedRoute;
  enteredAt: number;
  maxScrollY: number;
  interactionCount: number;
}

interface RouteSwitchIntent {
  from: TrackedRoute;
  to: TrackedRoute;
  createdAt: number;
}

interface RouteSwitchNoticeState {
  isOpen: boolean;
  sourcePath: TrackedRoute | null;
  dismiss: () => void;
  returnToSource: () => void;
}

const VISIT_KEY = 'routeSwitchNotice:visit:v1';
const INTENT_KEY = 'routeSwitchNotice:intent:v1';
const SEEN_KEY = 'routeSwitchNotice:seen:v1';
const FAST_SWITCH_LIMIT_MS = 7000;
const INTENT_MAX_AGE_MS = 5000;
const NOTICE_DURATION_MS = 6500;
const MAX_UNENGAGED_SCROLL_Y = 96;

const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null
);

const isTrackedRoute = (value: unknown): value is TrackedRoute => (
  value === '/' || value === '/resume'
);

const normalizeRoute = (path: string): TrackedRoute => (
  path === '/resume' ? '/resume' : '/'
);

const readVisit = (): RouteVisit | null => {
  try {
    const raw = sessionStorage.getItem(VISIT_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || !isTrackedRoute(value.path)) return null;
    if (typeof value.enteredAt !== 'number' || typeof value.maxScrollY !== 'number' || typeof value.interactionCount !== 'number') return null;
    return {
      path: value.path,
      enteredAt: value.enteredAt,
      maxScrollY: value.maxScrollY,
      interactionCount: value.interactionCount,
    };
  } catch {
    return null;
  }
};

const writeVisit = (visit: RouteVisit): void => {
  try { sessionStorage.setItem(VISIT_KEY, JSON.stringify(visit)); } catch { /* Storage may be unavailable. */ }
};

const readIntent = (): RouteSwitchIntent | null => {
  try {
    const raw = sessionStorage.getItem(INTENT_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || !isTrackedRoute(value.from) || !isTrackedRoute(value.to)) return null;
    if (typeof value.createdAt !== 'number') return null;
    return { from: value.from, to: value.to, createdAt: value.createdAt };
  } catch {
    return null;
  }
};

const removeIntent = (): void => {
  try { sessionStorage.removeItem(INTENT_KEY); } catch { /* Storage may be unavailable. */ }
};

const readSeenIds = (): string[] => {
  try {
    const raw = sessionStorage.getItem(SEEN_KEY);
    if (!raw) return [];
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

const writeSeenId = (id: string): void => {
  try {
    const seenIds = readSeenIds().filter((seenId) => seenId !== id);
    sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seenIds, id].slice(-4)));
  } catch { /* Storage may be unavailable. */ }
};

export function recordRouteSwitchIntent(destination: string): void {
  const from = normalizeRoute(window.location.pathname);
  const to = normalizeRoute(destination);
  if (from === to) return;

  const now = Date.now();
  const visit = readVisit();
  const currentVisit = visit?.path === from
    ? visit
    : { path: from, enteredAt: now, maxScrollY: window.scrollY, interactionCount: 0 };
  const isLikelyAccidental = now - currentVisit.enteredAt <= FAST_SWITCH_LIMIT_MS
    && currentVisit.maxScrollY <= MAX_UNENGAGED_SCROLL_Y
    && currentVisit.interactionCount === 0;

  if (!isLikelyAccidental) {
    removeIntent();
    return;
  }

  try {
    sessionStorage.setItem(INTENT_KEY, JSON.stringify({ from, to, createdAt: now }));
  } catch { /* Storage may be unavailable. */ }
}

export function useRouteSwitchNotice(currentPath: string): RouteSwitchNoticeState {
  const currentRoute = normalizeRoute(currentPath);
  const [sourcePath, setSourcePath] = useState<TrackedRoute | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const now = Date.now();
    const pendingIntent = readIntent();
    removeIntent();
    writeVisit({ path: currentRoute, enteredAt: now, maxScrollY: window.scrollY, interactionCount: 0 });

    if (!pendingIntent || pendingIntent.to !== currentRoute || now - pendingIntent.createdAt > INTENT_MAX_AGE_MS) return;

    const seenId = `${pendingIntent.from}->${pendingIntent.to}`;
    if (readSeenIds().includes(seenId)) return;

    writeSeenId(seenId);
    const noticeTimer = window.setTimeout(() => {
      setSourcePath(pendingIntent.from);
      setIsOpen(true);
    }, 0);

    return () => window.clearTimeout(noticeTimer);
  }, [currentRoute]);

  useEffect(() => {
    const handleScroll = () => {
      const visit = readVisit();
      if (visit?.path === currentRoute) {
        writeVisit({ ...visit, maxScrollY: Math.max(visit.maxScrollY, window.scrollY) });
      }
      if (isOpen && window.scrollY > MAX_UNENGAGED_SCROLL_Y) setIsOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      const href = anchor?.getAttribute('href');
      if (href === '/' || href === '/resume') return;
      const control = target.closest('a[href], button, input, textarea, select, [role="button"]');
      if (!control) return;

      const visit = readVisit();
      if (visit?.path === currentRoute) {
        writeVisit({ ...visit, interactionCount: visit.interactionCount + 1 });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [currentRoute, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timeout = window.setTimeout(() => setIsOpen(false), NOTICE_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  const dismiss = useCallback(() => setIsOpen(false), []);
  const returnToSource = useCallback(() => {
    if (!sourcePath) return;
    setIsOpen(false);
    window.location.assign(sourcePath);
  }, [sourcePath]);

  return { isOpen, sourcePath, dismiss, returnToSource };
}
