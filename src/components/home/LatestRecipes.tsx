'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ChefHat } from 'lucide-react';
import { RECIPES } from '@/data/seedData';
import { useStore } from '@/store/useStore';
import { RecipeCard } from '@/components/cards/RecipeCard';
import { useRef } from 'react';

export function LatestRecipes() {
  const { navigateTo, selectCategory } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const featured = RECIPES.filter((r) => r.isFeatured).slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <ChefHat className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-main">
              وصفات مميزة
            </h2>
            <p className="text-text-subtle text-xs">وصفات مختارة لتجربيها</p>
          </div>
        </div>
        <button
          onClick={() => {
            selectCategory('cooking');
            navigateTo('category');
          }}
          className="hidden sm:flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer"
        >
          عرض الكل <ArrowLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile scroll */}
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {featured.map((recipe) => (
          <div key={recipe.id} className="min-w-[280px] lg:min-w-0 flex-shrink-0">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
