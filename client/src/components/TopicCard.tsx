import { Topic } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import StatusBadge from './StatusBadge';

interface TopicCardProps {
  topic: Topic;
  sessionDate: string;
}

export default function TopicCard({ topic, sessionDate }: TopicCardProps) {
  const { t } = useLanguage();
  const date = new Date(sessionDate).toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="swipe-card flex-shrink-0 w-80 bg-cream rounded-lg shadow-sm p-6 border border-gray-soft hover:shadow-md hover:border-gold transition-all duration-150">
      {/* Date */}
      <p className="text-xs text-text-muted font-mono mb-3">{date}</p>

      {/* Status Badge */}
      <div className="mb-4">
        <StatusBadge status={topic.status} />
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg text-navy mb-3 line-clamp-3">{topic.title}</h3>

      {/* Simple Explanation */}
      <p className="text-sm text-text mb-4 line-clamp-4">{topic.simple}</p>

      {/* Divider */}
      <div className="border-t border-gray-soft my-4"></div>

      {/* Votes */}
      {topic.votes && (
        <div className="mb-3">
          <p className="text-xs text-text-muted font-mono mb-2">
            {t('sessionDetail.votes')}: ✓{topic.votes.for} ✗{topic.votes.against} –{topic.votes.abstain}
          </p>
        </div>
      )}

      {/* Certainty */}
      <div className="mb-4">
        <p className="text-xs text-text-muted font-mono">
          {t('sessionDetail.certainty')}: {topic.certainty === 'Υψηλό' ? '🟢' : topic.certainty === 'Μέτριο' ? '🟡' : '🔴'} {topic.certainty}
        </p>
      </div>

      {/* Read More Link */}
      <a
        href={`/sessions/${sessionDate}#topic-${topic.id}`}
        className="text-gold font-medium text-sm hover:text-gold-light transition-colors duration-150 inline-flex items-center gap-1"
      >
        {t('sessionDetail.readMore')}
      </a>
    </div>
  );
}
