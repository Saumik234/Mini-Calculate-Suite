
import React, { useState, useEffect } from 'react';
import { Page, User } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TipCalculator from './pages/TipCalculator';
import BillSplitter from './pages/BillSplitter';
import CurrencyConverter from './pages/CurrencyConverter';
import TaxCalculator from './pages/TaxCalculator';
import ExpenseTracker from './pages/CoreCalculators/ExpenseTracker';
import CoreCalculatorsHome from './pages/CoreCalculators/CoreCalculatorsHome';
import TransformerCoreArea from './pages/CoreCalculators/TransformerCoreArea';
import CableCoreSize from './pages/CoreCalculators/CableCoreSize';
import CpuCorePerformance from './pages/CoreCalculators/CpuCorePerformance';
import History from './pages/History';
import Settings from './pages/Settings';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import Contact from './pages/Contact';
import About from './pages/About';

const APP_NAME = 'Mini Calculator Suite';

// SEO Metadata Configuration
const pageMeta: { [key in Page]?: { title: string; description: string; keywords?: string } } = {
  [Page.Home]: {
    title: 'All-in-One Financial & Technical Tools',
    description: 'A comprehensive suite of calculators for tips, bill splitting, currency conversion, taxes, expenses, and engineering core measurements.',
    keywords: 'calculator, financial tools, engineering calculator, tip calculator, expense tracker'
  },
  [Page.TipCalculator]: {
    title: 'Tip Calculator - Easy & Fast',
    description: 'Calculate tips instantly with our free Tip Calculator. Supports splitting bills and custom percentages.',
    keywords: 'tip calculator, gratuity, bill splitter, calculate tip, service charge'
  },
  [Page.BillSplitter]: {
    title: 'Bill Splitter - Split Costs Evenly or Unevenly',
    description: 'Easily split bills among friends or groups. Supports both equal and unequal splitting methods.',
    keywords: 'bill splitter, split bill, share costs, group expense, dutch treat'
  },
  [Page.CurrencyConverter]: {
    title: 'Currency Converter - Real-Time Rates',
    description: 'Convert currencies instantly using real-time exchange rates powered by AI technology.',
    keywords: 'currency converter, exchange rates, money converter, usd to eur, forex'
  },
  [Page.TaxCalculator]: {
    title: 'Tax Calculator - Sales & Income Estimation',
    description: 'Quickly calculate sales tax or simple income tax percentages for your financial planning.',
    keywords: 'tax calculator, sales tax, income tax, vat calculator, tax estimator'
  },
  [Page.ExpenseTracker]: {
    title: 'Expense Tracker - Manage Your Spending',
    description: 'Track your daily expenses, categorize spending, and view your total budget usage.',
    keywords: 'expense tracker, budget manager, spending log, personal finance, money management'
  },
  [Page.CoreCalculator]: {
    title: 'Core Engineering Calculators',
    description: 'Specialized tools for electrical and computer engineering: Transformer Core Area, Cable Size, and CPU Performance.',
    keywords: 'engineering calculators, technical tools, transformer core, cable size, cpu performance'
  },
  [Page.TransformerCoreArea]: {
    title: 'Transformer Core Area Calculator',
    description: 'Calculate the required core area for transformers based on voltage and frequency.',
    keywords: 'transformer core area, electrical engineering, transformer design, magnetic flux'
  },
  [Page.CableCoreSize]: {
    title: 'Cable Core Size Calculator',
    description: 'Determine the appropriate electrical cable core size based on current, length, and voltage drop.',
    keywords: 'cable size calculator, wire gauge, voltage drop, electrical wiring, conductor size'
  },
  [Page.CpuCorePerformance]: {
    title: 'CPU Core Performance Calculator',
    description: 'Estimate theoretical CPU performance using core count, clock speed, and IPC.',
    keywords: 'cpu performance, processor calculator, ipc, clock speed, multicore performance'
  },
  [Page.History]: {
    title: 'Calculation History',
    description: 'View your recent calculation history for tips, currencies, and more.',
    keywords: 'calculation history, past results, activity log'
  },
  [Page.Settings]: {
    title: 'App Settings',
    description: 'Customize your Mini Calculator Suite experience, manage themes, and privacy settings.',
    keywords: 'settings, preferences, dark mode, configuration'
  },
  [Page.Terms]: {
    title: 'Terms & Conditions',
    description: 'Read the Terms and Conditions for using Mini Calculator Suite.',
    keywords: 'terms of service, legal, conditions, user agreement'
  },
  [Page.Privacy]: {
    title: 'Privacy Policy',
    description: 'Learn how we handle your data and protect your privacy.',
    keywords: 'privacy policy, data protection, user privacy, gdpr'
  },
  [Page.Disclaimer]: {
    title: 'Disclaimer',
    description: 'Read the legal disclaimers regarding financial and technical tools provided in this app.',
    keywords: 'disclaimer, legal notice, liability, terms of use'
  },
  [Page.Contact]: {
    title: 'Contact Us',
    description: 'Get in touch with the Mini Calculator Suite team for support or feedback.',
    keywords: 'contact us, support, feedback, customer service, help'
  },
  [Page.About]: {
    title: 'About Us',
    description: 'Learn more about the mission and technology behind Mini Calculator Suite.',
    keywords: 'about us, our story, calculator suite, mission'
  },
};

const App: React.FC = () => {
  // Default to a guest user since we removed authentication
  const [user] = useState<User>({
    uid: 'guest',
    email: null,
    displayName: 'Guest',
    photoURL: null
  });
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Comprehensive SEO Optimization
  useEffect(() => {
    const meta = pageMeta[currentPage];
    
    // Update Title
    if (meta?.title) {
      document.title = `${meta.title} | ${APP_NAME}`;
    } else {
      document.title = APP_NAME;
    }

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (meta?.description) {
      metaDescription.setAttribute('content', meta.description);
    } else {
      metaDescription.setAttribute('content', 'A comprehensive calculator suite featuring tools for tips, bill splitting, currency conversion, taxes, expense tracking, and specialized core calculations.');
    }

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }
    if (meta?.keywords) {
        metaKeywords.setAttribute('content', meta.keywords);
    } else {
        metaKeywords.setAttribute('content', 'calculator, tip calculator, bill splitter, currency converter, tax calculator, expense tracker, transformer core calculator, cable size calculator, cpu performance calculator');
    }

  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home setPage={setCurrentPage} />;
      case Page.TipCalculator:
        return <TipCalculator user={user} />;
      case Page.BillSplitter:
        return <BillSplitter user={user} />;
      case Page.CurrencyConverter:
        return <CurrencyConverter user={user} />;
      case Page.TaxCalculator:
        return <TaxCalculator user={user} />;
      case Page.ExpenseTracker:
        return <ExpenseTracker />;
      case Page.CoreCalculator:
        return <CoreCalculatorsHome setPage={setCurrentPage} />;
      case Page.TransformerCoreArea:
        return <TransformerCoreArea user={user} />;
      case Page.CableCoreSize:
        return <CableCoreSize user={user} />;
      case Page.CpuCorePerformance:
        return <CpuCorePerformance user={user} />;
      case Page.History:
          return <History user={user} />;
      case Page.Settings:
        return <Settings setPage={setCurrentPage} theme={theme} setTheme={setTheme} />;
      case Page.Terms:
        return <Terms />;
      case Page.Privacy:
        return <Privacy />;
      case Page.Disclaimer:
        return <Disclaimer />;
      case Page.Contact:
        return <Contact />;
      case Page.About:
        return <About />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-slate-50 dark:from-slate-900 dark:to-gray-900/30 text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300">
      <Navbar setPage={setCurrentPage} user={user} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;