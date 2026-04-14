'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '@/data/seedData';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import type { CategorySlug } from '@/types';

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const navigateTo = useStore((s) => s.navigateTo);
  const selectCategory = useStore((s) => s.selectCategory);

  const slides = HERO_SLIDES;

  const goToSlide = useCallback(
    (index: number) => {
      selectCategory(slides[index].category as CategorySlug);
      navigateTo('category');
    },
    [selectCategory, navigateTo, slides]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => goToSlide(current)}
        >
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />
          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-12 lg:px-16 max-w-xl">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-3"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base text-white/80 mb-5 leading-relaxed"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={(e) => { e.stopPropagation(); goToSlide(current); }}
              className="w-fit px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-full transition-colors cursor-pointer"
            >
              اكتشفي المزيد
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all cursor-pointer',
              i === current ? 'bg-primary w-8' : 'bg-white/50 hover:bg-white/80'
            )}
          />
        ))}
      </div>
    </div>
  );
}
