'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ChefHat } from 'lucide-react';
import { RECIPES } from '@/data/seedData';
import { useStore } from '@/store/useStore';
import { RecipeCard } from '@/components/cards/RecipeCard';
import { useRef, useEffect, useState } from 'react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] },
  },
};

export function LatestRecipes() {
  const { navigateTo, selectCategory } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const featured = RECIPES.filter((r) => r.isFeatured).slice(0, 6);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="py-8"
    >
      {/* Section header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-md shadow-accent/20">
            <ChefHat className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-main">
              وصفات <span className="text-gradient-warm">مميزة</span>
            </h2>
            <p className="text-text-subtle text-xs">وصفات مختارة لتجربيها</p>
          </div>
        </div>
        <button
          onClick={() => {
            selectCategory('cooking');
            navigateTo('category');
          }}
          className="btn-outline hidden sm:flex items-center gap-1.5 text-xs px-4 py-2 cursor-pointer"
        >
          عرض الكل <ArrowLeft className="h-3.5 w-3.5" />
        </button>
      </motion.div>

      {/* Horizontal scroll container with gradient fades */}
      <div className="relative">
        {/* Left gradient fade */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none hidden lg:block" />
        )}

        {/* Right gradient fade */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none hidden lg:block" />
        )}

        {/* Scroll hint bounce on initial render */}
        <motion.div
          variants={itemVariants}
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-3 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
        >
          {featured.map((recipe, i) => (
            <div
              key={recipe.id}
              className="min-w-[300px] lg:min-w-0 flex-shrink-0"
            >
              {i === 0 && (
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ repeat: 2, duration: 1.5, ease: 'easeInOut', delay: 1 }}
                  className="lg:hidden"
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              )}
              {i !== 0 && <RecipeCard recipe={recipe} />}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
