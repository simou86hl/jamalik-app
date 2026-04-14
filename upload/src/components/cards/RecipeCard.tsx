'use client';

import { motion } from 'framer-motion';
import { Clock, Flame, Star, Users } from 'lucide-react';
import type { Recipe } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const DIFFICULTY_COLORS: Record<string, string> = {
  'سهل': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'متوسط': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'صعب': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { selectRecipe, navigateTo } = useStore();

  const handleClick = () => {
    selectRecipe(recipe);
    navigateTo('recipe');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="bg-card rounded-2xl overflow-hidden border border-border card-hover cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={recipe.thumbnail}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className={cn('px-2 py-1 text-[11px] font-bold rounded-full', DIFFICULTY_COLORS[recipe.difficulty])}>
            {recipe.difficulty}
          </span>
        </div>
        {recipe.rating.average >= 4.5 && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent text-white text-[10px] font-bold rounded-full flex items-center gap-1">
            <Star className="h-3 w-3 fill-white" /> {recipe.rating.average}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-text-main text-sm sm:text-base leading-relaxed mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        <p className="text-text-subtle text-xs leading-relaxed line-clamp-2 mb-3">
          {recipe.description}
        </p>

        {/* Info Badges */}
        <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-border">
          {recipe.prepTime + recipe.cookTime > 0 && (
            <div className="flex items-center gap-1 text-text-subtle text-[11px]">
              <Clock className="h-3 w-3" />
              <span>{recipe.prepTime + recipe.cookTime} د</span>
            </div>
          )}
          {recipe.servings > 0 && (
            <div className="flex items-center gap-1 text-text-subtle text-[11px]">
              <Users className="h-3 w-3" />
              <span>{recipe.servings} أشخاص</span>
            </div>
          )}
          {recipe.calories > 0 && (
            <div className="flex items-center gap-1 text-text-subtle text-[11px]">
              <Flame className="h-3 w-3" />
              <span>{recipe.calories} سعرة</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-accent text-[11px]">
            <Star className="h-3 w-3 fill-accent" />
            <span>{recipe.rating.average} ({recipe.rating.count})</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
