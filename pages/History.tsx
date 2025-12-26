import React, { useState, useEffect } from 'react';
import CalculatorWrapper from '../components/CalculatorWrapper';
import { historyService } from '../services/historyService';
import { HistoryItem, User } from '../types';
import { TrashIcon } from '../components/icons';

interface HistoryProps {
  user: User | null;
}

const ClearHistoryModal: React.FC<{onConfirm: () => void, onCancel: () => void}> = ({onConfirm, onCancel}) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center transform transition-all"
             role="alertdialog"
             aria-labelledby="modal-title"
             aria-describedby="modal-description"
        >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50">
                <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 id="modal-title" className="text-lg font-bold mt-4 text-slate-900 dark:text-slate-100">Clear All History?</h3>
            <p id="modal-description" className="text-sm text-slate-500 dark:text-slate-400 my-2">
                This will permanently delete all your calculation history. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-center gap-4">
                 <button 
                    onClick={onCancel} 
                    className="w-full py-2 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-slate-500">
                    Cancel
                 </button>
                 <button 
                    onClick={onConfirm} 
                    className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-red-500">
                    Yes, Clear All
                 </button>
            </div>
        </div>
    </div>
);

const History: React.FC<HistoryProps> = ({ user }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (user) {
        setHistory(historyService.getHistory(user));
    }
  }, [user]);

  const handleDelete = (itemId: string) => {
    historyService.deleteHistoryItem(user, itemId);
    setHistory(historyService.getHistory(user));
  };

  const handleConfirmClearAll = () => {
    historyService.clearHistory(user);
    setHistory([]);
    setShowClearConfirm(false);
  };

  return (
    <CalculatorWrapper title="Calculation History">
      {showClearConfirm && <ClearHistoryModal onConfirm={handleConfirmClearAll} onCancel={() => setShowClearConfirm(false)} />}
      {history.length > 0 && (
         <div className="mb-4 text-right">
            <button
              onClick={() => setShowClearConfirm(true)}
              className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-red-500"
            >
              <TrashIcon className="w-4 h-4" />
              Clear All History
            </button>
          </div>
      )}
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
        {history.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-8">
            <p>Your calculation history is empty.</p>
            <p>Results from calculators will appear here.</p>
          </div>
        ) : (
          history.map(item => (
            <div key={item.id} className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{item.type}</p>
                <p className="text-sm text-cyan-600 dark:text-cyan-400">{item.result}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.date}</p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors">
                 <span className="sr-only">Delete item</span>
                 <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </CalculatorWrapper>
  );
};

export default History;
