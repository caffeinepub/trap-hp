import { useState } from 'react';
import { Calculator, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResultsPanel } from '@/components/ResultsPanel';
import { SiX, SiFacebook, SiInstagram } from 'react-icons/si';

interface CalculationResult {
  horsepower: number;
  weight: number;
  trapSpeed: number;
}

function App() {
  const [weight, setWeight] = useState('');
  const [trapSpeed, setTrapSpeed] = useState('');
  const [weightError, setWeightError] = useState('');
  const [trapSpeedError, setTrapSpeedError] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const validateWeight = (value: string): boolean => {
    setWeightError('');
    if (!value.trim()) {
      setWeightError('Weight is required');
      return false;
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      setWeightError('Weight must be a valid number');
      return false;
    }
    if (num <= 0) {
      setWeightError('Weight must be greater than 0');
      return false;
    }
    if (num < 1 || num > 20000) {
      setWeightError('Weight must be between 1 and 20,000 lb');
      return false;
    }
    return true;
  };

  const validateTrapSpeed = (value: string): boolean => {
    setTrapSpeedError('');
    if (!value.trim()) {
      setTrapSpeedError('Trap speed is required');
      return false;
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      setTrapSpeedError('Trap speed must be a valid number');
      return false;
    }
    if (num <= 0) {
      setTrapSpeedError('Trap speed must be greater than 0');
      return false;
    }
    if (num < 1 || num > 400) {
      setTrapSpeedError('Trap speed must be between 1 and 400 mph');
      return false;
    }
    return true;
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);
    if (value.trim()) {
      validateWeight(value);
    } else {
      setWeightError('');
    }
  };

  const handleTrapSpeedChange = (value: string) => {
    setTrapSpeed(value);
    if (value.trim()) {
      validateTrapSpeed(value);
    } else {
      setTrapSpeedError('');
    }
  };

  const handleCalculate = async () => {
    const isWeightValid = validateWeight(weight);
    const isTrapSpeedValid = validateTrapSpeed(trapSpeed);

    if (!isWeightValid || !isTrapSpeedValid) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate async calculation
    await new Promise(resolve => setTimeout(resolve, 300));

    const w = parseFloat(weight);
    const ts = parseFloat(trapSpeed);
    
    // Formula: HP = weight * (trapSpeed / 234)^3
    const hp = w * Math.pow(ts / 234, 3);

    setResult({
      horsepower: Math.round(hp),
      weight: w,
      trapSpeed: ts
    });

    setIsCalculating(false);
  };

  const handleReset = () => {
    setWeight('');
    setTrapSpeed('');
    setWeightError('');
    setTrapSpeedError('');
    setResult(null);
  };

  const isFormValid = weight.trim() !== '' && 
                      trapSpeed.trim() !== '' && 
                      !weightError && 
                      !trapSpeedError;

  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'trap-hp'
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url(/assets/generated/dragstrip-bg.dim_1920x1080.png)' }}
      />
      
      {/* Header */}
      <header className="relative border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/trap-hp-logo.dim_512x512.png" 
              alt="Trap HP Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Trap HP
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Quarter-Mile Horsepower Calculator
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Twitter"
            >
              <SiX className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <SiFacebook className="w-5 h-5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <SiInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex-1 container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Calculator Card */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calculator className="w-6 h-6 text-accent" />
                Calculate Horsepower
              </CardTitle>
              <CardDescription>
                Estimate your vehicle's horsepower based on weight and quarter-mile trap speed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Formula Display */}
              <Alert className="bg-muted/50 border-accent/20">
                <AlertDescription className="text-sm font-mono">
                  <span className="font-semibold text-foreground">Formula:</span>{' '}
                  <span className="text-accent">HP = weight × (trap_speed / 234)³</span>
                </AlertDescription>
              </Alert>

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-base font-medium">
                    Vehicle Weight <span className="text-muted-foreground text-sm">(lb)</span>
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g., 3500"
                    value={weight}
                    onChange={(e) => handleWeightChange(e.target.value)}
                    onBlur={() => weight.trim() && validateWeight(weight)}
                    className={`text-lg ${weightError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    min="1"
                    max="20000"
                    step="1"
                  />
                  {weightError && (
                    <p className="text-sm text-destructive font-medium">{weightError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trapSpeed" className="text-base font-medium">
                    Trap Speed <span className="text-muted-foreground text-sm">(mph)</span>
                  </Label>
                  <Input
                    id="trapSpeed"
                    type="number"
                    placeholder="e.g., 115"
                    value={trapSpeed}
                    onChange={(e) => handleTrapSpeedChange(e.target.value)}
                    onBlur={() => trapSpeed.trim() && validateTrapSpeed(trapSpeed)}
                    className={`text-lg ${trapSpeedError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    min="1"
                    max="400"
                    step="0.1"
                  />
                  {trapSpeedError && (
                    <p className="text-sm text-destructive font-medium">{trapSpeedError}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCalculate}
                  disabled={!isFormValid || isCalculating}
                  className="flex-1 text-base h-11"
                  size="lg"
                >
                  {isCalculating ? (
                    <>
                      <span className="animate-spin mr-2">⚙</span>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate HP
                    </>
                  )}
                </Button>
                {result && (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                    className="h-11"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          {result && <ResultsPanel result={result} onReset={handleReset} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/50 bg-card/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Trap HP. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <span className="text-accent">❤</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
