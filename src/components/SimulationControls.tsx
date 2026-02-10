import { useDisruption } from '@/context/DisruptionContext';
import { Play, AlertTriangle, FileEdit, CheckCircle2, Phone, RotateCcw, Pause, CheckCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const SimulationControls = () => {
  const {
    announceDelay,
    reviseEstimate,
    resolveIssue,
    simulateCall,
    resetDemo,
    startSimulation,
    stopSimulation,
    isAutoPlaying,
    flight,
    simulationSpeed,
    setSimulationSpeed,
  } = useDisruption();

  return (
    <div className="bg-[#2c2c2c] border-b border-[#3e3e3e] px-4 py-2">
      <div className="max-w-[1600px] mx-auto">
        {/* Controls row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Sync indicator */}
          {flight.isSyncing ? (
            <span className="flex items-center gap-1.5 text-[11px] font-medium bg-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full mr-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Syncing…
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] font-medium bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full mr-2">
              <CheckCheck className="w-3 h-3" /> Synced
            </span>
          )}

          <div className="w-px h-5 bg-[#3e3e3e]" />
          <Button
            size="sm"
            variant="secondary"
            onClick={isAutoPlaying ? stopSimulation : startSimulation}
            className="gap-1.5 text-xs font-semibold"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isAutoPlaying ? 'Pause' : 'Start Simulation'}
          </Button>

          <div className="w-px h-6 bg-primary-foreground/20" />

          <Button size="sm" variant="secondary" onClick={announceDelay} className="gap-1.5 text-xs" disabled={isAutoPlaying}>
            <AlertTriangle className="w-3.5 h-3.5" /> Announce Delay
          </Button>
          <Button size="sm" variant="secondary" onClick={reviseEstimate} className="gap-1.5 text-xs" disabled={isAutoPlaying}>
            <FileEdit className="w-3.5 h-3.5" /> Revise Estimate
          </Button>
          <Button size="sm" variant="secondary" onClick={resolveIssue} className="gap-1.5 text-xs" disabled={isAutoPlaying}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Issue Resolved
          </Button>
          <Button size="sm" variant="secondary" onClick={simulateCall} className="gap-1.5 text-xs" disabled={isAutoPlaying}>
            <Phone className="w-3.5 h-3.5" /> Passenger Calls
          </Button>

          <div className="w-px h-6 bg-primary-foreground/20" />

          <Button size="sm" variant="secondary" onClick={resetDemo} className="gap-1.5 text-xs">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[11px] text-[#b3b3b3]">Speed: {simulationSpeed}x</span>
            <Slider
              value={[simulationSpeed]}
              onValueChange={([v]) => setSimulationSpeed(v)}
              min={1}
              max={5}
              step={1}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
