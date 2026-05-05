import { useLanguage } from '@/contexts/LanguageContext';
import { getLatestSession, getAllSessions, getSessionMetadata } from '@/lib/sessions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SwipeDeck from '@/components/SwipeDeck';
import StatusBadge from '@/components/StatusBadge';

export default function Home() {
  const { t } = useLanguage();
  const latestSession = getLatestSession();
  const allSessions = getAllSessions();
  const previousSessions = allSessions.slice(1, 4);

  if (!latestSession) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <p>{t('sessions.noSessions')}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Swipe Deck */}
        <SwipeDeck session={latestSession} />

        {/* Previous Sessions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-header">{t('previousSessions.title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {previousSessions.map((session) => {
                const metadata = getSessionMetadata(session);
                const sessionDate = new Date(session.date).toLocaleDateString('el-GR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });

                return (
                  <div key={session.date} className="card-civic card-civic-hover">
                    <p className="text-sm text-text-muted font-mono mb-2">{sessionDate}</p>
                    <h3 className="font-display font-bold text-lg text-navy mb-3 line-clamp-2">
                      {session.title}
                    </h3>
                    <p className="text-sm text-text mb-4 line-clamp-3">{session.summary}</p>

                    {/* Status Summary */}
                    <div className="text-xs text-text-muted font-mono mb-4 space-y-1">
                      {metadata.approved > 0 && (
                        <p>
                          {metadata.approved} {t('previousSessions.approved')}
                        </p>
                      )}
                      {metadata.postponed > 0 && (
                        <p>
                          {metadata.postponed} {t('previousSessions.postponed')}
                        </p>
                      )}
                      {metadata.rejected > 0 && (
                        <p>
                          {metadata.rejected} {t('previousSessions.rejected')}
                        </p>
                      )}
                      {metadata.withdrawn > 0 && (
                        <p>
                          {metadata.withdrawn} {t('previousSessions.withdrawn')}
                        </p>
                      )}
                    </div>

                    <a href={`/sessions/${session.date}`} className="btn-primary text-sm">
                      {t('sessionDetail.readMore')}
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <a href="/sessions" className="text-gold font-medium hover:text-gold-light transition-colors">
                {t('previousSessions.viewAll')}
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-cream">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <h2 className="section-header">{t('about.title')}</h2>
                <p className="text-lg text-text mb-8 leading-relaxed">{t('about.description')}</p>

                {/* Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { title: t('about.pillar1Title'), desc: t('about.pillar1Desc'), icon: '🏛️' },
                    { title: t('about.pillar2Title'), desc: t('about.pillar2Desc'), icon: '⏱️' },
                    { title: t('about.pillar3Title'), desc: t('about.pillar3Desc'), icon: '🗣️' },
                    { title: t('about.pillar4Title'), desc: t('about.pillar4Desc'), icon: '✅' },
                  ].map((pillar, idx) => (
                    <div key={idx} className="card-civic">
                      <p className="text-2xl mb-2">{pillar.icon}</p>
                      <h4 className="font-display font-bold text-navy mb-2">{pillar.title}</h4>
                      <p className="text-sm text-text">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="hidden md:block">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663572785921/JnPoLy6XYrAqUhYrayKGHN/hero-bg-g8DBV5CRYVPmuHkqXHXj7F.webp"
                  alt="VouliWatch CY"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="section-header">{t('howItWorks.title')}</h2>

            <div className="max-w-3xl mx-auto">
              {[
                { step: 1, text: t('howItWorks.step1') },
                { step: 2, text: t('howItWorks.step2') },
                { step: 3, text: t('howItWorks.step3') },
                { step: 4, text: t('howItWorks.step4') },
                { step: 5, text: t('howItWorks.step5') },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 mb-8 pb-8 border-b border-gray-soft last:border-b-0">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-navy text-white font-display font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-text leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}

              <p className="text-sm text-text-muted italic mt-8 p-4 bg-cream rounded-lg border-l-4 border-gold">
                {t('howItWorks.note')}
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12 bg-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto gold-left-border bg-navy bg-opacity-50 p-6 rounded-lg">
              <h3 className="font-display font-bold text-white mb-3">{t('disclaimer.title')}</h3>
              <p className="text-gold-light leading-relaxed">{t('disclaimer.text')}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
