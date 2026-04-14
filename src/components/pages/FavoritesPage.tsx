'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ARTICLES, RECIPES } from '@/data/seedData';
import type { Article, Recipe } from '@/types';
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

export function FavoritesPage() {
  const { favorites, goBack, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'recipes'>('all');

  const favoriteArticles = useMemo(
    () => favorites.filter((f) => f.type === 'article').map((f) => ARTICLES.find((a) => a.id === f.itemId)).filter((a): a is Article => a !== undefined),
    [favorites]
  );

  const favoriteRecipes = useMemo(
    () => favorites.filter((f) => f.type === 'recipe').map((f) => RECIPES.find((r) => r.id === f.itemId)).filter((r): r is Recipe => r !== undefined),
    [favorites]
  );

  const isEmpty = favorites.length === 0;

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
        العودة
      </motion.button>

      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-heading font-extrabold mb-2 flex items-center gap-3"
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2 }}
            className="inline-flex"
          >
            <Heart className="h-9 w-9 text-primary fill-primary" />
          </motion.span>
          <span className="text-gradient">المفضلة</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-text-subtle text-sm"
        >
          {favorites.length} عنصر محفوظ
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {isEmpty ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="py-16 text-center relative"
          >
            {/* Animated sparkle elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-4 left-1/4 opacity-20"
            >
              <Sparkles className="h-6 w-6 text-accent" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute top-12 right-1/4 opacity-15"
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 left-1/3 opacity-15"
            >
              <Sparkles className="h-5 w-5 text-secondary" />
            </motion.div>

            {/* Decorative blobs */}
            <div className="absolute top-1/4 right-1/3 w-20 h-20 rounded-full bg-primary/5 blob-1" />
            <div className="absolute bottom-1/4 left-1/4 w-16 h-16 rounded-full bg-secondary/5 blob-2" />

            {/* Large heart with animated gradient border */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="gradient-border-animated rounded-full p-1 mb-6">
                <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center">
                  <Heart className="h-12 w-12 text-primary/30" />
                </div>
              </div>

              <p className="text-text-main text-lg font-heading font-bold mb-2">لا توجد عناصر محفوظة</p>
              <p className="text-text-subtle text-sm mb-8 max-w-xs">
                ابدئي بحفظ المقالات والوصفات المفضلة لديك للوصول إليها بسهولة
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('home')}
                className="btn-primary text-sm cursor-pointer"
              >
                تصفحي المحتوى
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="favorites-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
                  {tab === 'all' ? `الكل (${favorites.length})` : tab === 'articles' ? `المقالات (${favoriteArticles.length})` : `الوصفات (${favoriteRecipes.length})`}
                  {activeTab === tab && (
                    <motion.span
                      layoutId="favorites-tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-gradient-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-10">
              <AnimatePresence mode="wait">
                {(activeTab === 'all' || activeTab === 'articles') && favoriteArticles.length > 0 && (
                  <motion.div
                    key={`fav-articles-${activeTab}`}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  >
                    {activeTab === 'all' && (
                      <h2 className="text-lg font-heading font-bold text-text-main mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 rounded-full bg-gradient-primary" />
                        المقالات المحفوظة
                      </h2>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteArticles.map((article) => (
                        <motion.div key={article.id} variants={staggerItem}>
                          <ArticleCard article={article} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {(activeTab === 'all' || activeTab === 'recipes') && favoriteRecipes.length > 0 && (
                  <motion.div
                    key={`fav-recipes-${activeTab}`}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  >
                    {activeTab === 'all' && (
                      <h2 className="text-lg font-heading font-bold text-text-main mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 rounded-full bg-gradient-warm" />
                        الوصفات المحفوظة
                      </h2>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteRecipes.map((recipe) => (
                        <motion.div key={recipe.id} variants={staggerItem}>
                          <RecipeCard recipe={recipe} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
