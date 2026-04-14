'use client';

import { motion } from 'framer-motion';
import { User, Heart, BookOpen, ArrowRight, Settings, LogOut, ChefHat, Star } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const statsConfig = [
  { key: 'favorites', icon: Heart, label: 'المفضلة', gradientClass: 'bg-gradient-primary' },
  { key: 'articles', icon: BookOpen, label: 'المقالات', gradientClass: 'bg-gradient-rose-purple' },
  { key: 'recipes', icon: ChefHat, label: 'الوصفات', gradientClass: 'bg-gradient-warm' },
] as const;

const categoryGradients = [
  'bg-gradient-primary',
  'bg-gradient-rose-purple',
  'bg-gradient-warm',
  'bg-gradient-sunset',
];

export function ProfilePage() {
  const { favorites, goBack, navigateTo } = useStore();

  const articleCount = favorites.filter((f) => f.type === 'article').length;
  const recipeCount = favorites.filter((f) => f.type === 'recipe').length;

  const statValues: Record<string, number> = {
    favorites: favorites.length,
    articles: articleCount,
    recipes: recipeCount,
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
        العودة
      </motion.button>

      {/* Profile Header Card - Glass-strong with gradient border */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="glass-strong gradient-border rounded-3xl p-6 sm:p-8 mb-6 shadow-[var(--shadow-lg)]"
      >
        <div className="flex items-center gap-5">
          {/* Avatar with animated gradient border */}
          <div className="gradient-border-animated rounded-2xl p-[2px] flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-text-main">زائرة جمالكِ</h1>
            <p className="text-text-subtle text-sm mt-0.5">عضوة في مجتمع جمالكِ</p>
            <div className="flex items-center gap-1.5 mt-2.5">
              <div className="w-5 h-5 rounded-md bg-gradient-warm flex items-center justify-center">
                <Star className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs text-accent font-semibold">عضوة جديدة</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {statsConfig.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 + index * 0.06 }}
            className="glass-strong rounded-2xl p-4 text-center card-hover glow-primary-hover"
          >
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2',
              stat.gradientClass
            )}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-2xl font-heading font-bold text-text-main">{statValues[stat.key]}</p>
            <p className="text-[11px] text-text-subtle mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Interests Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="glass-strong rounded-2xl p-6 mb-6"
      >
        <h2 className="text-lg font-heading font-bold text-text-main mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 rounded-full bg-gradient-primary" />
          الأقسام المفضلة
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.slice(0, 4).map((cat, i) => (
            <motion.span
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.06 }}
              className={cn(
                'px-4 py-1.5 text-xs font-medium rounded-full text-white',
                categoryGradients[i % categoryGradients.length]
              )}
            >
              {cat.name}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="glass-strong rounded-2xl overflow-hidden"
      >
        {/* Favorites Action */}
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigateTo('favorites')}
          className="flex items-center gap-3.5 w-full p-5 text-right transition-all duration-300 cursor-pointer group border-b border-border/30 hover:bg-primary/5"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-primary/15 flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
            <Heart className="h-4.5 w-4.5 text-primary group-hover:text-white transition-colors" />
          </div>
          <span className="flex-1 text-sm text-text-main font-medium">المفضلة</span>
          <span className="glass-subtle px-2.5 py-1 rounded-full text-[11px] text-text-subtle">
            {favorites.length} عنصر
          </span>
          <ArrowRight className="h-4 w-4 text-text-subtle/50" />
        </motion.button>

        {/* Settings Action */}
        <motion.button
          whileHover={{ x: -4 }}
          className="flex items-center gap-3.5 w-full p-5 text-right transition-all duration-300 cursor-pointer group border-b border-border/30 hover:bg-primary/5"
        >
          <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-gradient-rose-purple transition-all duration-300">
            <Settings className="h-4.5 w-4.5 text-secondary group-hover:text-white transition-colors" />
          </div>
          <span className="flex-1 text-sm text-text-main font-medium">الإعدادات</span>
          <ArrowRight className="h-4 w-4 text-text-subtle/50" />
        </motion.button>

        {/* Logout Action */}
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigateTo('login')}
          className="flex items-center gap-3.5 w-full p-5 text-right transition-all duration-300 cursor-pointer group hover:bg-red-500/5"
        >
          <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 transition-all duration-300">
            <LogOut className="h-4.5 w-4.5 text-red-500 group-hover:text-white transition-colors" />
          </div>
          <span className="flex-1 text-sm text-red-500 font-medium group-hover:text-red-600 transition-colors">
            تسجيل الخروج
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
