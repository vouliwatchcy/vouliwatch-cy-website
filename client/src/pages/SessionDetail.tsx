import { useLanguage } from '@/contexts/LanguageContext';
import { getSessionByDate, getAllSessions, getSessionMetadata } from '@/lib/sessions';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatusBadge from '@/components/StatusBadge';

interface SessionDetailProps {
  params: { date: string };
}

export default function SessionDetail({ params }: SessionDetailProps) {
  const { t } = useLanguage();
  const session = getSessionByDate(params.date);
  const allSessions = getAllSessions();

  if (!session) {
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

  const metadata = getSessionMetadata(session);
  const sessionIndex = allSessions.findIndex((s) => s.date === session.date);
  const previousSession = sessionIndex < allSessions.length - 1 ? allSessions[sessionIndex + 1] : null;
  const nextSession = sessionIndex > 0 ? allSessions[sessionIndex - 1] : null;

  const sessionDate = new Date(session.date).toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-navy text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl font-bold mb-2">{session.title}</h1>
            <p className="text-gold-light font-mono mb-6">{sessionDate}</p>

            {/* Summary */}
            <p className="text-lg leading-relaxed mb-8 max-w-2xl">{session.summary}</p>

            {/* Stats */}
            <div className="flex gap-6 flex-wrap text-sm font-mono">
              {metadata.approved > 0 && (
                <div>
                  <span className="text-gold">{metadata.approved}</span> {t('previousSessions.approved')}
                </div>
              )}
              {metadata.postponed > 0 && (
                <div>
                  <span className="text-gold">{metadata.postponed}</span> {t('previousSessions.postponed')}
                </div>
              )}
              {metadata.rejected > 0 && (
                <div>
                  <span className="text-gold">{metadata.rejected}</span> {t('previousSessions.rejected')}
                </div>
              )}
              {metadata.withdrawn > 0 && (
                <div>
                  <span className="text-gold">{metadata.withdrawn}</span> {t('previousSessions.withdrawn')}
                </div>
              )}
            </div>

            {/* YouTube Link */}
            <a
              href={session.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-6"
            >
              {t('hero.youtubeButton')}
            </a>
          </div>
        </section>

        {/* Topics */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            {session.topics.map((topic, idx) => (
              <div
                key={topic.id}
                id={`topic-${topic.id}`}
                className="card-civic card-civic-hover mb-6 gold-left-border"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-navy text-lg">#{topic.id}</span>
                    <StatusBadge status={topic.status} />
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    {t('sessionDetail.certainty')}: {topic.certainty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl text-navy mb-4">{topic.title}</h3>

                {/* Simple Explanation */}
                <div className="mb-6">
                  <h4 className="font-display font-bold text-navy mb-2">Με απλά λόγια:</h4>
                  <p className="text-text leading-relaxed">{topic.simple}</p>
                </div>

                {/* Votes and Evidence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Votes */}
                  {topic.votes && (
                    <div className="bg-gray-soft p-4 rounded-lg">
                      <h5 className="font-display font-bold text-navy mb-3">{t('sessionDetail.votes')}</h5>
                      <div className="space-y-2 font-mono text-sm">
                        <p>
                          <span className="text-green-600 font-bold">✓</span> {t('sessionDetail.for')}: {topic.votes.for}
                        </p>
                        <p>
                          <span className="text-red-600 font-bold">✗</span> {t('sessionDetail.against')}: {topic.votes.against}
                        </p>
                        <p>
                          <span className="text-gray-600 font-bold">–</span> {t('sessionDetail.abstain')}: {topic.votes.abstain}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Evidence */}
                  <div className="bg-gray-soft p-4 rounded-lg">
                    <h5 className="font-display font-bold text-navy mb-3">{t('sessionDetail.evidence')}</h5>
                    <p className="font-mono text-sm text-text">{topic.evidence}</p>
                  </div>
                </div>

                {/* Why It Matters */}
                <div className="mb-6 p-4 bg-cream rounded-lg border-l-4 border-gold">
                  <h5 className="font-display font-bold text-navy mb-2">💡 {t('sessionDetail.whyMatters')}</h5>
                  <p className="text-text leading-relaxed">{topic.why_matters}</p>
                </div>

                {/* PDF */}
                {topic.pdf && (
                  <div className="text-sm text-text-muted font-mono">
                    📄 {t('sessionDetail.pdf')}: {topic.pdf}
                    {topic.pdf_pages && ` — ${t('sessionDetail.page')} ${topic.pdf_pages}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pending */}
        {session.pending && session.pending.length > 0 && (
          <section className="py-12 bg-cream">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="section-header">{t('sessionDetail.pending')}</h2>
              <ul className="space-y-3">
                {session.pending.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-gold font-bold flex-shrink-0">•</span>
                    <span className="text-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex justify-between gap-4">
              {previousSession ? (
                <a href={`/sessions/${previousSession.date}`} className="btn-primary">
                  ← {t('sessionDetail.previousSession')}
                </a>
              ) : (
                <div></div>
              )}
              {nextSession ? (
                <a href={`/sessions/${nextSession.date}`} className="btn-primary">
                  {t('sessionDetail.nextSession')} →
                </a>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
