import { create } from 'zustand';

// Definición de la tienda
interface CategoryState {
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string | undefined) => void;
}

// Creación de la tienda
export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: undefined,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
