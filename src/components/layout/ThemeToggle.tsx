'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const toggle = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative w-9 h-9 rounded-full flex items-center justify-center',
        'bg-card border border-border hover:bg-primary/10',
        'transition-all duration-300 cursor-pointer'
      )}
      aria-label="تبديل الوضع"
    >
      <Sun className={cn(
        'h-4 w-4 absolute transition-all duration-300',
        isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-accent'
      )} />
      <Moon className={cn(
        'h-4 w-4 absolute transition-all duration-300',
        isDark ? 'rotate-0 scale-100 opacity-100 text-primary-light' : '-rotate-90 scale-0 opacity-0'
      )} />
    </button>
  );
}
