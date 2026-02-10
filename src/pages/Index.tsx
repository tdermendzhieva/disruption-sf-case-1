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
      <div className="min-h-screen flex flex-col bg-[#1e1e1e]">
        {/* Figma-style top toolbar */}
        <div className="bg-[#2c2c2c] border-b border-[#3e3e3e] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
            </svg>
            <span className="text-[#b3b3b3] text-sm font-medium">Airline Disruption Management — Single Source of Truth</span>
            <span className="text-[#5e5e5e] text-xs ml-2">/ Prototype</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#5e5e5e] text-xs">100%</span>
          </div>
        </div>

        {/* Simulation controls bar */}
        <SimulationControls />

        {/* Mobile tabs (visible on small screens) */}
        <div className="md:hidden flex border-b border-[#3e3e3e] bg-[#2c2c2c]">
          <button
            onClick={() => setActiveTab('passenger')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'passenger' ? 'text-white border-b-2 border-[#1ABCFE]' : 'text-[#7a7a7a]'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Passenger View
          </button>
          <button
            onClick={() => setActiveTab('agent')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
              activeTab === 'agent' ? 'text-white border-b-2 border-[#1ABCFE]' : 'text-[#7a7a7a]'
            }`}
          >
            <Monitor className="w-4 h-4" /> Agent View
          </button>
        </div>

        {/* Figma-style canvas */}
        <div
          className="flex-1 overflow-auto relative"
          style={{
            backgroundImage: `radial-gradient(circle, #3a3a3a 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        >
          <div className="flex items-start justify-center gap-16 p-10 min-h-full md:flex-row flex-col md:items-start items-center">
            {/* Passenger artboard */}
            <div className={`flex flex-col md:block ${activeTab === 'passenger' ? 'block' : 'hidden'}`}>
              {/* Artboard label */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[#b3b3b3] text-xs font-medium tracking-wide">Passenger Mobile App</span>
                <span className="text-[#5e5e5e] text-xs">— 390 × 844</span>
              </div>
              {/* Artboard frame */}
              <div className="bg-background rounded-lg shadow-2xl border border-[#3e3e3e] w-[400px] h-[780px] overflow-hidden relative">
                <PassengerView />
              </div>
            </div>

            {/* Connection line (desktop only) */}
            <div className="hidden md:flex flex-col items-center justify-center self-center mt-16">
              <div className="w-px h-8 bg-[#5e5e5e]" />
              <div className="border border-[#5e5e5e] rounded-full px-3 py-1.5 bg-[#2c2c2c]">
                <span className="text-[#1ABCFE] text-[10px] font-semibold tracking-wider uppercase">Real-time Sync</span>
              </div>
              <div className="w-px h-8 bg-[#5e5e5e]" />
            </div>

            {/* Agent artboard */}
            <div className={`flex flex-col md:block ${activeTab === 'agent' ? 'block' : 'hidden'}`}>
              {/* Artboard label */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[#b3b3b3] text-xs font-medium tracking-wide">Agent Console</span>
                <span className="text-[#5e5e5e] text-xs">— 1280 × 900</span>
              </div>
              {/* Artboard frame */}
              <div className="bg-background rounded-lg shadow-2xl border border-[#3e3e3e] w-[700px] max-w-[90vw] h-[780px] overflow-hidden relative">
                <AgentConsole />
              </div>
            </div>
          </div>
        </div>

        {/* Figma-style bottom bar */}
        <div className="bg-[#2c2c2c] border-t border-[#3e3e3e] px-4 py-1.5 flex items-center justify-between">
          <span className="text-[#5e5e5e] text-[11px]">
            ✨ Single Source of Truth — consistent, real-time information across all channels
          </span>
          <div className="flex items-center gap-4 text-[11px] text-[#7a7a7a]">
            <span>📊 Old System: 65 min sync | 28% call</span>
            <span>✨ New System: 2 min sync | 4% call</span>
          </div>
        </div>
      </div>
    </DisruptionProvider>
  );
};

export default Index;
