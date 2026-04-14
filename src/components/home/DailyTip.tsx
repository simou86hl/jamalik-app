'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { TIPS } from '@/data/seedData';
import { CATEGORIES } from '@/lib/constants';

const TIP_DURATION = 8000;

export function DailyTip() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressVal = 0;

    const progressInterval = setInterval(() => {
      progressVal += 100 / (TIP_DURATION / 30);
      if (progressVal >= 100) progressVal = 100;
      setProgress(progressVal);
    }, 30);

    const tipTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % TIPS.length);
    }, TIP_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(tipTimer);
    };
  }, [index]);

  const tip = TIPS[index];
  const category = CATEGORIES.find((c) => c.slug === tip.category);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-6"
    >
      <div className="glass-strong gradient-border rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative floating blobs */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-primary/10 blob-1 opacity-40" />
        <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-secondary/10 blob-2 opacity-30" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-accent/5 rounded-full animate-float opacity-50" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            {/* Larger lightbulb icon with golden gradient and glow */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center animate-glow shadow-[0_0_20px_rgba(230,162,60,0.3)]">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-text-main text-lg">نصيحة اليوم</h3>
                {/* Category badge */}
                {category && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                    {category.name}
                  </span>
                )}
              </div>
              <p className="text-text-subtle text-xs">نصائح يومية لجمالك وصحتك</p>
            </div>
          </div>

          {/* Tip content with gradient text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={tip.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-text-main text-base sm:text-lg leading-relaxed font-medium mb-5"
            >
              <span className="text-gradient-warm">&ldquo;</span>
              <span className="text-text-main">{tip.content}</span>
              <span className="text-gradient-warm">&rdquo;</span>
            </motion.p>
          </AnimatePresence>

          {/* Smooth progress bar */}
          <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.03 }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
