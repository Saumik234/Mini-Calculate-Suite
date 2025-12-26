import { HistoryItem, User } from '../types';

const getHistoryKey = (userId: string) => `calculation_history_${userId}`;

export const historyService = {
  getHistory: (user: User | null): HistoryItem[] => {
    if (!user) return [];
    try {
      const storedHistory = localStorage.getItem(getHistoryKey(user.uid));
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      return [];
    }
  },

  addHistoryItem: (user: User | null, item: Omit<HistoryItem, 'id' | 'date'>): void => {
    if (!user) return;
    const history = historyService.getHistory(user);
    const newItem: HistoryItem = {
      ...item,
      id: new Date().toISOString() + Math.random(), // Add random number to ensure uniqueness
      date: new Date().toLocaleString(),
    };
    // Keep history to a reasonable size, e.g., 50 items
    const updatedHistory = [newItem, ...history].slice(0, 50);
    localStorage.setItem(getHistoryKey(user.uid), JSON.stringify(updatedHistory));
  },

  deleteHistoryItem: (user: User | null, itemId: string): void => {
    if (!user) return;
    let history = historyService.getHistory(user);
    history = history.filter(item => item.id !== itemId);
    localStorage.setItem(getHistoryKey(user.uid), JSON.stringify(history));
  },

  clearHistory: (user: User | null): void => {
    if (!user) return;
    localStorage.removeItem(getHistoryKey(user.uid));
  },
};
