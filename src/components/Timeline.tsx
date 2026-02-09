import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Bell, RefreshCw, Clock, Ticket, FileText } from 'lucide-react';
import type { DisruptionEvent } from '@/context/DisruptionContext';

const iconMap: Record<string, React.ReactNode> = {
  check: <CheckCircle2 className="w-4 h-4" />,
  alert: <AlertTriangle className="w-4 h-4" />,
  bell: <Bell className="w-4 h-4" />,
  refresh: <RefreshCw className="w-4 h-4" />,
  clock: <Clock className="w-4 h-4" />,
  ticket: <Ticket className="w-4 h-4" />,
  note: <FileText className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  info: 'bg-primary text-primary-foreground',
  update: 'bg-accent text-accent-foreground',
};

interface TimelineProps {
  events: DisruptionEvent[];
  compact?: boolean;
}

const Timeline = ({ events, compact = false }: TimelineProps) => {
  return (
    <div className="relative pl-6">
      <div className="timeline-line" />
      <AnimatePresence>
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className={`relative flex gap-3 ${compact ? 'pb-3' : 'pb-5'}`}
          >
            <div className={`timeline-dot ${typeColors[event.type]}`}>
              {iconMap[event.icon] || <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-muted-foreground">{event.timestamp}</span>
                <span className={`font-semibold ${compact ? 'text-xs' : 'text-sm'}`}>{event.title}</span>
              </div>
              <p className={`text-muted-foreground mt-0.5 ${compact ? 'text-xs' : 'text-sm'}`}>
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
