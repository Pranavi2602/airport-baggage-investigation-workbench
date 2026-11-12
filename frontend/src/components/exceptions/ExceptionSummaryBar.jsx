import {
  AlertOctagon,
  FolderOpen,
  Clock,
  CheckCircle2,
  Flame,
  AlertTriangle,
} from 'lucide-react';
import MetricCard from '../dashboard/MetricCard';
import {
  exceptionStatusConfig,
  exceptionSeverityConfig,
} from '../../utils/statusConfig';

export default function ExceptionSummaryBar({ summary, loading }) {
  const cards = [
    {
      label: 'Total Exceptions',
      value: summary?.totalExceptions,
      icon: AlertOctagon,
      color: '#1e3a5f',
      bgColor: '#e0e7ff',
    },
    {
      label: 'Open',
      value: summary?.openExceptions,
      icon: FolderOpen,
      color: exceptionStatusConfig.OPEN.color,
      bgColor: exceptionStatusConfig.OPEN.bgColor,
    },
    {
      label: 'In Progress',
      value: summary?.inProgressExceptions,
      icon: Clock,
      color: exceptionStatusConfig.IN_PROGRESS.color,
      bgColor: exceptionStatusConfig.IN_PROGRESS.bgColor,
    },
    {
      label: 'Resolved',
      value: summary?.resolvedExceptions,
      icon: CheckCircle2,
      color: exceptionStatusConfig.RESOLVED.color,
      bgColor: exceptionStatusConfig.RESOLVED.bgColor,
    },
    {
      label: 'High Priority',
      value: summary?.highPriorityExceptions,
      icon: Flame,
      color: exceptionSeverityConfig.HIGH.color,
      bgColor: exceptionSeverityConfig.HIGH.bgColor,
    },
    {
      label: 'Medium Priority',
      value: summary?.mediumPriorityExceptions,
      icon: AlertTriangle,
      color: exceptionSeverityConfig.MEDIUM.color,
      bgColor: exceptionSeverityConfig.MEDIUM.bgColor,
    },
  ];

  return (
    <div className="exceptions-metrics-grid">
      {cards.map((card) => (
        <MetricCard key={card.label} {...card} loading={loading} />
      ))}
    </div>
  );
}
