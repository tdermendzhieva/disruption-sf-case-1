import { DisruptionProvider } from '@/context/DisruptionContext';
import SimulationControls from '@/components/SimulationControls';
import PassengerView from '@/components/PassengerView';
import AgentConsole from '@/components/AgentConsole';
import { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'passenger' | 'agent'>('passenger');

  return (
    <DisruptionProvider>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Simulation Controls */}
        <SimulationControls />

        {/* Banner */}
        <div className="bg-primary/5 border-b border-border px-4 py-2 text-center">
          <p className="text-xs text-muted-foreground">
            ✨ <strong>Single Source of Truth</strong> — consistent, real-time information across all channels. Both views update simultaneously.
          </p>
        </div>

        {/* Mobile tabs (visible on small screens) */}
        <div className="md:hidden flex border-b border-border">
          <button
            onClick={() => setActiveTab('passenger')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'passenger' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Passenger View
          </button>
          <button
            onClick={() => setActiveTab('agent')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'agent' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
            }`}
          >
            <Monitor className="w-4 h-4" /> Agent View
          </button>
        </div>

        {/* Split screen */}
        <div className="flex-1 flex overflow-hidden">
          {/* Passenger view */}
          <div className={`md:w-[420px] md:border-r border-border bg-muted/30 overflow-y-auto md:block ${activeTab === 'passenger' ? 'block w-full' : 'hidden'}`}>
            <PassengerView />
          </div>

          {/* Agent view */}
          <div className={`flex-1 overflow-hidden md:block ${activeTab === 'agent' ? 'block w-full' : 'hidden'}`}>
            <AgentConsole />
          </div>
        </div>
      </div>
    </DisruptionProvider>
  );
};

export default Index;
