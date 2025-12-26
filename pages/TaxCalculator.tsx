
import React, { useState } from 'react';
import CalculatorWrapper from '../components/CalculatorWrapper';
import { historyService } from '../services/historyService';
import { User } from '../types';

interface TaxCalculatorProps {
  user: User | null;
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({ user }) => {
  const [amount, setAmount] = useState('');
  const [taxRate, setTaxRate] = useState('5');
  const [result, setResult] = useState<{ taxAmount: number; totalAmount: number } | null>(null);

  const handleCalculate = () => {
    const baseAmount = parseFloat(amount) || 0;
    const rate = parseFloat(taxRate) || 0;

    if (baseAmount <= 0) {
      setResult({ taxAmount: 0, totalAmount: baseAmount });
      return;
    }
    const tax = baseAmount * (rate / 100);
    const total = baseAmount + tax;
    const newResult = { taxAmount: tax, totalAmount: total };
    setResult(newResult);

    historyService.addHistoryItem(user, {
      type: 'Tax Calculation',
      result: `Total with Tax: $${newResult.totalAmount.toFixed(2)}`
    });
  };

  return (
    <CalculatorWrapper title="Tax Calculator">
      <div className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Amount (before tax)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="0.00"
          />
        </div>
        <div>
          <label htmlFor="taxRate" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Tax Rate (%)</label>
          <input
            type="number"
            id="taxRate"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="5"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors"
        >
          Calculate Tax
        </button>

        <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg space-y-4 min-h-[138px] flex flex-col justify-center">
          {result ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Tax Amount</span>
                <span className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">${result.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-300 dark:border-slate-700 pt-4 mt-4">
                <span className="text-slate-500 dark:text-slate-400">Total Amount</span>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${result.totalAmount.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <p className="text-center text-slate-400 dark:text-slate-500">Click "Calculate Tax" to see the result.</p>
          )}
        </div>
      </div>
    </CalculatorWrapper>
  );
};

export default TaxCalculator;