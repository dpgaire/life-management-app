import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    // Action to set expenses data
    setExpenses: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Action to add a new expense
    addExpense: (state, action) => {
      state.data.push(action.payload);
    },
    // Action to update an existing expense
    updateExpense: (state, action) => {
      const updatedIndex = state.data.findIndex((e) => e.id === action.payload.id);
      if (updatedIndex !== -1) {
        state.data[updatedIndex] = action.payload;
      }
    },
    // Action to delete an expense
    deleteExpense: (state, action) => {
      state.data = state.data.filter((expense) => expense.id !== action.payload);
    },
    // Action to set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Action to set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  setLoading,
  setError,
} = expenseSlice.actions;

export default expenseSlice.reducer;
