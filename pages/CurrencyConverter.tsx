
import React, { useState, useEffect } from 'react';
import CalculatorWrapper from '../components/CalculatorWrapper';
import { getExchangeRate } from '../services/geminiService';
import { historyService } from '../services/historyService';
import { User } from '../types';

const CURRENCIES = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

interface CurrencyConverterProps {
  user: User | null;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ user }) => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rate, setRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency) return;
    setIsLoading(true);
    setError('');
    setRate(null);
    setConvertedAmount('');

    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    if (exchangeRate) {
      setRate(exchangeRate);
    } else {
      setError('Could not fetch exchange rate. Please try again.');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const amountNum = parseFloat(amount);
    if (rate && !isNaN(amountNum)) {
      const result = (amountNum * rate).toFixed(2);
      setConvertedAmount(result);
      historyService.addHistoryItem(user, {
          type: 'Currency Conversion',
          result: `${amount} ${fromCurrency} = ${result} ${toCurrency}`
      });
    } else {
      setConvertedAmount('');
    }
  }, [amount, rate, fromCurrency, toCurrency, user]);

  const CurrencySelect: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; id: string; }> = ({ value, onChange, id }) => (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
    >
      {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  );

  return (
    <CalculatorWrapper title="Currency Converter">
      <div className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-500 dark:text-slate-400">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-900 dark:text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/2">
            <label htmlFor="from" className="block text-sm font-medium text-slate-500 dark:text-slate-400">From</label>
            <CurrencySelect id="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} />
          </div>
          <div className="w-1/2">
            <label htmlFor="to" className="block text-sm font-medium text-slate-500 dark:text-slate-400">To</label>
            <CurrencySelect id="to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} />
          </div>
        </div>
        
        <button
          onClick={handleConvert}
          disabled={isLoading}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Converting...' : 'Convert'}
        </button>

        <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg text-center min-h-[124px] flex items-center justify-center">
            {isLoading && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && (
                convertedAmount ? (
                    <div>
                        <p className="text-slate-500 dark:text-slate-400">{amount} {fromCurrency} =</p>
                        <p className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">{convertedAmount} {toCurrency}</p>
                        {rate && <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</p>}
                    </div>
                ) : (
                    <p className="text-slate-400 dark:text-slate-500">Click "Convert" to see the exchange rate.</p>
                )
            )}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center">Rates provided by Gemini AI and may not be real-time financial data.</p>
      </div>
    </CalculatorWrapper>
  );
};

export default CurrencyConverter;