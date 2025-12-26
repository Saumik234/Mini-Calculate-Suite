
import React, { useState } from 'react';
import CalculatorWrapper from '../components/CalculatorWrapper';
import { historyService } from '../services/historyService';
import { User } from '../types';

interface TipCalculatorProps {
  user: User | null;
}

const TipCalculator: React.FC<TipCalculatorProps> = ({ user }) => {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');
  const [roundUp, setRoundUp] = useState(false);
  const [result, setResult] = useState<{ tipAmount: number; totalAmount: number; perPersonAmount: number } | null>(null);

  const handleCalculate = () => {
    const billAmount = parseFloat(bill) || 0;
    const tipPercentage = parseFloat(tipPercent) || 0;
    const numPeople = parseInt(people, 10) || 1;

    if (billAmount <= 0 || numPeople <= 0) {
      setResult({ tipAmount: 0, totalAmount: billAmount, perPersonAmount: billAmount / numPeople });
      return;
    }
    
    const tip = billAmount * (tipPercentage / 100);
    let total = billAmount + tip;
    if (roundUp) {
      total = Math.ceil(total);
    }
    const tipAmt = total - billAmount;
    const perPerson = total / numPeople;
    
    const newResult = { tipAmount: tipAmt, totalAmount: total, perPersonAmount: perPerson };
    setResult(newResult);

    historyService.addHistoryItem(user, {
      type: 'Tip Calculation',
      result: `Total: $${newResult.totalAmount.toFixed(2)}, Per Person: $${newResult.perPersonAmount.toFixed(2)}`
    });
  };

  return (
    <CalculatorWrapper title="Tip Calculator">
      <div className="space-y-6">
        <div>
          <label htmlFor="bill" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Bill Amount</label>
          <input
            type="number"
            id="bill"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400">Tip Percentage</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[10, 15, 20].map((p) => (
              <button key={p} onClick={() => setTipPercent(p.toString())} className={`py-2 rounded-md text-sm font-semibold transition-colors ${tipPercent === p.toString() ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                {p}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer mt-4 accent-cyan-500"
          />
          <div className="text-center text-lg font-bold mt-1">{tipPercent}%</div>
        </div>

        <div>
          <label htmlFor="people" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Number of People</label>
          <input
            type="number"
            id="people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="1"
            min="1"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Round up total</span>
          <label htmlFor="roundUp" className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" id="roundUp" className="sr-only peer" checked={roundUp} onChange={() => setRoundUp(!roundUp)} />
            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
        </div>
        
        <button
          onClick={handleCalculate}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors"
        >
          Calculate
        </button>

        <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg space-y-4 min-h-[178px] flex flex-col justify-center">
          {result ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Tip Amount</span>
                <span className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">${result.tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Total Amount</span>
                <span className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">${result.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-300 dark:border-slate-700 pt-4 mt-4">
                <span className="text-slate-500 dark:text-slate-400">Amount Per Person</span>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${result.perPersonAmount.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <p className="text-center text-slate-400 dark:text-slate-500">Enter the details and click "Calculate".</p>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default TipCalculator;