import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Gauge, Weight, Zap } from 'lucide-react';

interface CalculationResult {
  horsepower: number;
  weight: number;
  trapSpeed: number;
}

interface ResultsPanelProps {
  result: CalculationResult;
  onReset: () => void;
}

export function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <Card className="border-accent/30 shadow-lg bg-gradient-to-br from-card to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Zap className="w-6 h-6 text-accent" />
          Estimated Horsepower
        </CardTitle>
        <CardDescription>
          Based on your vehicle specifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className="text-center py-6 px-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gauge className="w-8 h-8 text-accent" />
            <span className="text-6xl font-bold text-accent tabular-nums">
              {result.horsepower.toLocaleString()}
            </span>
          </div>
          <p className="text-xl font-semibold text-muted-foreground">
            Horsepower (HP)
          </p>
        </div>

        {/* Input Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Weight className="w-4 h-4" />
              <span className="text-sm font-medium">Weight</span>
            </div>
            <p className="text-2xl font-bold tabular-nums">
              {result.weight.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground ml-1">lb</span>
            </p>
          </div>
          
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="w-4 h-4" />
              <span className="text-sm font-medium">Trap Speed</span>
            </div>
            <p className="text-2xl font-bold tabular-nums">
              {result.trapSpeed.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground ml-1">mph</span>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <Alert className="bg-muted/50 border-muted-foreground/20">
          <AlertDescription className="text-sm leading-relaxed">
            <span className="font-semibold text-foreground">Disclaimer:</span>{' '}
            This is an estimated horsepower calculation based on quarter-mile trap speed. 
            Real-world results may vary due to factors such as altitude, temperature, 
            traction, driver skill, and vehicle setup. For accurate measurements, 
            use a dynamometer.
          </AlertDescription>
        </Alert>

        {/* Additional Info */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="secondary" className="text-xs">
            Quarter-Mile
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Estimated
          </Badge>
          <Badge variant="outline" className="text-xs border-accent/30 text-accent">
            Formula-Based
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
