// expensesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expensesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/' }),
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => 'expenses',
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: 'expenses',
        method: 'POST',
        body: newExpense,
      }),
    }),
    updateExpense: builder.mutation({
      query: ({ id, updatedExpense }) => ({
        url: `expenses/${id}`,
        method: 'PUT',
        body: updatedExpense,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expenses/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
