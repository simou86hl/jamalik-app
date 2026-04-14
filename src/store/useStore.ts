import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  SitePage,
  CategorySlug,
  Article,
  Recipe,
  FavoriteItem,
} from "@/types";

interface JamaliStore {
  // Navigation
  currentPage: SitePage;
  previousPage: SitePage | null;

  // Selections
  selectedCategory: CategorySlug | null;
  selectedSubcategory: string | null;
  selectedArticle: Article | null;
  selectedRecipe: Recipe | null;

  // Search
  searchQuery: string;
  isSearchOpen: boolean;

  // UI
  isMobileMenuOpen: boolean;
  isDarkMode: boolean;

  // Favorites
  favorites: FavoriteItem[];

  // Comments
  commentsText: string;

  // Actions
  navigateTo: (page: SitePage) => void;
  goBack: () => void;
  selectCategory: (slug: CategorySlug) => void;
  selectSubcategory: (name: string) => void;
  selectArticle: (article: Article) => void;
  selectRecipe: (recipe: Recipe) => void;
  setSearchQuery: (query: string) => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleDarkMode: () => void;
  toggleFavorite: (itemId: string, type: "article" | "recipe") => void;
  isFavorite: (itemId: string) => boolean;
  clearSelection: () => void;
}

export const useStore = create<JamaliStore>()(
  persist(
    (set, get) => ({
      // Navigation
      currentPage: "home",
      previousPage: null,

      // Selections
      selectedCategory: null,
      selectedSubcategory: null,
      selectedArticle: null,
      selectedRecipe: null,

      // Search
      searchQuery: "",
      isSearchOpen: false,

      // UI
      isMobileMenuOpen: false,
      isDarkMode: false,

      // Favorites
      favorites: [],

      // Comments
      commentsText: "",

      // Actions
      navigateTo: (page) =>
        set((state) => ({
          previousPage: state.currentPage,
          currentPage: page,
          isMobileMenuOpen: false,
          isSearchOpen: false,
        })),

      goBack: () =>
        set((state) => ({
          currentPage: state.previousPage || "home",
          previousPage: null,
          selectedArticle: null,
          selectedRecipe: null,
          selectedCategory: null,
        })),

      selectCategory: (slug) =>
        set({
          selectedCategory: slug,
          selectedSubcategory: null,
          selectedArticle: null,
          selectedRecipe: null,
        }),

      selectSubcategory: (name) =>
        set({ selectedSubcategory: name }),

      selectArticle: (article) =>
        set({ selectedArticle: article, currentPage: "article" }),

      selectRecipe: (recipe) =>
        set({ selectedRecipe: recipe, currentPage: "recipe" }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleSearch: () =>
        set((state) => ({ isSearchOpen: !state.isSearchOpen })),

      closeSearch: () => set({ isSearchOpen: false, searchQuery: "" }),

      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),

      toggleFavorite: (itemId, type) =>
        set((state) => {
          const exists = state.favorites.some((f) => f.itemId === itemId);
          return {
            favorites: exists
              ? state.favorites.filter((f) => f.itemId !== itemId)
              : [...state.favorites, { itemId, type }],
          };
        }),

      isFavorite: (itemId) =>
        get().favorites.some((f) => f.itemId === itemId),

      clearSelection: () =>
        set({
          selectedCategory: null,
          selectedSubcategory: null,
          selectedArticle: null,
          selectedRecipe: null,
        }),
    }),
    {
      name: "jamalik-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
