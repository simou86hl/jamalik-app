'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '@/data/seedData';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import type { CategorySlug } from '@/types';

const SLIDE_DURATION = 5000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const navigateTo = useStore((s) => s.navigateTo);
  const selectCategory = useStore((s) => s.selectCategory);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slides = HERO_SLIDES;

  const goToSlide = useCallback(
    (index: number) => {
      selectCategory(slides[index].category as CategorySlug);
      navigateTo('category');
    },
    [selectCategory, navigateTo, slides]
  );

  // Typewriter effect
  useEffect(() => {
    const title = slides[current].title;
    setDisplayedTitle('');
    setIsTyping(true);
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < title.length) {
        setDisplayedTitle(title.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [current, slides]);

  // Auto-play progress bar
  useEffect(() => {
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (SLIDE_DURATION / 30);
        const next = prev + increment;
        if (next >= 100) return 100;
        return next;
      });
    }, 30);

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    progressRef.current = progressInterval;

    return () => {
      clearInterval(progressInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, slides.length]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setProgress(0);
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    setCurrent((prev) => {
      if (direction === 'prev') return (prev - 1 + slides.length) % slides.length;
      return (prev + 1) % slides.length;
    });
    setProgress(0);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => goToSlide(current)}
        >
          {/* Image with Ken Burns effect */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />

          {/* Dramatic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />

          {/* Pattern dots overlay */}
          <div className="absolute inset-0 pattern-dots opacity-[0.03]" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-12 lg:px-16 max-w-xl">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-3"
            >
              {displayedTitle}
              {isTyping && (
                <span className="inline-block w-[2px] h-[1em] bg-white mr-1 animate-pulse align-middle" />
              )}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-sm sm:text-base text-white/80 mb-5 leading-relaxed"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
              onClick={(e) => { e.stopPropagation(); goToSlide(current); }}
              className="btn-primary glow-primary-hover w-fit text-sm cursor-pointer"
            >
              اكتشفي المزيد
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - glass-strong + gradient hover */}
      <button
        onClick={() => handleArrowClick('prev')}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-primary hover:to-secondary transition-all duration-300 cursor-pointer group"
        aria-label="السابق"
      >
        <ChevronLeft className="h-6 w-6 transition-transform group-hover:scale-110" />
      </button>
      <button
        onClick={() => handleArrowClick('next')}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-secondary hover:to-primary transition-all duration-300 cursor-pointer group"
        aria-label="التالي"
      >
        <ChevronRight className="h-6 w-6 transition-transform group-hover:scale-110" />
      </button>

      {/* Bottom bar: progress + dots */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Progress bar */}
        <div className="h-[3px] bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.03 }}
          />
        </div>

        {/* Pill-shaped dots */}
        <div className="flex items-center justify-center gap-2 py-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={cn(
                'rounded-full transition-all duration-500 cursor-pointer',
                i === current
                  ? 'w-8 h-3 bg-gradient-to-r from-primary via-secondary to-accent glow-primary'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/70'
              )}
              aria-label={`الانتقال إلى الشريحة ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
