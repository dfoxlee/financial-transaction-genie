import { create } from "zustand";
import type { TransactionType } from "../types/transaction.types";

interface TransactionsStoreType {
   initialTransactions: TransactionType[] | null;
   currentTransactions: TransactionType[] | null;
   setInitialTransactions: (transactions: TransactionType[] | null) => void;
   setCurrentTransactions: (transactions: TransactionType[] | null) => void;
   updateCurrentTransaction: (updatedTransaction: TransactionType) => void;
   deleteCurrentTransaction: (id: number) => void;
   clearTransactions: () => void;
}

export const useTransactionsStore = create<TransactionsStoreType>((set) => ({
   // states
   initialTransactions: null,
   currentTransactions: null,

   // actions
   setInitialTransactions: (transactions) =>
      set({
         initialTransactions: transactions,
         currentTransactions: transactions,
      }),

   setCurrentTransactions: (transactions) =>
      set({ currentTransactions: transactions }),

   updateCurrentTransaction: (updatedTransaction) =>
      set((state) => {
         if (!state.currentTransactions) return state;

         const nextTransactions = state.currentTransactions.map(
            (transaction) =>
               transaction.id === updatedTransaction.id
                  ? updatedTransaction
                  : transaction,
         );

         return { currentTransactions: nextTransactions };
      }),

   deleteCurrentTransaction: (id) =>
      set((state) => {
         if (!state.currentTransactions) return state;

         const nextTransactions = state.currentTransactions.filter(
            (transaction) => transaction.id !== id,
         );

         return { currentTransactions: nextTransactions };
      }),

   clearTransactions: () =>
      set({ currentTransactions: null, initialTransactions: null }),
}));
