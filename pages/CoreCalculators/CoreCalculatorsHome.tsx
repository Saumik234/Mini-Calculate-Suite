
import React from 'react';
import { Page } from '../../types';
import { TransformerIcon, CableIcon, CpuIcon } from '../../components/icons';

interface CoreCalculatorsHomeProps {
  setPage: (page: Page) => void;
}

const CoreCalcCard: React.FC<{ title: string; page: Page; setPage: (page: Page) => void; icon: React.ComponentType; }> = ({ title, page, setPage, icon: Icon }) => (
    <button
      onClick={() => setPage(page)}
      className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 ring-1 ring-slate-200 dark:ring-slate-700/50 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 transform hover:-translate-y-1 text-left w-full"
    >
      <div className="flex items-center">
        <Icon />
        <h3 className="text-xl font-semibold ml-4 text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
    </button>
);

const CoreCalculatorsHome: React.FC<CoreCalculatorsHomeProps> = ({ setPage }) => {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-cyan-500 dark:text-cyan-400 mb-4">Core Calculators</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-10">A suite of specialized tools for technical calculations.</p>
      <div className="space-y-6">
        <CoreCalcCard title="Transformer Core Area Calculator" page={Page.TransformerCoreArea} setPage={setPage} icon={TransformerIcon} />
        <CoreCalcCard title="Cable Core Size Calculator" page={Page.CableCoreSize} setPage={setPage} icon={CableIcon} />
        <CoreCalcCard title="CPU Core Performance Calculator" page={Page.CpuCorePerformance} setPage={setPage} icon={CpuIcon} />
      </div>
    </div>
  );
};

export default CoreCalculatorsHome;