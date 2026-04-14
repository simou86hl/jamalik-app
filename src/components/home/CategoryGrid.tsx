'use client';

import { motion } from 'framer-motion';
import {
  Shirt, ChefHat, Sparkles, Scissors, Dumbbell, Palette, Heart, Leaf
} from 'lucide-react';

import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="h-7 w-7" />,
  ChefHat: <ChefHat className="h-7 w-7" />,
  Sparkles: <Sparkles className="h-7 w-7" />,
  Scissors: <Scissors className="h-7 w-7" />,
  Dumbbell: <Dumbbell className="h-7 w-7" />,
  Palette: <Palette className="h-7 w-7" />,
  Heart: <Heart className="h-7 w-7" />,
  Leaf: <Leaf className="h-7 w-7" />,
};

const GRADIENTS: Record<string, string> = {
  fashion: 'from-pink-500 to-rose-400',
  cooking: 'from-orange-500 to-amber-400',
  skincare: 'from-purple-500 to-violet-400',
  haircare: 'from-amber-500 to-yellow-400',
  fitness: 'from-green-500 to-emerald-400',
  beauty: 'from-rose-500 to-pink-400',
  health: 'from-red-500 to-rose-400',
  natural: 'from-emerald-500 to-teal-400',
};

const CARD_GRADIENTS: Record<string, string> = {
  fashion: 'from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20',
  cooking: 'from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20',
  skincare: 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20',
  haircare: 'from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20',
  fitness: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
  beauty: 'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20',
  health: 'from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20',
  natural: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] },
  },
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
      {/* Section title */}
      <div className="text-center mb-10">
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl font-heading font-bold text-gradient mb-3"
        >
          تصفحي الأقسام
        </motion.h2>
        <motion.div
          variants={itemVariants}
          className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full mx-auto mb-3"
        />
        <motion.p
          variants={itemVariants}
          className="text-text-subtle text-sm"
        >
          اكتشفي عالم الجمال والعناية بكل تفاصيله
        </motion.p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            variants={itemVariants}
            onClick={() => {
              selectCategory(cat.slug);
              navigateTo('category');
            }}
            className={cn(
              'group relative rounded-2xl p-5 sm:p-6 text-center cursor-pointer overflow-hidden transition-all duration-500',
              'bg-gradient-to-br CARD_GRADIENTS[slug] hover:bg-gradient-to-br',
              CARD_GRADIENTS[cat.slug] || 'from-pink-50 to-rose-50',
              'hover:shadow-lg hover:shadow-primary/10',
              'border border-transparent hover:border-primary/20',
              'card-hover-lift'
            )}
          >
            {/* Hover gradient border effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-border pointer-events-none" />

            {/* Icon container */}
            <div
              className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg',
                'bg-gradient-to-br text-white',
                GRADIENTS[cat.slug] || 'from-pink-500 to-rose-400',
                'group-hover:shadow-primary/25'
              )}
            >
              {ICONS[cat.icon] || <Sparkles className="h-7 w-7" />}
            </div>

            <h3 className="font-heading font-bold text-text-main text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
              {cat.name}
            </h3>

            {/* Description - hidden on mobile, visible on desktop, fade-in on hover */}
            <p className="text-text-subtle text-xs leading-relaxed line-clamp-2 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-16 overflow-hidden">
              {cat.description}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
