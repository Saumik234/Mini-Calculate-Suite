
import React, { useState } from 'react';
import CalculatorWrapper from '../../components/CalculatorWrapper';
import { historyService } from '../../services/historyService';
import { User } from '../../types';

interface CableCoreSizeProps {
  user: User | null;
}

const CableCoreSize: React.FC<CableCoreSizeProps> = ({ user }) => {
  const [current, setCurrent] = useState('');
  const [length, setLength] = useState('');
  const [voltage, setVoltage] = useState('230');
  const [voltDropPercent, setVoltDropPercent] = useState('3');
  const [material, setMaterial] = useState<'copper' | 'aluminum'>('copper');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const i = parseFloat(current) || 0;
    const l = parseFloat(length) || 0;
    const v = parseFloat(voltage) || 0;
    const vdp = parseFloat(voltDropPercent) || 0;
    const resistivity = material === 'copper' ? 0.0172 : 0.0282; // Ohm·mm²/m

    if (i <= 0 || l <= 0 || v <= 0 || vdp <= 0) {
      setResult('0.00');
      return;
    }
    const voltageDrop = v * (vdp / 100);
    // Formula: Area (mm²) = (Resistivity * Length * Current) / VoltageDrop
    const coreSize = (resistivity * l * i) / voltageDrop;
    const newResult = coreSize.toFixed(2);
    setResult(newResult);

    historyService.addHistoryItem(user, {
        type: 'Cable Core Size',
        result: `Required Size: ${newResult} mm² for ${material}`
    });
  };

  return (
    <CalculatorWrapper title="Cable Core Size">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Conductor Material</label>
          <div className="flex rounded-md shadow-sm">
            <button onClick={() => setMaterial('copper')} className={`w-full py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-l-md text-sm font-medium transition-colors ${material === 'copper' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>Copper</button>
            <button onClick={() => setMaterial('aluminum')} className={`w-full py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-r-md text-sm font-medium transition-colors ${material === 'aluminum' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>Aluminum</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="current" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Current (A)</label>
            <input type="number" id="current" value={current} onChange={(e) => setCurrent(e.target.value)} className="mt-1 w-full bg-slate-100 dark:bg-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Length (m)</label>
            <input type="number" id="length" value={length} onChange={(e) => setLength(e.target.value)} className="mt-1 w-full bg-slate-100 dark:bg-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label htmlFor="voltage" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Voltage (V)</label>
            <input type="number" id="voltage" value={voltage} onChange={(e) => setVoltage(e.target.value)} className="mt-1 w-full bg-slate-100 dark:bg-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
          <div>
            <label htmlFor="voltDrop" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Voltage Drop (%)</label>
            <input type="number" id="voltDrop" value={voltDropPercent} onChange={(e) => setVoltDropPercent(e.target.value)} className="mt-1 w-full bg-slate-100 dark:bg-slate-700 rounded-md py-2 px-3 text-slate-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"/>
          </div>
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors"
        >
          Calculate Core Size
        </button>
        <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg text-center min-h-[116px] flex flex-col justify-center">
          {result !== null ? (
            <>
              <p className="text-slate-500 dark:text-slate-400">Required Core Size</p>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">{result} mm²</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">This is a simplified calculation. Consult a professional for critical applications.</p>
            </>
          ) : (
            <p className="text-slate-400 dark:text-slate-500">Click "Calculate Core Size" to see the result.</p>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default CableCoreSize;