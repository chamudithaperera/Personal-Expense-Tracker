import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types';

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  isLoading: false,
  error: null,
};

export const loadExpenses = createAsyncThunk(
  'expenses/loadExpenses',
  async (userId: string) => {
    const stored = localStorage.getItem(`expenses_${userId}`);
    return stored ? JSON.parse(stored) : [];
  }
);

export const addExpense = createAsyncThunk(
  'expenses/addExpense',
  async ({ expense, userId }: { expense: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>; userId: string }) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const stored = localStorage.getItem(`expenses_${userId}`) || '[]';
    const expenses = JSON.parse(stored);
    expenses.push(newExpense);
    localStorage.setItem(`expenses_${userId}`, JSON.stringify(expenses));
    
    return newExpense;
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, updates, userId }: { id: string; updates: Partial<Expense>; userId: string }) => {
    const stored = localStorage.getItem(`expenses_${userId}`) || '[]';
    const expenses = JSON.parse(stored);
    const index = expenses.findIndex((e: Expense) => e.id === id);
    
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(`expenses_${userId}`, JSON.stringify(expenses));
      return expenses[index];
    }
    throw new Error('Expense not found');
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async ({ id, userId }: { id: string; userId: string }) => {
    const stored = localStorage.getItem(`expenses_${userId}`) || '[]';
    const expenses = JSON.parse(stored);
    const filtered = expenses.filter((e: Expense) => e.id !== id);
    localStorage.setItem(`expenses_${userId}`, JSON.stringify(filtered));
    return id;
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload;
      })
      .addCase(loadExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load expenses';
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(e => e.id !== action.payload);
      });
  },
});

export default expenseSlice.reducer; 