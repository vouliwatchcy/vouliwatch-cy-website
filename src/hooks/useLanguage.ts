import { useEffect, useState } from 'react';
import elMessages from '@/i18n/el.json';
import enMessages from '@/i18n/en.json';

type Language = 'el' | 'en';

const messages: Record<Language, typeof elMessages> = {
  el: elMessages,
  en: enMessages,
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('el');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load language from localStorage on mount
    const stored = localStorage.getItem('vouliwatch-language') as Language | null;
    if (stored && (stored === 'el' || stored === 'en')) {
      setLanguage(stored);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang: Language = language === 'el' ? 'en' : 'el';
    setLanguage(newLang);
    localStorage.setItem('vouliwatch-language', newLang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return {
    language,
    toggleLanguage,
    t,
    mounted,
  };
}
