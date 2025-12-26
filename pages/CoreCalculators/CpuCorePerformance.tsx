
import React, { useState } from 'react';
import CalculatorWrapper from '../../components/CalculatorWrapper';
import { historyService } from '../../services/historyService';
import { User } from '../../types';

interface CpuCorePerformanceProps {
  user: User | null;
}

const CpuCorePerformance: React.FC<CpuCorePerformanceProps> = ({ user }) => {
  const [cores, setCores] = useState('');
  const [clockSpeed, setClockSpeed] = useState('');
  const [ipc, setIpc] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const numCores = parseInt(cores, 10) || 0;
    const speed = parseFloat(clockSpeed) || 0;
    const instructionsPerCycle = parseFloat(ipc) || 0;

    if (numCores <= 0 || speed <= 0 || instructionsPerCycle <= 0) {
      setResult('0.00');
      return;
    }
    const performanceScore = numCores * speed * instructionsPerCycle;
    const newResult = performanceScore.toFixed(2);
    setResult(newResult);

    historyService.addHistoryItem(user, {
        type: 'CPU Performance Score',
        result: `Relative Score: ${newResult}`
    });
  };

  return (
    <CalculatorWrapper title="CPU Core Performance">
      <div className="space-y-6">
        <div>
          <label htmlFor="cores" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Number of Cores</label>
          <input
            type="number"
            id="cores"
            value={cores}
            onChange={(e) => setCores(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="e.g., 8"
          />
        </div>
        <div>
          <label htmlFor="clockSpeed" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Clock Speed (GHz)</label>
          <input
            type="number"
            id="clockSpeed"
            value={clockSpeed}
            onChange={(e) => setClockSpeed(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="e.g., 3.5"
          />
        </div>
        <div>
          <label htmlFor="ipc" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Instructions Per Cycle (IPC)</label>
          <input
            type="number"
            id="ipc"
            value={ipc}
            onChange={(e) => setIpc(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="e.g., 1.5"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors"
        >
          Calculate Performance
        </button>
        <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg text-center min-h-[116px] flex flex-col justify-center">
          {result !== null ? (
            <>
              <p className="text-slate-500 dark:text-slate-400">Relative Performance Score</p>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">{result}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">A higher score indicates better theoretical performance. This is a simplified model.</p>
            </>
          ) : (
            <p className="text-slate-400 dark:text-slate-500">Click "Calculate Performance" to see the result.</p>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default CpuCorePerformance;