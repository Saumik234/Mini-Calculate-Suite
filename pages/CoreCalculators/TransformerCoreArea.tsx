
import React, { useState } from 'react';
import CalculatorWrapper from '../../components/CalculatorWrapper';
import { historyService } from '../../services/historyService';
import { User } from '../../types';

interface TransformerCoreAreaProps {
  user: User | null;
}

const TransformerCoreArea: React.FC<TransformerCoreAreaProps> = ({ user }) => {
  const [voltage, setVoltage] = useState('');
  const [frequency, setFrequency] = useState('50');
  const [result, setResult] = useState<string | null>(null);
  
  // Constants for calculation
  const FLUX_DENSITY = 1.2; // Tesla (common value for silicon steel)
  const STACKING_FACTOR = 0.95; // dimensionless

  const handleCalculate = () => {
    const v = parseFloat(voltage) || 0;
    const f = parseFloat(frequency) || 0;

    if (v <= 0 || f <= 0) {
      setResult('0.00');
      return;
    }
    // Formula: Area (cm^2) = (V * 10^4) / (4.44 * f * B_max * S_f)
    // Simplified, as V is usually in volts, B in Tesla, f in Hz.
    const areaInMetersSq = v / (4.44 * f * FLUX_DENSITY * STACKING_FACTOR);
    const areaInCmSq = areaInMetersSq * 10000; // Convert m^2 to cm^2
    const newResult = areaInCmSq.toFixed(2);
    setResult(newResult);
    
    historyService.addHistoryItem(user, {
        type: 'Transformer Core Area',
        result: `Required Area: ${newResult} cm²`
    });
  };


  return (
    <CalculatorWrapper title="Transformer Core Area">
      <div className="space-y-6">
        <div>
          <label htmlFor="voltage" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Voltage (V)</label>
          <input
            type="number"
            id="voltage"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="e.g., 230"
          />
        </div>
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Frequency (Hz)</label>
          <input
            type="number"
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="e.g., 50 or 60"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors"
        >
          Calculate Core Area
        </button>
        <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg text-center min-h-[116px] flex flex-col justify-center">
          {result !== null ? (
            <>
              <p className="text-slate-500 dark:text-slate-400">Required Core Area</p>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">{result} cm²</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Assuming Flux Density of {FLUX_DENSITY} T and Stacking Factor of {STACKING_FACTOR}.</p>
            </>
          ) : (
            <p className="text-slate-400 dark:text-slate-500">Click "Calculate Core Area" to see the result.</p>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default TransformerCoreArea;