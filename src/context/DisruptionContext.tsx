import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export interface DisruptionEvent {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'update';
  title: string;
  description: string;
  icon: string;
}

export interface Notification {
  id: string;
  timestamp: string;
  message: string;
  icon: string;
}

export type FlightStatusType = 'on-time' | 'delayed' | 'cancelled';

export interface FlightStatus {
  flightNumber: string;
  route: { from: string; fromCode: string; to: string; toCode: string };
  scheduledTime: string;
  currentTime: string;
  status: FlightStatusType;
  gate: string;
  terminal: string;
  passengersAffected: number;
  timeline: DisruptionEvent[];
  notifications: Notification[];
  showRebooking: boolean;
  showCompensation: boolean;
  incomingCall: boolean;
  callAccepted: boolean;
  showChat: boolean;
  isSyncing: boolean;
  agentNotes: string[];
}

const INITIAL_TIMELINE: DisruptionEvent[] = [
  {
    id: '1',
    timestamp: '08:00',
    type: 'success',
    title: 'Check-in completed',
    description: 'You\'re checked in for flight SV 123',
    icon: 'check',
  },
];

const initialState: FlightStatus = {
  flightNumber: 'SV 123',
  route: { from: 'Riyadh', fromCode: 'RUH', to: 'Jeddah', toCode: 'JED' },
  scheduledTime: '10:00 AM',
  currentTime: '10:00 AM',
  status: 'on-time',
  gate: 'Gate 12',
  terminal: 'Terminal 1',
  passengersAffected: 180,
  timeline: INITIAL_TIMELINE,
  notifications: [],
  showRebooking: false,
  showCompensation: false,
  incomingCall: false,
  callAccepted: false,
  showChat: false,
  isSyncing: false,
  agentNotes: [],
};

interface DisruptionContextType {
  flight: FlightStatus;
  announceDelay: () => void;
  reviseEstimate: () => void;
  resolveIssue: () => void;
  simulateCall: () => void;
  acceptCall: () => void;
  resetDemo: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  isAutoPlaying: boolean;
  addAgentNote: (note: string) => void;
  simulationSpeed: number;
  setSimulationSpeed: (s: number) => void;
}

const DisruptionContext = createContext<DisruptionContextType | null>(null);

export const useDisruption = () => {
  const ctx = useContext(DisruptionContext);
  if (!ctx) throw new Error('useDisruption must be used within DisruptionProvider');
  return ctx;
};

export const DisruptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flight, setFlight] = useState<FlightStatus>(initialState);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const autoPlayRef = useRef<NodeJS.Timeout[]>([]);

  const syncDelay = (cb: () => void) => {
    setFlight(f => ({ ...f, isSyncing: true }));
    setTimeout(() => {
      cb();
      setTimeout(() => setFlight(f => ({ ...f, isSyncing: false })), 800);
    }, 600);
  };

  const announceDelay = useCallback(() => {
    syncDelay(() => {
      setFlight(f => ({
        ...f,
        status: 'delayed',
        currentTime: '2:30 PM',
        showRebooking: true,
        showCompensation: true,
        timeline: [
          ...f.timeline,
          {
            id: 'delay-1',
            timestamp: '08:15',
            type: 'warning',
            title: 'Technical issue detected',
            description: 'Aircraft maintenance required, delay expected',
            icon: 'alert',
          },
          {
            id: 'delay-2',
            timestamp: '08:17',
            type: 'update',
            title: 'Delay notification sent',
            description: 'New departure time: 14:30',
            icon: 'bell',
          },
          {
            id: 'delay-3',
            timestamp: '08:20',
            type: 'info',
            title: 'Rebooking options generated',
            description: 'Alternative flights available',
            icon: 'refresh',
          },
        ],
        notifications: [
          ...f.notifications,
          { id: 'n1', timestamp: '08:17', message: '📱 SMS sent to 180 passengers - "Delay to 14:30"', icon: 'sms' },
          { id: 'n2', timestamp: '08:17', message: '✉️ Email sent to 180 passengers', icon: 'email' },
          { id: 'n3', timestamp: '08:18', message: '🔔 Push notification delivered: 168/180', icon: 'push' },
        ],
      }));
    });
  }, []);

  const reviseEstimate = useCallback(() => {
    syncDelay(() => {
      setFlight(f => ({
        ...f,
        currentTime: '3:00 PM',
        timeline: [
          ...f.timeline,
          {
            id: 'revise-1',
            timestamp: '08:45',
            type: 'update',
            title: 'Revised departure time',
            description: 'Engineering update: departure now at 15:00',
            icon: 'clock',
          },
        ],
        notifications: [
          ...f.notifications,
          { id: 'n4', timestamp: '08:45', message: '📱 Update sent to all 180 passengers - "Revised to 15:00"', icon: 'sms' },
        ],
      }));
    });
  }, []);

  const resolveIssue = useCallback(() => {
    syncDelay(() => {
      setFlight(f => ({
        ...f,
        status: 'on-time',
        timeline: [
          ...f.timeline,
          {
            id: 'resolve-1',
            timestamp: '10:00',
            type: 'success',
            title: 'Issue resolved',
            description: 'Aircraft cleared for departure',
            icon: 'check',
          },
          {
            id: 'resolve-2',
            timestamp: '10:15',
            type: 'success',
            title: 'Boarding soon',
            description: 'Boarding starts at 14:45, Gate 12',
            icon: 'ticket',
          },
        ],
        notifications: [
          ...f.notifications,
          { id: 'n5', timestamp: '10:00', message: '✅ Issue resolved notification sent to all passengers', icon: 'push' },
          { id: 'n6', timestamp: '10:15', message: '🎫 Boarding announcement sent - Gate 12', icon: 'push' },
        ],
      }));
    });
  }, []);

  const simulateCall = useCallback(() => {
    setFlight(f => ({ ...f, incomingCall: true }));
  }, []);

  const acceptCall = useCallback(() => {
    setFlight(f => ({
      ...f,
      incomingCall: false,
      callAccepted: true,
      showChat: true,
    }));
    setTimeout(() => {
      setFlight(f => ({
        ...f,
        agentNotes: [...f.agentNotes, 'Passenger called, chose to wait for original flight'],
        timeline: [
          ...f.timeline,
          {
            id: 'call-note',
            timestamp: 'Now',
            type: 'info',
            title: 'Agent note added',
            description: 'Passenger called, chose to wait for original flight',
            icon: 'note',
          },
        ],
      }));
    }, 3000);
  }, []);

  const addAgentNote = useCallback((note: string) => {
    setFlight(f => ({
      ...f,
      agentNotes: [...f.agentNotes, note],
      timeline: [
        ...f.timeline,
        {
          id: `note-${Date.now()}`,
          timestamp: 'Now',
          type: 'info',
          title: 'Agent note added',
          description: note,
          icon: 'note',
        },
      ],
    }));
  }, []);

  const resetDemo = useCallback(() => {
    autoPlayRef.current.forEach(clearTimeout);
    autoPlayRef.current = [];
    setIsAutoPlaying(false);
    setFlight(initialState);
  }, []);

  const startSimulation = useCallback(() => {
    resetDemo();
    setIsAutoPlaying(true);
    const speed = simulationSpeed;
    const base = 1000 / speed;

    const t1 = setTimeout(() => announceDelay(), 3 * base);
    const t2 = setTimeout(() => reviseEstimate(), 10 * base);
    const t3 = setTimeout(() => simulateCall(), 15 * base);
    const t4 = setTimeout(() => resolveIssue(), 22 * base);
    const t5 = setTimeout(() => setIsAutoPlaying(false), 28 * base);

    autoPlayRef.current = [t1, t2, t3, t4, t5];
  }, [announceDelay, reviseEstimate, simulateCall, resolveIssue, resetDemo, simulationSpeed]);

  const stopSimulation = useCallback(() => {
    autoPlayRef.current.forEach(clearTimeout);
    autoPlayRef.current = [];
    setIsAutoPlaying(false);
  }, []);

  return (
    <DisruptionContext.Provider
      value={{
        flight,
        announceDelay,
        reviseEstimate,
        resolveIssue,
        simulateCall,
        acceptCall,
        resetDemo,
        startSimulation,
        stopSimulation,
        isAutoPlaying,
        addAgentNote,
        simulationSpeed,
        setSimulationSpeed,
      }}
    >
      {children}
    </DisruptionContext.Provider>
  );
};
