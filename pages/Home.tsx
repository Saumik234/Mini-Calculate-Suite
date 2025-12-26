
import React from 'react';
import { Page } from '../types';
import { TipIcon, BillSplitIcon, CurrencyIcon, TaxIcon, ExpenseIcon, CoreIcon } from '../components/icons';

interface HomeProps {
  setPage: (page: Page) => void;
}

interface FeatureCardProps {
    title: string;
    description: string;
    page: Page;
    setPage: (page: Page) => void;
    icon: React.ComponentType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, page, setPage, icon: Icon }) => (
    <button
      onClick={() => setPage(page)}
      className="h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 ring-1 ring-slate-200 dark:ring-slate-700/50 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 transform hover:-translate-y-1 text-left"
    >
      <div className="flex items-center mb-4">
        <Icon />
        <h3 className="text-xl font-semibold ml-4 text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      <p className="text-slate-500 dark:text-slate-400">{description}</p>
    </button>
);

const Home: React.FC<HomeProps> = ({ setPage }) => {
  const features = [
    { title: 'Tip Calculator', description: 'Simple and advanced tip calculations with rounding options.', page: Page.TipCalculator, icon: TipIcon },
    { title: 'Bill Splitter', description: 'Equal and uneven bill splitting among multiple people.', page: Page.BillSplitter, icon: BillSplitIcon },
    { title: 'Currency Converter', description: 'Multi-currency support with real-time rates via AI.', page: Page.CurrencyConverter, icon: CurrencyIcon },
    { title: 'Tax Calculator', description: 'Custom tax rate calculations for different regions.', page: Page.TaxCalculator, icon: TaxIcon },
    { title: 'Expense Tracker', description: 'Record and track calculations with history.', page: Page.ExpenseTracker, icon: ExpenseIcon },
    { title: 'Core Calculators', description: 'Specialized calculators for technical core measurements.', page: Page.CoreCalculator, icon: CoreIcon },
  ];

  return (
    <section className="text-center" aria-labelledby="main-heading">
      <h1 id="main-heading" className="text-5xl font-extrabold mb-4">
        <span className="text-slate-900 dark:text-white">Welcome to </span>
        <span className="text-cyan-600 dark:text-cyan-400">Mini Calculator Suite</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto">Your all-in-one solution for daily, financial, and technical calculations. Select a tool below to get started.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(feature => (
          <FeatureCard key={feature.title} {...feature} setPage={setPage} />
        ))}
      </div>
    </section>
  );
};

export default Home;
