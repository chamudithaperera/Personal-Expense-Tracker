import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeTab: 'dashboard' | 'expenses';
  showExpenseForm: boolean;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
  }>;
}

const initialState: UIState = {
  activeTab: 'dashboard',
  showExpenseForm: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'dashboard' | 'expenses'>) => {
      state.activeTab = action.payload;
    },
    toggleExpenseForm: (state) => {
      state.showExpenseForm = !state.showExpenseForm;
    },
    addNotification: (state, action: PayloadAction<{ type: 'success' | 'error' | 'info'; message: string }>) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { setActiveTab, toggleExpenseForm, addNotification, removeNotification } = uiSlice.actions;
export default uiSlice.reducer; 