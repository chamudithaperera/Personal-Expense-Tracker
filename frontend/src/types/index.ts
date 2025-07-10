export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  userId: string;
  title: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  category: string;
  startDate: string;
  endDate: string;
  sortBy: 'date' | 'amount' | 'title';
  sortOrder: 'asc' | 'desc';
}