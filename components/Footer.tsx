
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
      <div className="container mx-auto py-6 px-4 flex flex-col items-center text-sm space-y-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <button onClick={() => setPage(Page.About)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">About Us</button>
          <button onClick={() => setPage(Page.Terms)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Terms & Conditions</button>
          <button onClick={() => setPage(Page.Privacy)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Privacy Policy</button>
          <button onClick={() => setPage(Page.Contact)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Contact Us</button>
          <button onClick={() => setPage(Page.Disclaimer)} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Disclaimer</button>
        </div>
        <p>© 2025 Mini Calculator Suite All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
