'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Soup, Clock, Sparkles, Star } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ARTICLES, RECIPES } from '@/data/seedData';
import { cn } from '@/lib/utils';
import type { Article, Recipe } from '@/types';

export function SearchModal() {
  const { isSearchOpen, closeSearch, selectArticle, selectRecipe, navigateTo } = useStore();
  const [query, setQuery] = useState('');

  const results = useMemo((): { articles: Article[]; recipes: Recipe[] } => {
    if (query.length < 2) return { articles: [], recipes: [] };
    const q = query.toLowerCase();
    const articles: Article[] = ARTICLES.filter(
      (a) => a.title.includes(q) || a.excerpt.includes(q) || a.tags.some((t) => t.includes(q))
    ).slice(0, 5);
    const recipes: Recipe[] = RECIPES.filter(
      (r) => r.title.includes(q) || r.description.includes(q) || r.tags.some((t) => t.includes(q))
    ).slice(0, 5);
    return { articles, recipes };
  }, [query]);

  const handleArticleClick = useCallback((article: Article) => {
    selectArticle(article);
    navigateTo('article');
    closeSearch();
    setQuery('');
  }, [selectArticle, navigateTo, closeSearch]);

  const handleRecipeClick = useCallback((recipe: Recipe) => {
    selectRecipe(recipe);
    navigateTo('recipe');
    closeSearch();
    setQuery('');
  }, [selectRecipe, navigateTo, closeSearch]);

  const handleClose = () => {
    closeSearch();
    setQuery('');
  };

  const hasResults = results.articles.length > 0 || results.recipes.length > 0;
  const isNoResults = query.length >= 2 && results.articles.length === 0 && results.recipes.length === 0;

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop - stronger blur with dark gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] backdrop-blur-xl"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.6) 100%)',
            }}
            onClick={handleClose}
          />

          {/* Search Panel - glass-strong with gradient-border */}
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed inset-x-0 top-0 z-[70] max-h-[85vh] overflow-y-auto"
          >
            <div className="mx-auto max-w-3xl px-4 pt-6 pb-10">
              {/* Panel container */}
              <div className="gradient-border rounded-2xl">
                <div className="glass-strong rounded-2xl overflow-hidden shadow-[var(--shadow-xl)]">
                  <div className="p-5">
                    {/* Search Input - large, elegant, animated border on focus */}
                    <div className={cn(
                      'flex items-center gap-3 p-2 rounded-xl transition-all duration-500',
                      'glass-subtle',
                      query.length > 0 && 'ring-2 ring-primary/30 shadow-[var(--shadow-glow)]'
                    )}>
                      <div className="w-10 h-10 rounded-full bg-gradient-primary/10 flex items-center justify-center flex-shrink-0">
                        <Search className="h-5 w-5 text-primary" />
                      </div>
                      <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="ابحثي عن مقالات، وصفات، نصائح..."
                        className="flex-1 bg-transparent text-text-main text-lg font-medium placeholder:text-text-subtle/50 focus:outline-none"
                      />
                      <button
                        onClick={handleClose}
                        className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-all duration-300 hover:shadow-[var(--shadow-glow)] group"
                      >
                        <X className="h-4 w-4 text-text-subtle transition-colors duration-300 group-hover:text-primary" />
                      </button>
                    </div>

                    {/* Animated gradient line under input when focused */}
                    {query.length > 0 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="h-[2px] bg-gradient-primary mt-0 origin-right rounded-full"
                      />
                    )}
                  </div>

                  {/* Results area */}
                  <div className="px-5 pb-5">
                    {/* Initial state - tags/chips with gradient hover */}
                    {query.length < 2 && (
                      <div className="text-center py-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary/10 flex items-center justify-center">
                            <Sparkles className="h-7 w-7 text-primary animate-float" />
                          </div>
                          <p className="text-text-subtle text-sm mb-5">اكتبي كلمتين على الأقل للبحث</p>
                          <div className="flex flex-wrap justify-center gap-2.5">
                            {['مكياج', 'طبخ', 'شعر', 'بشرة', 'لياقة', 'صحة'].map((tag) => (
                              <button
                                key={tag}
                                onClick={() => setQuery(tag)}
                                className={cn(
                                  'px-4 py-2 rounded-full text-sm font-medium',
                                  'glass-subtle text-text-subtle',
                                  'transition-all duration-300 cursor-pointer',
                                  'hover:bg-gradient-primary hover:text-white',
                                  'hover:shadow-[var(--shadow-glow)] hover:scale-105'
                                )}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* No results - with floating sparkle decoration */}
                    {isNoResults && (
                      <div className="text-center py-8">
                        {/* Animated sparkles decoration */}
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0"
                          >
                            <Star className="w-8 h-8 text-primary/20 absolute top-0 left-1/2 -translate-x-1/2" />
                            <Star className="w-5 h-5 text-accent/20 absolute bottom-0 left-1/2 -translate-x-1/2" />
                            <Star className="w-6 h-6 text-secondary/20 absolute top-1/2 right-0 -translate-y-1/2" />
                            <Star className="w-4 h-4 text-primary/15 absolute top-1/2 left-0 -translate-y-1/2" />
                          </motion.div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Search className="h-8 w-8 text-text-subtle/30" />
                          </div>
                        </div>
                        <p className="text-text-subtle text-sm">
                          لا توجد نتائج لـ &ldquo;{query}&rdquo;
                        </p>
                        <p className="text-text-subtle/60 text-xs mt-1">جرّبي كلمات بحث مختلفة</p>
                      </div>
                    )}

                    {/* Results list */}
                    {hasResults && (
                      <div className="space-y-5">
                        {/* Articles results */}
                        {results.articles.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold text-text-subtle uppercase mb-3 flex items-center gap-2 px-1">
                              <div className="w-6 h-6 rounded-lg bg-gradient-primary/10 flex items-center justify-center">
                                <FileText className="h-3.5 w-3.5 text-primary" />
                              </div>
                              مقالات ({results.articles.length})
                            </h4>
                            <div className="space-y-2">
                              {results.articles.map((a, i) => (
                                <motion.button
                                  key={a.id}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  onClick={() => handleArticleClick(a)}
                                  className="flex items-center gap-3 p-2.5 rounded-xl w-full text-right cursor-pointer card-hover-lift glass-subtle group"
                                >
                                  {/* Image with rounded-xl and gradient overlay */}
                                  <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden">
                                    <img
                                      src={a.thumbnail}
                                      alt=""
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-text-main line-clamp-1 group-hover:text-primary transition-colors duration-300">{a.title}</p>
                                    <p className="text-xs text-text-subtle mt-0.5">{a.excerpt.slice(0, 60)}...</p>
                                  </div>
                                  <Clock className="h-3 w-3 text-text-subtle/50 flex-shrink-0" />
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recipes results */}
                        {results.recipes.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold text-text-subtle uppercase mb-3 flex items-center gap-2 px-1">
                              <div className="w-6 h-6 rounded-lg bg-gradient-warm/30 flex items-center justify-center">
                                <Soup className="h-3.5 w-3.5 text-accent" />
                              </div>
                              وصفات ({results.recipes.length})
                            </h4>
                            <div className="space-y-2">
                              {results.recipes.map((r, i) => (
                                <motion.button
                                  key={r.id}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  onClick={() => handleRecipeClick(r)}
                                  className="flex items-center gap-3 p-2.5 rounded-xl w-full text-right cursor-pointer card-hover-lift glass-subtle group"
                                >
                                  {/* Image with rounded-xl and gradient overlay */}
                                  <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden">
                                    <img
                                      src={r.thumbnail}
                                      alt=""
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-warm/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-text-main line-clamp-1 group-hover:text-primary transition-colors duration-300">{r.title}</p>
                                    <p className="text-xs text-text-subtle mt-0.5">{r.description.slice(0, 60)}...</p>
                                  </div>
                                  <Clock className="h-3 w-3 text-text-subtle/50 flex-shrink-0" />
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
