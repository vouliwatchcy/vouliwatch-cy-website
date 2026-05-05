import { SessionStatus } from '@/lib/types';
import { getStatusColor } from '@/lib/sessions';

interface StatusBadgeProps {
  status: SessionStatus;
  label?: string;
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const color = getStatusColor(status);
  const displayLabel = label || status;

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {displayLabel}
    </span>
  );
}
