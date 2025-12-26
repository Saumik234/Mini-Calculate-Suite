
import React, { useState, useMemo } from 'react';
import CalculatorWrapper from '../components/CalculatorWrapper';
import { historyService } from '../services/historyService';
import { User } from '../types';

interface BillSplitterProps {
  user: User | null;
}

const BillSplitter: React.FC<BillSplitterProps> = ({ user }) => {
  const [totalBill, setTotalBill] = useState('');
  const [peopleCount, setPeopleCount] = useState('2');
  const [splitType, setSplitType] = useState<'equal' | 'unequal'>('equal');
  const [unequalAmounts, setUnequalAmounts] = useState<string[]>(['', '']);
  const [equalSplitResult, setEqualSplitResult] = useState<string | null>(null);

  const numPeople = parseInt(peopleCount, 10) || 1;

  const handlePeopleChange = (count: number) => {
    if (count < 1) return;
    setPeopleCount(count.toString());
    setUnequalAmounts(Array(count).fill(''));
  };

  const handleUnequalChange = (index: number, value: string) => {
    const newAmounts = [...unequalAmounts];
    newAmounts[index] = value;
    setUnequalAmounts(newAmounts);
  };
  
  const remainingAmount = useMemo(() => {
    const billAmount = parseFloat(totalBill) || 0;
    if (splitType !== 'unequal') return 0;
    
    const sumUnequal = unequalAmounts.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
    return billAmount - sumUnequal;
  }, [totalBill, splitType, unequalAmounts]);

  const handleCalculateEqual = () => {
    const billAmount = parseFloat(totalBill) || 0;
    if (billAmount > 0 && numPeople > 0) {
      const perPersonAmount = (billAmount / numPeople).toFixed(2);
      setEqualSplitResult(perPersonAmount);
      historyService.addHistoryItem(user, {
        type: 'Bill Split (Equal)',
        result: `Each of ${numPeople} people pays $${perPersonAmount}`
      });
    } else {
      setEqualSplitResult('0.00');
    }
  };

  return (
    <CalculatorWrapper title="Bill Splitter">
      <div className="space-y-6">
        <div>
          <label htmlFor="totalBill" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Total Bill</label>
          <input
            type="number"
            id="totalBill"
            value={totalBill}
            onChange={(e) => setTotalBill(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="peopleCount" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Number of People</label>
          <input
            type="number"
            id="peopleCount"
            value={peopleCount}
            onChange={(e) => handlePeopleChange(parseInt(e.target.value, 10))}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Split Method</label>
          <div className="flex rounded-md shadow-sm">
            <button onClick={() => { setSplitType('equal'); setEqualSplitResult(null); }} className={`w-full py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-l-md text-sm font-medium transition-colors ${splitType === 'equal' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
              Equally
            </button>
            <button onClick={() => setSplitType('unequal')} className={`w-full py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-r-md text-sm font-medium transition-colors ${splitType === 'unequal' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
              Unequally
            </button>
          </div>
        </div>

        {splitType === 'unequal' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Enter Amounts per Person</h3>
            {Array.from({ length: numPeople }).map((_, index) => (
              <div key={index} className="flex items-center space-x-3">
                <label className="w-20 text-slate-500 dark:text-slate-400">Person {index + 1}</label>
                <input
                  type="number"
                  value={unequalAmounts[index]}
                  onChange={(e) => handleUnequalChange(index, e.target.value)}
                  className="block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="0.00"
                />
              </div>
            ))}
            <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg text-center">
                <p className="text-slate-500 dark:text-slate-400">Remaining Amount</p>
                <p className={`text-2xl font-bold ${remainingAmount < 0 ? 'text-red-500' : 'text-green-400'}`}>
                    ${remainingAmount.toFixed(2)}
                </p>
            </div>
          </div>
        )}

        {splitType === 'equal' && (
          <div className="space-y-4">
            <button
              onClick={handleCalculateEqual}
              className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors"
            >
              Calculate Split
            </button>
            <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg text-center min-h-[96px] flex flex-col justify-center">
              {equalSplitResult !== null ? (
                <>
                  <p className="text-slate-500 dark:text-slate-400">Each Person Pays</p>
                  <p className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">${equalSplitResult}</p>
                </>
              ) : (
                <p className="text-slate-400 dark:text-slate-500">Click "Calculate Split" to see the amount.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorWrapper>
  );
};

export default BillSplitter;