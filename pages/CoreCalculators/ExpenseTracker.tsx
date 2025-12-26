import React, { useState } from 'react';
import { Expense } from '../../types';
import CalculatorWrapper from '../../components/CalculatorWrapper';

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(amount);
    if (!description || isNaN(amountNum) || amountNum <= 0) return;

    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount: amountNum,
      category,
      date: new Date().toLocaleDateString(),
    };
    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <CalculatorWrapper title="Expense Tracker">
      <form onSubmit={handleAddExpense} className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Expense description"
            className="flex-grow bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full md:w-32 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full md:w-auto flex-grow bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            >
                <option>Food</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Utilities</option>
                <option>Entertainment</option>
                <option>Other</option>
            </select>
            <button
            type="submit"
            className="w-full md:w-auto bg-cyan-600 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-700 transition-colors"
            >
            Add Expense
            </button>
        </div>
      </form>
      
      <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400 font-semibold">Total Expenses</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">${totalExpenses.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {expenses.length === 0 ? (
          <p className="text-center text-slate-400 dark:text-slate-500">No expenses added yet.</p>
        ) : (
          [...expenses].reverse().map(exp => (
            <div key={exp.id} className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{exp.description}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{exp.category} - {exp.date}</p>
              </div>
              <p className="font-bold text-lg text-cyan-500 dark:text-cyan-400">${exp.amount.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </CalculatorWrapper>
  );
};

export default ExpenseTracker;