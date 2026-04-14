'use client';

import { motion } from 'framer-motion';
import {
  Shirt, ChefHat, Sparkles, Scissors, Dumbbell, Palette, Heart, Leaf
} from 'lucide-react';

import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';

const ICONS: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="h-6 w-6" />,
  ChefHat: <ChefHat className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Scissors: <Scissors className="h-6 w-6" />,
  Dumbbell: <Dumbbell className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
  Leaf: <Leaf className="h-6 w-6" />,
};

const COLORS: Record<string, string> = {
  fashion: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  cooking: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  skincare: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  haircare: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  fitness: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  beauty: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  health: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  natural: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function CategoryGrid() {
  const { selectCategory, navigateTo } = useStore();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="py-10"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-main mb-2">
          تصفحي الأقسام
        </h2>
        <p className="text-text-subtle text-sm">
          اكتشفي عالم الجمال والعناية بكل تفاصيله
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            variants={itemVariants}
            onClick={() => {
              selectCategory(cat.slug);
              navigateTo('category');
            }}
            className="group relative bg-card rounded-2xl p-5 sm:p-6 border border-border hover:border-primary/30 card-hover cursor-pointer text-center"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110 ${COLORS[cat.slug] || 'bg-pink-100 text-pink-600'}`}
            >
              {ICONS[cat.icon] || <Sparkles className="h-6 w-6" />}
            </div>
            <h3 className="font-heading font-bold text-text-main text-sm sm:text-base mb-1">
              {cat.name}
            </h3>
            <p className="text-text-subtle text-xs leading-relaxed line-clamp-2">
              {cat.description}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
