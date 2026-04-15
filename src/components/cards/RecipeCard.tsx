'use client';

import { useState, useRef, useCallback } from 'react';
import { Clock, Flame, Star, Users } from 'lucide-react';
import type { Recipe } from '@/types';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const DIFFICULTY_GRADIENTS: Record<string, string> = {
  'سهل': 'from-green-500 to-emerald-400',
  'متوسط': 'from-amber-500 to-yellow-400',
  'صعب': 'from-red-500 to-rose-400',
};

function use3DTilt(maxTilt = 8) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      setTilt({ rotateX, rotateY });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return { cardRef, tilt, handleMouseMove, handleMouseLeave };
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { selectRecipe, navigateTo } = useStore();
  const { cardRef, tilt, handleMouseMove, handleMouseLeave } = use3DTilt();

  const handleClick = () => {
    selectRecipe(recipe);
  };

  const isTopRated = recipe.rating.average >= 4.5;

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="bg-card rounded-2xl overflow-hidden border border-border card-hover cursor-pointer group relative"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.35s ease, translateY 0.35s ease',
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={recipe.thumbnail}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient overlay at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Difficulty badge - gradient */}
        <div className="absolute top-3 right-3">
          <span className={cn(
            'px-2.5 py-1 text-[11px] font-bold rounded-full text-white bg-gradient-to-r shadow-lg',
            DIFFICULTY_GRADIENTS[recipe.difficulty] || 'from-amber-500 to-yellow-400'
          )}>
            {recipe.difficulty}
          </span>
        </div>

        {/* Rating badge with glow if top rated */}
        {isTopRated && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-black/70 rounded-full backdrop-blur-sm">
            <Star className={cn(
              'h-3.5 w-3.5 fill-accent text-accent',
              isTopRated && 'animate-pulse'
            )} />
            <span className="text-[11px] font-bold text-accent">{recipe.rating.average}</span>
            {isTopRated && (
              <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(230,162,60,0.4)] pointer-events-none" />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-text-main text-sm sm:text-base leading-relaxed mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {recipe.title}
        </h3>
        <p className="text-text-subtle text-xs leading-relaxed line-clamp-2 mb-3">
          {recipe.description}
        </p>

        {/* Info badges row with glass-subtle pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-border">
          {recipe.prepTime + recipe.cookTime > 0 && (
            <span className="glass-subtle flex items-center gap-1 text-text-subtle text-[11px] px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              {recipe.prepTime + recipe.cookTime} د
            </span>
          )}
          {recipe.servings > 0 && (
            <span className="glass-subtle flex items-center gap-1 text-text-subtle text-[11px] px-2 py-1 rounded-full">
              <Users className="h-3 w-3" />
              {recipe.servings} أشخاص
            </span>
          )}
          {recipe.calories > 0 && (
            <span className="glass-subtle flex items-center gap-1 text-text-subtle text-[11px] px-2 py-1 rounded-full">
              <Flame className="h-3 w-3" />
              {recipe.calories} سعرة
            </span>
          )}
          <span className={cn(
            'flex items-center gap-1 text-[11px] px-2 py-1 rounded-full',
            isTopRated
              ? 'bg-accent/10 text-accent font-bold'
              : 'glass-subtle text-accent'
          )}>
            <Star className={cn('h-3 w-3 fill-accent', isTopRated && 'animate-pulse')} />
            {recipe.rating.average} ({recipe.rating.count})
          </span>
        </div>
      </div>
    </article>
  );
}
