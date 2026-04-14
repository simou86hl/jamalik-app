'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Soup, Clock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { ARTICLES, RECIPES } from '@/data/seedData';
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

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-[70] max-h-[85vh] overflow-y-auto"
          >
            <div className="bg-card border-b border-border shadow-lg">
              <div className="max-w-3xl mx-auto px-4 py-6">
                {/* Search Input */}
                <div className="flex items-center gap-3 mb-4">
                  <Search className="h-5 w-5 text-text-subtle flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ابحثي عن مقالات، وصفات، نصائح..."
                    className="flex-1 bg-transparent text-text-main text-lg font-medium placeholder:text-text-subtle/50 focus:outline-none"
                  />
                  <button onClick={handleClose} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                    <X className="h-4 w-4 text-primary" />
                  </button>
                </div>

                {/* Results */}
                {query.length < 2 && (
                  <div className="text-center py-8">
                    <p className="text-text-subtle text-sm">اكتبي كلمتين على الأقل للبحث</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {['مكياج', 'طبخ', 'شعر', 'بشرة', 'لياقة'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 bg-input-bg rounded-full text-xs text-text-subtle hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {query.length >= 2 && results.articles.length === 0 && results.recipes.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-text-subtle text-sm">لا توجد نتائج لـ &ldquo;{query}&rdquo;</p>
                  </div>
                )}

                {(results.articles.length > 0 || results.recipes.length > 0) && (
                  <div className="space-y-4">
                    {results.articles.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-text-subtle uppercase mb-2 flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5" /> مقالات ({results.articles.length})
                        </h4>
                        <div className="space-y-2">
                          {results.articles.map((a) => (
                            <button
                              key={a.id}
                              onClick={() => handleArticleClick(a)}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/5 transition-colors w-full text-right cursor-pointer"
                            >
                              <img src={a.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text-main line-clamp-1">{a.title}</p>
                                <p className="text-xs text-text-subtle">{a.excerpt.slice(0, 60)}...</p>
                              </div>
                              <Clock className="h-3 w-3 text-text-subtle" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {results.recipes.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-text-subtle uppercase mb-2 flex items-center gap-2">
                          <Soup className="h-3.5 w-3.5" /> وصفات ({results.recipes.length})
                        </h4>
                        <div className="space-y-2">
                          {results.recipes.map((r) => (
                            <button
                              key={r.id}
                              onClick={() => handleRecipeClick(r)}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary/5 transition-colors w-full text-right cursor-pointer"
                            >
                              <img src={r.thumbnail} alt="" className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text-main line-clamp-1">{r.title}</p>
                                <p className="text-xs text-text-subtle">{r.description.slice(0, 60)}...</p>
                              </div>
                              <Clock className="h-3 w-3 text-text-subtle" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
