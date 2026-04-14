'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, SearchX } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';
import { ARTICLES, RECIPES } from '@/data/seedData';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { RecipeCard } from '@/components/cards/RecipeCard';
import { cn } from '@/lib/utils';

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function CategoryPage() {
  const { selectedCategory, selectedSubcategory, selectSubcategory, goBack } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'recipes'>('all');

  const category = CATEGORIES.find((c) => c.slug === selectedCategory);

  const articles = useMemo(
    () => (selectedCategory ? ARTICLES.filter((a) => a.category === selectedCategory) : []),
    [selectedCategory]
  );

  const recipes = useMemo(
    () => (selectedCategory ? RECIPES.filter((r) => {
      if (r.type === selectedCategory) return true;
      if (selectedCategory === 'natural') return ['beauty', 'haircare', 'skincare'].includes(r.type);
      return false;
    }) : []),
    [selectedCategory]
  );

  if (!category) {
    return (
      <div className="py-20 text-center">
        <p className="text-text-subtle">القسم غير موجود</p>
        <button onClick={goBack} className="mt-4 text-primary text-sm cursor-pointer">العودة للرئيسية</button>
      </div>
    );
  }

  const filteredArticles = selectedSubcategory
    ? articles.filter((a) => a.tags.some((t) => t.includes(selectedSubcategory || '')))
    : articles;

  const tabLabels: Record<'all' | 'articles' | 'recipes', string> = {
    all: 'الكل',
    articles: 'المقالات',
    recipes: 'الوصفات',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="py-6"
    >
      {/* Back Button */}
      <motion.button
        whileHover={{ x: 4 }}
        onClick={goBack}
        className="flex items-center gap-2 text-sm text-text-subtle hover:text-primary transition-colors mb-6 cursor-pointer group"
      >
        <span className="glass-subtle rounded-full p-1.5 group-hover:bg-primary/10 transition-colors">
          <ArrowRight className="h-4 w-4" />
        </span>
        العودة للرئيسية
      </motion.button>

      {/* Header with gradient text */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-heading font-extrabold mb-3"
        >
          <span className="text-gradient">{category.name}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-text-subtle text-sm leading-relaxed max-w-xl"
        >
          {category.description}
        </motion.p>
      </div>

      {/* Subcategory Pills */}
      {category.subcategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8"
        >
          <button
            onClick={() => selectSubcategory('')}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer',
              !selectedSubcategory
                ? 'bg-gradient-primary text-white shadow-[var(--shadow-sm)]'
                : 'glass-subtle text-text-subtle hover:text-primary hover:border-primary/30'
            )}
          >
            الكل
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => selectSubcategory(sub)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer',
                selectedSubcategory === sub
                  ? 'bg-gradient-primary text-white shadow-[var(--shadow-sm)]'
                  : 'glass-subtle text-text-subtle hover:text-primary hover:border-primary/30'
              )}
            >
              {sub}
            </button>
          ))}
        </motion.div>
      )}

      {/* Tabs with gradient underline */}
      <div className="flex items-center gap-6 mb-8 border-b border-border pb-3">
        {(['all', 'articles', 'recipes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'relative text-sm font-medium pb-1 transition-colors duration-300 cursor-pointer',
              activeTab === tab
                ? 'text-primary'
                : 'text-text-subtle hover:text-text-main'
            )}
          >
            {tabLabels[tab]}
            {activeTab === tab && (
              <motion.span
                layoutId="category-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-gradient-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Grid with stagger animation */}
      <div className="space-y-10">
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'articles') && filteredArticles.length > 0 && (
            <motion.div
              key={`articles-${selectedSubcategory}-${activeTab}`}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            >
              {activeTab === 'all' && (
                <h2 className="text-lg font-heading font-bold text-text-main mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-gradient-primary" />
                  المقالات
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((article) => (
                  <motion.div key={article.id} variants={staggerItem}>
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {(activeTab === 'all' || activeTab === 'recipes') && recipes.length > 0 && (
            <motion.div
              key={`recipes-${selectedSubcategory}-${activeTab}`}
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            >
              {activeTab === 'all' && (
                <h2 className="text-lg font-heading font-bold text-text-main mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-gradient-warm" />
                  الوصفات
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                  <motion.div key={recipe.id} variants={staggerItem}>
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state with decorative elements */}
        {filteredArticles.length === 0 && recipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="py-20 text-center relative"
          >
            {/* Decorative floating elements */}
            <div className="absolute top-8 right-1/4 w-16 h-16 rounded-full bg-primary/5 blob-1" />
            <div className="absolute bottom-8 left-1/3 w-12 h-12 rounded-full bg-secondary/5 blob-2" />
            <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-accent/5 animate-float" />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-sunset mx-auto mb-5 flex items-center justify-center animate-float">
                <SearchX className="h-9 w-9 text-primary/60" />
              </div>
              <p className="text-text-subtle text-lg font-heading font-medium mb-2">
                لا توجد محتويات في هذا القسم حالياً
              </p>
              <p className="text-text-subtle/60 text-sm">
                جربي تصفح قسم آخر أو العودة لاحقاً
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
