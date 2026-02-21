import { create } from "zustand";
import { INITIAL_CATEGORIES } from "../constants/initialCategories";

interface CategoriesStoreState {
   categories: string[];
   addCategory: (category: string) => void;
   deleteCategory: (category: string) => void;
}

export const useCategoriesStore = create<CategoriesStoreState>((set) => ({
   // states
   categories: INITIAL_CATEGORIES,

   // actions
   addCategory: (category) =>
      set((state) => ({
         categories: [...state.categories, category],
      })),

   deleteCategory: (category) =>
      set((state) => ({
         categories: state.categories.filter((c) => c !== category),
      })),
}));
