import { useEffect, useRef, useState } from 'react';
import { Session } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import TopicCard from './TopicCard';

interface SwipeDeckProps {
  session: Session;
}

export default function SwipeDeck({ session }: SwipeDeckProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 320 + 16; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(index, session.topics.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [session.topics.length]);

  const date = new Date(session.date).toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-navy py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <p className="text-gold text-sm font-mono mb-2">{t('hero.label')} — {date}</p>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-3xl font-bold text-white">Θέματα Συνεδρίας</h2>
            <p className="text-white font-mono text-sm">
              {currentIndex + 1} {t('hero.topicCounter')} {session.topics.length}
            </p>
          </div>
          <p className="text-gold-light text-sm md:hidden">{t('hero.swipeHint')}</p>
        </div>

        {/* Swipe Deck */}
        <div
          ref={containerRef}
          className="swipe-deck flex gap-4 mb-6 -mx-4 px-4 pb-2"
        >
          {session.topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} sessionDate={session.date} />
          ))}
        </div>

        {/* YouTube Button */}
        <div className="flex gap-4 justify-center md:justify-start">
          <a
            href={session.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            {t('hero.youtubeButton')}
          </a>
          <a href={`/sessions/${session.date}`} className="btn-primary">
            {t('hero.fullSummaryButton')}
          </a>
        </div>
      </div>
    </div>
  );
}
