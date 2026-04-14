'use client';

import { motion } from 'framer-motion';
import { User, Heart, BookOpen, ArrowRight, Settings, LogOut, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';

export function ProfilePage() {
  const { favorites, goBack, navigateTo } = useStore();

  const articleCount = favorites.filter((f) => f.type === 'article').length;
  const recipeCount = favorites.filter((f) => f.type === 'recipe').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-6"
    >
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-sm text-text-subtle hover:text-primary transition-colors mb-6 cursor-pointer"
      >
        <ArrowRight className="h-4 w-4" /> العودة
      </button>

      {/* Profile Header */}
      <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-text-main">زائرة جمالكِ</h1>
            <p className="text-text-subtle text-sm">عضوة في مجتمع جمالكِ</p>
            <div className="flex items-center gap-1 mt-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs text-accent font-medium">عضوة جديدة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-2xl border border-border p-4 text-center">
          <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-heading font-bold text-text-main">{favorites.length}</p>
          <p className="text-xs text-text-subtle">المفضلة</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 text-center">
          <BookOpen className="h-6 w-6 text-secondary mx-auto mb-2" />
          <p className="text-2xl font-heading font-bold text-text-main">{articleCount}</p>
          <p className="text-xs text-text-subtle">المقالات</p>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 text-center">
          <Sparkles className="h-6 w-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-heading font-bold text-text-main">{recipeCount}</p>
          <p className="text-xs text-text-subtle">الوصفات</p>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-6">
        <h2 className="text-lg font-heading font-bold text-text-main mb-4">الأقسام المفضلة</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <span key={cat.id} className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full">
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-2xl border border-border divide-y divide-border">
        <button
          onClick={() => navigateTo('favorites')}
          className="flex items-center gap-3 w-full p-4 text-right hover:bg-primary/5 transition-colors cursor-pointer"
        >
          <Heart className="h-5 w-5 text-primary" />
          <span className="flex-1 text-sm text-text-main">المفضلة</span>
          <span className="text-xs text-text-subtle">{favorites.length} عنصر</span>
        </button>
        <button className="flex items-center gap-3 w-full p-4 text-right hover:bg-primary/5 transition-colors cursor-pointer">
          <Settings className="h-5 w-5 text-text-subtle" />
          <span className="flex-1 text-sm text-text-main">الإعدادات</span>
        </button>
        <button
          onClick={() => navigateTo('login')}
          className="flex items-center gap-3 w-full p-4 text-right hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors cursor-pointer"
        >
          <LogOut className="h-5 w-5 text-red-500" />
          <span className="flex-1 text-sm text-red-500">تسجيل الخروج</span>
        </button>
      </div>
    </motion.div>
  );
}
