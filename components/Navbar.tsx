
import React, { useState } from 'react';
import { Page, User } from '../types';
import { MenuIcon, XIcon } from './icons';

interface NavbarProps {
  setPage: (page: Page) => void;
  user: User | null;
}

const NavLink: React.FC<{ page: Page; setPage: (page: Page) => void; children: React.ReactNode; closeMenu?: () => void }> = ({ page, setPage, children, closeMenu }) => (
  <button
    onClick={() => {
      setPage(page);
      if (closeMenu) closeMenu();
    }}
    className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 rounded-md text-sm font-medium transition-colors"
  >
    {children}
  </button>
);

const Navbar: React.FC<NavbarProps> = ({ setPage, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setPage(Page.Home)} className="flex-shrink-0 text-slate-900 dark:text-white font-bold text-xl">
              Mini Calculator Suite
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink setPage={setPage} page={Page.Home}>Home</NavLink>
              <NavLink setPage={setPage} page={Page.TipCalculator}>Tip</NavLink>
              <NavLink setPage={setPage} page={Page.BillSplitter}>Bill Split</NavLink>
              <NavLink setPage={setPage} page={Page.CurrencyConverter}>Currency</NavLink>
              <NavLink setPage={setPage} page={Page.TaxCalculator}>Tax</NavLink>
              <NavLink setPage={setPage} page={Page.ExpenseTracker}>Expenses</NavLink>
              <NavLink setPage={setPage} page={Page.CoreCalculator}>Core</NavLink>
              <NavLink setPage={setPage} page={Page.History}>History</NavLink>
              <NavLink setPage={setPage} page={Page.Settings}>Settings</NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-slate-200 dark:bg-slate-700 inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-cyan-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink setPage={setPage} page={Page.Home} closeMenu={() => setIsOpen(false)}>Home</NavLink>
            <NavLink setPage={setPage} page={Page.TipCalculator} closeMenu={() => setIsOpen(false)}>Tip Calculator</NavLink>
            <NavLink setPage={setPage} page={Page.BillSplitter} closeMenu={() => setIsOpen(false)}>Bill Splitter</NavLink>
            <NavLink setPage={setPage} page={Page.CurrencyConverter} closeMenu={() => setIsOpen(false)}>Currency Converter</NavLink>
            <NavLink setPage={setPage} page={Page.TaxCalculator} closeMenu={() => setIsOpen(false)}>Tax Calculator</NavLink>
            <NavLink setPage={setPage} page={Page.ExpenseTracker} closeMenu={() => setIsOpen(false)}>Expense Tracker</NavLink>
            <NavLink setPage={setPage} page={Page.CoreCalculator} closeMenu={() => setIsOpen(false)}>Core Calculators</NavLink>
            <NavLink setPage={setPage} page={Page.History} closeMenu={() => setIsOpen(false)}>History</NavLink>
            <NavLink setPage={setPage} page={Page.Settings} closeMenu={() => setIsOpen(false)}>Settings</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;