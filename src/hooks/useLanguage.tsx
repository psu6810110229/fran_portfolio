import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'en' | 'th';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = (localStorage.getItem('lang') as Lang) || 'en';
      document.documentElement.setAttribute('data-lang', saved);
      return saved;
    } catch { return 'en'; }
  });

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next = l === 'en' ? 'th' : 'en';
      document.documentElement.setAttribute('data-lang', next);
      try { localStorage.setItem('lang', next); } catch {}
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
