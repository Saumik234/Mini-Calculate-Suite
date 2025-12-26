
export enum Page {
  Home,
  TipCalculator,
  BillSplitter,
  CurrencyConverter,
  TaxCalculator,
  ExpenseTracker,
  CoreCalculator,
  TransformerCoreArea,
  CableCoreSize,
  CpuCorePerformance,
  History,
  Settings,
  Terms,
  Privacy,
  Disclaimer,
  Contact,
  About,
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

export interface HistoryItem {
  id: string;
  type: string;
  result: string;
  date: string;
}