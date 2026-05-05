import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllSessions, getSessionMetadata } from '@/lib/sessions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Sessions() {
  const { t } = useLanguage();
  const allSessions = getAllSessions();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Get unique years
  const years = Array.from(
    new Set(allSessions.map((s) => new Date(s.date).getFullYear()))
  ).sort((a, b) => b - a);

  // Filter sessions by year
  const filteredSessions = selectedYear
    ? allSessions.filter((s) => new Date(s.date).getFullYear() === selectedYear)
    : allSessions;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="py-12 bg-navy">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl font-bold text-white">{t('sessions.title')}</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Year Filter */}
            <div className="flex gap-2 mb-8 flex-wrap">
              <button
                onClick={() => setSelectedYear(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${
                  selectedYear === null
                    ? 'bg-navy text-white'
                    : 'bg-gray-soft text-navy hover:bg-muted'
                }`}
              >
                {t('sessions.filterAll')}
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 ${
                    selectedYear === year
                      ? 'bg-navy text-white'
                      : 'bg-gray-soft text-navy hover:bg-muted'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Sessions Grid */}
            {filteredSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSessions.map((session) => {
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
            ) : (
              <p className="text-center text-text-muted py-12">{t('sessions.noSessions')}</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
