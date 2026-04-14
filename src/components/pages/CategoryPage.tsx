'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';
import { ARTICLES, RECIPES } from '@/data/seedData';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { RecipeCard } from '@/components/cards/RecipeCard';
import { cn } from '@/lib/utils';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      {/* Header */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-sm text-text-subtle hover:text-primary transition-colors mb-6 cursor-pointer"
      >
        <ArrowRight className="h-4 w-4" />
        العودة للرئيسية
      </button>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-main mb-2">{category.name}</h1>
        <p className="text-text-subtle text-sm leading-relaxed">{category.description}</p>
      </div>

      {/* Subcategories */}
      {category.subcategories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          <button
            onClick={() => selectSubcategory('')}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer',
              !selectedSubcategory ? 'bg-primary text-white' : 'bg-card border border-border text-text-subtle hover:border-primary/30'
            )}
          >
            الكل
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => selectSubcategory(sub)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer',
                selectedSubcategory === sub ? 'bg-primary text-white' : 'bg-card border border-border text-text-subtle hover:border-primary/30'
              )}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-border pb-3">
        {(['all', 'articles', 'recipes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'text-sm font-medium pb-1 transition-colors cursor-pointer border-b-2',
              activeTab === tab ? 'text-primary border-primary' : 'text-text-subtle border-transparent hover:text-text-main'
            )}
          >
            {tab === 'all' ? 'الكل' : tab === 'articles' ? 'المقالات' : 'الوصفات'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {(activeTab === 'all' || activeTab === 'articles') && filteredArticles.length > 0 && (
          <div>
            {activeTab === 'all' && (
              <h2 className="text-lg font-heading font-bold text-text-main mb-4">المقالات</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'recipes') && recipes.length > 0 && (
          <div>
            {activeTab === 'all' && (
              <h2 className="text-lg font-heading font-bold text-text-main mb-4">الوصفات</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {filteredArticles.length === 0 && recipes.length === 0 && (
          <div className="py-20 text-center">
            <SlidersHorizontal className="h-12 w-12 text-text-subtle/30 mx-auto mb-4" />
            <p className="text-text-subtle">لا توجد محتويات في هذا القسم حالياً</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
