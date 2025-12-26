import React, { useState } from 'react';
import { Page } from '../types';
import { BellIcon, ChartIcon, ShieldCheckIcon, DocumentTextIcon, MailIcon, TrashIcon, InformationCircleIcon } from '../components/icons';

interface SettingsProps {
    setPage: (page: Page) => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

const SettingsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-cyan-500 dark:text-cyan-400 mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const SettingsToggle: React.FC<{ label: string; enabled: boolean; onToggle: () => void; }> = ({ label, enabled, onToggle }) => (
    <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <label htmlFor={label} className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" id={label} className="sr-only peer" checked={enabled} onChange={onToggle} />
            <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
        </label>
    </div>
);

const SettingsRow: React.FC<{ label: string; onClick: () => void; icon: React.ReactNode; }> = ({ label, onClick, icon }) => (
    <button onClick={onClick} className="w-full flex items-center text-left p-3 bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
       <span className="text-cyan-500 dark:text-cyan-400 mr-4">{icon}</span>
       <span className="flex-grow text-slate-800 dark:text-slate-200">{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </button>
);


const AnalyticsModal: React.FC<{onClose: () => void}> = ({onClose}) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Clear Analytics Data</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">This will permanently delete analytics data. This action cannot be undone.</p>
            <div className="space-y-3">
                 <button className="w-full text-center p-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg transition-colors">Clear Today's Data</button>
                 <button className="w-full text-center p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">Clear All Data</button>
                 <button onClick={onClose} className="w-full text-center mt-4 p-2 text-slate-500 dark:text-slate-400">Cancel</button>
            </div>
        </div>
    </div>
);

const Settings: React.FC<SettingsProps> = ({ setPage, theme, setTheme }) => {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-cyan-500 dark:text-cyan-400">Settings</h1>
        
        {showModal && <AnalyticsModal onClose={() => setShowModal(false)} />}
        
        <SettingsCard title="General">
             <SettingsToggle label="Theme (Dark/Light)" enabled={theme === 'dark'} onToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
             <SettingsToggle label="Enable App Notifications" enabled={notifications} onToggle={() => setNotifications(!notifications)} />
             <SettingsToggle label="Enable Sound Effects" enabled={soundEffects} onToggle={() => setSoundEffects(!soundEffects)} />
        </SettingsCard>

        <SettingsCard title="Data & Privacy">
            <SettingsRow label="Manage Calculation History" onClick={() => setPage(Page.History)} icon={<TrashIcon className="w-6 h-6" />} />
            <SettingsRow label="Privacy Policy" onClick={() => setPage(Page.Privacy)} icon={<ShieldCheckIcon />} />
        </SettingsCard>

        <SettingsCard title="Analytics">
             <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                <span className="font-medium text-slate-700 dark:text-slate-300">Chart Type</span>
                <div className="flex rounded-md shadow-sm">
                    <button onClick={() => setChartType('bar')} className={`py-1 px-3 border border-slate-300 dark:border-slate-600 rounded-l-md text-sm font-medium transition-colors ${chartType === 'bar' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Bar</button>
                    <button onClick={() => setChartType('line')} className={`py-1 px-3 border border-slate-300 dark:border-slate-600 rounded-r-md text-sm font-medium transition-colors ${chartType === 'line' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Line</button>
                </div>
            </div>
             <button onClick={() => setShowModal(true)} className="w-full flex items-center text-left p-3 bg-slate-100 dark:bg-slate-900/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                 <span className="text-red-500 mr-4"><ChartIcon /></span>
                 <span className="flex-grow text-slate-800 dark:text-slate-200">Clear Analytics Data</span>
            </button>
        </SettingsCard>

         <SettingsCard title="About">
            <SettingsRow label="About Us" onClick={() => setPage(Page.About)} icon={<InformationCircleIcon />} />
            <SettingsRow label="Terms & Conditions" onClick={() => setPage(Page.Terms)} icon={<DocumentTextIcon />} />
            <SettingsRow label="Contact Us" onClick={() => setPage(Page.Contact)} icon={<MailIcon />} />
        </SettingsCard>
    </div>
  );
};

export default Settings;