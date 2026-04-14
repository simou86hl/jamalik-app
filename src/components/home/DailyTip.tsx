'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { TIPS } from '@/data/seedData';
import { cn } from '@/lib/utils';

export function DailyTip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TIPS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const tip = TIPS[index];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-6"
    >
      <div className="bg-gradient-to-l from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 rounded-2xl p-6 sm:p-8 border border-primary/10 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/5" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-secondary/5" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-text-main text-lg">نصيحة اليوم</h3>
              <p className="text-text-subtle text-xs">نصائح يومية لجمالك وصحتك</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={tip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-text-main text-base sm:text-lg leading-relaxed font-medium"
            >
              &ldquo;{tip.content}&rdquo;
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-2 mt-4">
            {TIPS.slice(0, 5).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1 rounded-full transition-all duration-300',
                  i === (index % 5) ? 'w-8 bg-primary' : 'w-2 bg-primary/20'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
