'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Heart, Share2, Clock, Flame, Users, Star,
  ChefHat, CheckCircle2, AlertTriangle, Lightbulb
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const DIFFICULTY_COLORS: Record<string, string> = {
  'سهل': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'متوسط': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'صعب': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const TYPE_LABELS: Record<string, string> = {
  cooking: 'طبخ',
  beauty: 'تجميل',
  haircare: 'شعر',
  skincare: 'بشرة',
  health: 'صحة',
};

export function RecipePage() {
  const { selectedRecipe, goBack, toggleFavorite, isFavorite } = useStore();
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  if (!selectedRecipe) {
    return (
      <div className="py-20 text-center">
        <p className="text-text-subtle">الوصفة غير موجودة</p>
        <button onClick={goBack} className="mt-4 text-primary text-sm cursor-pointer">العودة</button>
      </div>
    );
  }

  const recipe = selectedRecipe;
  const saved = isFavorite(recipe.id);

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      {/* Back */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-sm text-text-subtle hover:text-primary transition-colors mb-6 cursor-pointer"
      >
        <ArrowRight className="h-4 w-4" /> العودة
      </button>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-6">
        <img src={recipe.thumbnail} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
            {TYPE_LABELS[recipe.type] || recipe.type}
          </span>
          <span className={cn('px-3 py-1 text-xs font-bold rounded-full', DIFFICULTY_COLORS[recipe.difficulty])}>
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Title & Meta */}
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-main leading-relaxed mb-2">
          {recipe.title}
        </h1>
        <p className="text-text-subtle text-sm leading-relaxed mb-6">{recipe.description}</p>

        {/* Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {totalTime > 0 && (
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-text-subtle">الوقت</p>
              <p className="font-heading font-bold text-text-main text-sm">{totalTime} دقيقة</p>
            </div>
          )}
          {recipe.servings > 0 && (
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Users className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-text-subtle">الأشخاص</p>
              <p className="font-heading font-bold text-text-main text-sm">{recipe.servings}</p>
            </div>
          )}
          {recipe.calories > 0 && (
            <div className="bg-card rounded-xl p-3 border border-border text-center">
              <Flame className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-text-subtle">السعرات</p>
              <p className="font-heading font-bold text-text-main text-sm">{recipe.calories} سعرة</p>
            </div>
          )}
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <Star className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="text-xs text-text-subtle">التقييم</p>
            <p className="font-heading font-bold text-text-main text-sm">{recipe.rating.average}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => toggleFavorite(recipe.id, 'recipe')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer',
              saved ? 'bg-primary text-white' : 'bg-card border border-border text-text-subtle hover:border-primary/30'
            )}
          >
            <Heart className={cn('h-4 w-4', saved && 'fill-white')} />
            {saved ? 'محفوظ' : 'حفظ'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-card border border-border text-text-subtle hover:border-primary/30 transition-all cursor-pointer">
            <Share2 className="h-4 w-4" /> مشاركة
          </button>
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-xl font-heading font-bold text-text-main mb-4 flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" /> المكونات
          </h2>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border">
            {recipe.ingredients.map((ing, i) => (
              <button
                key={i}
                onClick={() => toggleIngredient(i)}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-3 text-right transition-colors cursor-pointer',
                  checkedIngredients.has(i) && 'opacity-50'
                )}
              >
                <CheckCircle2
                  className={cn(
                    'h-5 w-5 flex-shrink-0',
                    checkedIngredients.has(i) ? 'text-primary fill-primary' : 'text-border'
                  )}
                />
                <span className={cn(
                  'flex-1 text-sm',
                  checkedIngredients.has(i) && 'line-through text-text-subtle'
                )}>
                  {ing.amount && `${ing.amount} ${ing.unit} `}
                  {ing.name}
                  {ing.optional && <span className="text-text-subtle text-xs mr-1">(اختياري)</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="mb-8">
          <h2 className="text-xl font-heading font-bold text-text-main mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary text-white text-sm flex items-center justify-center">!</span>
            خطوات التحضير
          </h2>
          <div className="space-y-4">
            {recipe.steps.map((step) => (
              <div key={step.order} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
                  {step.order}
                </div>
                <div className="flex-1 bg-card rounded-xl p-4 border border-border">
                  <p className="text-sm text-text-main leading-relaxed">{step.instruction}</p>
                  {step.duration && (
                    <span className="inline-flex items-center gap-1 mt-2 text-xs text-text-subtle">
                      <Clock className="h-3 w-3" /> {step.duration}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        {recipe.tips.length > 0 && (
          <div className="mb-8 bg-accent/5 rounded-2xl p-5 border border-accent/10">
            <h3 className="font-heading font-bold text-text-main mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-accent" /> نصائح
            </h3>
            <ul className="space-y-2">
              {recipe.tips.map((tip, i) => (
                <li key={i} className="text-sm text-text-main/80 leading-relaxed flex items-start gap-2">
                  <span className="text-accent mt-1">•</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {recipe.warnings.length > 0 && (
          <div className="mb-8 bg-red-50 dark:bg-red-900/10 rounded-2xl p-5 border border-red-200 dark:border-red-900/20">
            <h3 className="font-heading font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> تحذيرات
            </h3>
            <ul className="space-y-2">
              {recipe.warnings.map((warn, i) => (
                <li key={i} className="text-sm text-red-700/80 dark:text-red-400/80 leading-relaxed flex items-start gap-2">
                  <span className="mt-1">!</span> {warn}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
          {recipe.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-input-bg rounded-full text-xs text-text-subtle">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
