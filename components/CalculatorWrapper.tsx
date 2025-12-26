
import React from 'react';

interface CalculatorWrapperProps {
  title: string;
  children: React.ReactNode;
}

const CalculatorWrapper: React.FC<CalculatorWrapperProps> = ({ title, children }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden transition-colors duration-300">
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center text-cyan-500 dark:text-cyan-400 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default CalculatorWrapper;