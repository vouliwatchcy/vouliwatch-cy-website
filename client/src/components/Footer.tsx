import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="VouliWatch CY" className="h-12 w-12" />
              <div>
                <h3 className="font-display font-bold text-lg">VouliWatch CY</h3>
                <p className="text-gold-light text-sm">{t('footer.tagline')}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display font-bold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com/vouliwatchcy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-light hover:text-gold transition-colors"
                >
                  {t('footer.instagram')} @vouliwatchcy
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/vouliwatchcy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-light hover:text-gold transition-colors"
                >
                  {t('footer.telegram')} @vouliwatchcy
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-bold mb-4">{t('footer.legal')}</h4>
            <p className="text-gold-light text-sm">
              {t('footer.builtWith')}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gold-light border-opacity-20 pt-8">
          <p className="text-center text-gold-light text-sm">
            © 2026 VouliWatch CY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
