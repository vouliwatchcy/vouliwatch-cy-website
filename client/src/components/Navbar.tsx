import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [location] = useLocation();

  const isEnglish = location.startsWith('/en');

  const navLinks = [
    { label: t('nav.home'), href: isEnglish ? '/en' : '/' },
    { label: t('nav.sessions'), href: isEnglish ? '/en/sessions' : '/sessions' },
    { label: t('nav.about'), href: isEnglish ? '/en/about' : '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-navy backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Site Name */}
        <a href={isEnglish ? '/en' : '/'} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src="/logo.png" alt="VouliWatch CY" className="h-10 w-10" />
          <span className="font-display text-xl font-bold text-white hidden sm:inline">VouliWatch CY</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-gold transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="ml-auto md:ml-0 px-4 py-2 rounded-lg bg-gold text-navy font-medium hover:bg-gold-light transition-colors duration-150"
        >
          {t('nav.language')}
        </button>
      </div>
    </nav>
  );
}
