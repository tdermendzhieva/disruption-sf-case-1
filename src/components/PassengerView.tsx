import { useDisruption } from '@/context/DisruptionContext';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from './Timeline';
import { Plane, Phone, List, ArrowRightLeft, Award, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const statusLabel: Record<string, string> = { 'on-time': 'On Time', delayed: 'Delayed', cancelled: 'Cancelled' };
const statusClass: Record<string, string> = { 'on-time': 'status-on-time', delayed: 'status-delayed', cancelled: 'status-cancelled' };

const PassengerView = () => {
  const { flight } = useDisruption();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex flex-col items-center py-6 px-4 h-full">
      <h2 className="font-display text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
        Passenger Mobile App
      </h2>

      {/* Phone frame */}
      <div className="phone-frame flex flex-col h-[680px]">
        <div className="phone-notch" />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="gradient-header px-5 pt-10 pb-5">
            <div className="flex items-center gap-2 mb-1">
              <Plane className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-display font-bold text-lg">Saudia</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-xs">{today}</p>
                <p className="text-primary-foreground font-bold text-lg">{flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-primary-foreground font-display text-2xl font-bold">
                  {flight.route.fromCode} → {flight.route.toCode}
                </p>
                <p className="text-primary-foreground/70 text-xs">{flight.route.from} to {flight.route.to}</p>
              </div>
            </div>
          </div>

          {/* Status card */}
          <div className="px-4 -mt-4">
            <motion.div
              className="bg-card rounded-xl shadow-lg p-4 border border-border"
              layout
            >
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  key={flight.status}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusClass[flight.status]}`}
                >
                  {statusLabel[flight.status]}
                </motion.div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" /> {flight.gate} · {flight.terminal}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Scheduled</p>
                  <p className="font-semibold text-sm line-through opacity-60">{flight.scheduledTime}</p>
                </div>
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Current</p>
                  <motion.p
                    key={flight.currentTime}
                    initial={{ scale: 1.2, color: 'hsl(var(--warning))' }}
                    animate={{ scale: 1, color: 'hsl(var(--foreground))' }}
                    className="font-bold text-lg"
                  >
                    {flight.currentTime}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="px-4 mt-5">
            <h3 className="font-display font-bold text-sm mb-3">Flight Timeline</h3>
            <Timeline events={flight.timeline} compact />
          </div>

          {/* Rebooking */}
          <AnimatePresence>
            {flight.showRebooking && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 mt-3"
              >
                <h3 className="font-display font-bold text-sm mb-2">Alternative Flight</h3>
                <div className="bg-card rounded-xl border border-border p-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm">SV 125 — RUH → JED</p>
                      <p className="text-xs text-muted-foreground">Departs 11:00 AM · 12 seats left</p>
                    </div>
                    <Button size="sm" className="text-xs gap-1">
                      <ArrowRightLeft className="w-3 h-3" /> Rebook
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compensation */}
          <AnimatePresence>
            {flight.showCompensation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 mt-3 pb-4"
              >
                <div className="bg-airline-gold/10 border border-airline-gold/30 rounded-xl p-3 flex items-center gap-3">
                  <Award className="w-5 h-5 text-airline-gold" />
                  <div className="flex-1">
                    <p className="text-xs font-bold">Eligible for compensation</p>
                    <p className="text-xs text-muted-foreground">€400 (EU261) · <span className="underline cursor-pointer">File claim</span></p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border bg-card px-3 py-2 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs gap-1">
            <Phone className="w-3 h-3" /> Call Center
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs gap-1">
            <List className="w-3 h-3" /> Timeline
          </Button>
          <Button size="sm" className="flex-1 text-xs gap-1">
            <ArrowRightLeft className="w-3 h-3" /> Rebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PassengerView;
