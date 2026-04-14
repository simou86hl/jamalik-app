// ============================================================
// جمالكِ - Jamalik App Type Definitions
// ============================================================

/** Navigation pages in the SPA */
export type SitePage =
  | 'home'
  | 'category'
  | 'article'
  | 'recipe'
  | 'search'
  | 'favorites'
  | 'profile'
  | 'login'
  | 'register'
  | 'admin';

/** Main content categories */
export type CategorySlug =
  | 'fashion'
  | 'cooking'
  | 'skincare'
  | 'haircare'
  | 'fitness'
  | 'beauty'
  | 'health'
  | 'natural';

/** Age groups for content targeting */
export type AgeGroup = 'all' | 'teen' | 'young' | 'adult' | 'mature';

/** Recipe difficulty levels */
export type Difficulty = 'سهل' | 'متوسط' | 'صعب';

/** Recipe types */
export type RecipeType = 'cooking' | 'beauty' | 'haircare' | 'skincare' | 'health';

/** Comment/reaction item type */
export type FavoriteType = 'article' | 'recipe';

/** Category definition */
export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  icon: string;
  description: string;
  image: string;
  order: number;
  subcategories: string[];
}

/** Article stats (likes, views, shares, comments) */
export interface ArticleStats {
  likes: number;
  views: number;
  shares: number;
  comments: number;
}

/** Full Article interface */
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  images: string[];
  category: CategorySlug;
  tags: string[];
  ageGroup: AgeGroup;
  stats: ArticleStats;
  author: string;
  isFeatured: boolean;
  publishedAt: string;
  createdAt: string;
}

/** Recipe ingredient */
export interface RecipeIngredient {
  name: string;
  amount: string;
  unit: string;
  optional: boolean;
}

/** Recipe preparation step */
export interface RecipeStep {
  order: number;
  instruction: string;
  image: string;
  duration: string;
}

/** Recipe stats */
export interface RecipeStats {
  likes: number;
  saves: number;
  views: number;
}

/** Recipe rating */
export interface RecipeRating {
  average: number;
  count: number;
}

/** Full Recipe interface */
export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: RecipeType;
  thumbnail: string;
  images: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  calories: number;
  difficulty: Difficulty;
  suitableFor: string[];
  resultsTime: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: string[];
  warnings: string[];
  tags: string[];
  rating: RecipeRating;
  stats: RecipeStats;
  isFeatured: boolean;
  createdAt: string;
}

/** Comment on article or recipe */
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  itemId: string;
  itemType: FavoriteType;
  likes: number;
  parentId: string | null;
  createdAt: string;
}

/** Daily tip */
export interface Tip {
  id: string;
  content: string;
  category: CategorySlug;
  icon: string;
}

/** Skin types */
export type SkinType = 'oily' | 'dry' | 'combination' | 'sensitive' | 'normal';

/** Body types */
export type BodyType = 'slim' | 'average' | 'curvy' | 'plus';

/** User preferences */
export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  newsletter: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

/** User profile */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  age: number | null;
  skinType: SkinType | null;
  bodyType: BodyType | null;
  interests: CategorySlug[];
  preferences: UserPreferences;
  role: 'user' | 'admin';
}

/** Favorite item */
export interface FavoriteItem {
  itemId: string;
  type: FavoriteType;
}

/** Hero slide for the homepage slider */
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: CategorySlug;
  link: string;
}

/** Search result item */
export interface SearchResult {
  id: string;
  type: FavoriteType;
  title: string;
  excerpt: string;
  thumbnail: string;
  category: CategorySlug;
}

/** Navigation link */
export interface NavLink {
  label: string;
  slug: CategorySlug | 'home' | 'search' | 'favorites';
  icon?: string;
}
