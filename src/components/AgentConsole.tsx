import { useState } from 'react';
import { useDisruption } from '@/context/DisruptionContext';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from './Timeline';
import {
  Plane, Users, Search, Bell, RefreshCw, ArrowRightLeft, DollarSign,
  Phone, PhoneIncoming, CheckCheck, Send, MessageSquare, User, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const AgentConsole = () => {
  const { flight, acceptCall, addAgentNote } = useDisruption();
  const [noteText, setNoteText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNote = () => {
    if (noteText.trim()) {
      addAgentNote(noteText.trim());
      setNoteText('');
    }
  };

  const statusLabel: Record<string, string> = { 'on-time': 'On Time', delayed: 'Delayed', cancelled: 'Cancelled' };
  const statusClass: Record<string, string> = { 'on-time': 'status-on-time', delayed: 'status-delayed', cancelled: 'status-cancelled' };

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-display text-sm font-bold text-muted-foreground uppercase tracking-widest px-6 pt-6 pb-3">
        Agent Console
      </h2>

      <ScrollArea className="flex-1 px-6 pb-6">
        <div className="space-y-4">
          {/* Agent header */}
          <div className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">SM</div>
              <div>
                <p className="font-semibold text-sm">Agent Sarah M.</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">23 active cases</Badge>
          </div>

          {/* Incoming call banner */}
          <AnimatePresence>
            {flight.incomingCall && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-success/10 border border-success/30 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <PhoneIncoming className="w-5 h-5 text-success animate-bounce" />
                  <div>
                    <p className="font-semibold text-sm">Incoming Call</p>
                    <p className="text-xs text-muted-foreground">Ahmed Al-Rashid (ABC123)</p>
                  </div>
                </div>
                <Button size="sm" className="gap-1.5 bg-success hover:bg-success/90 text-success-foreground" onClick={acceptCall}>
                  <Phone className="w-3.5 h-3.5" /> Accept
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat overlay */}
          <AnimatePresence>
            {flight.showChat && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card border border-border rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-sm">Live Call — Ahmed Al-Rashid</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center"><User className="w-3 h-3" /></div>
                    <div className="bg-muted rounded-lg px-3 py-2 text-xs max-w-[80%]">
                      I see my flight is delayed, what are my options?
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs max-w-[80%]">
                      I can see your timeline — same information you have. You can wait for the 15:00 departure or I can rebook you on SV 125 at 11:00.
                    </div>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">SM</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flight overview */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-primary" />
                <span className="font-display font-bold text-sm">{flight.flightNumber}</span>
                <span className="text-sm text-muted-foreground">{flight.route.fromCode} → {flight.route.toCode}</span>
              </div>
              <motion.div
                key={flight.status}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusClass[flight.status]}`}
              >
                {statusLabel[flight.status]}
              </motion.div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Departure</p>
                <motion.p key={flight.currentTime} initial={{ color: 'hsl(var(--warning))' }} animate={{ color: 'hsl(var(--foreground))' }} className="font-bold text-sm">{flight.currentTime}</motion.p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gate</p>
                <p className="font-bold text-sm">{flight.gate}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs text-muted-foreground">Affected</p>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  <p className="font-bold text-sm">{flight.passengersAffected}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger search */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Enter PNR or passenger name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-sm"
              />
              <Button size="sm" variant="secondary"><Search className="w-4 h-4" /></Button>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Ahmed Al-Rashid</p>
                <p className="text-xs text-muted-foreground">Booking: ABC123 · Seat 14A · Economy</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-sm">Unified Timeline</h3>
              <span className="flex items-center gap-1 text-xs text-success">
                <CheckCheck className="w-3 h-3" /> In sync with passenger app
              </span>
            </div>
            <Timeline events={flight.timeline} />
          </div>

          {/* Quick actions */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-display font-bold text-sm mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs gap-1.5 justify-start"><Bell className="w-3.5 h-3.5" /> Send Notification</Button>
              <Button variant="outline" size="sm" className="text-xs gap-1.5 justify-start"><RefreshCw className="w-3.5 h-3.5" /> Update Status</Button>
              <Button variant="outline" size="sm" className="text-xs gap-1.5 justify-start"><ArrowRightLeft className="w-3.5 h-3.5" /> Rebook Options</Button>
              <Button variant="outline" size="sm" className="text-xs gap-1.5 justify-start"><DollarSign className="w-3.5 h-3.5" /> Offer Compensation</Button>
            </div>
          </div>

          {/* Notification feed */}
          <AnimatePresence>
            {flight.notifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-xl p-4"
              >
                <h3 className="font-display font-bold text-sm mb-3">Notification Feed</h3>
                <div className="space-y-2">
                  {flight.notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs bg-muted/50 rounded-lg px-3 py-2 flex items-start gap-2"
                    >
                      <span className="text-muted-foreground shrink-0">{n.timestamp}</span>
                      <span>{n.message}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Case notes */}
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-display font-bold text-sm mb-3">Case Notes</h3>
            {flight.agentNotes.length > 0 && (
              <div className="space-y-1.5 mb-3">
                {flight.agentNotes.map((note, i) => (
                  <div key={i} className="text-xs bg-muted/50 rounded-lg px-3 py-2">{note}</div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Textarea
                placeholder="Add a note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="text-sm min-h-[60px]"
              />
              <Button size="sm" onClick={handleAddNote} className="self-end gap-1">
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AgentConsole;
