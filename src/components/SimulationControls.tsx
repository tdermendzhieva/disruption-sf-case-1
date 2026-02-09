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
    <div className="gradient-header px-4 py-3">
      <div className="max-w-[1600px] mx-auto">
        {/* Top row - title and sync */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h1 className="text-primary-foreground font-display text-lg font-bold tracking-tight">
              ✈️ Airline Disruption Management — Single Source of Truth
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {flight.isSyncing ? (
              <span className="flex items-center gap-1.5 text-xs font-medium bg-warning/20 text-warning px-3 py-1.5 rounded-full">
                <Loader2 className="w-3 h-3 animate-spin" /> Syncing channels...
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-medium bg-success/20 text-success px-3 py-1.5 rounded-full">
                <CheckCheck className="w-3 h-3" /> All channels synchronized
              </span>
            )}
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-2 flex-wrap">
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
            <span className="text-xs text-primary-foreground/80">Speed: {simulationSpeed}x</span>
            <Slider
              value={[simulationSpeed]}
              onValueChange={([v]) => setSimulationSpeed(v)}
              min={1}
              max={5}
              step={1}
              className="w-24"
            />
          </div>
        </div>

        {/* Comparison metrics */}
        <div className="flex items-center gap-6 mt-2 text-xs text-primary-foreground/70">
          <span>📊 <strong className="text-primary-foreground">Old System:</strong> 65 min to sync | 28% call airline</span>
          <span>✨ <strong className="text-primary-foreground">New System:</strong> 2 min to sync | 4% call airline</span>
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
