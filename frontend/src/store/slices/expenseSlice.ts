import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Expense } from '../../types';

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    removeExpense(state, action: PayloadAction<string>) {
      state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    setExpenses(state, action: PayloadAction<Expense[]>) {
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, removeExpense, updateExpense, setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer; 