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
        'relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden',
        'glass-subtle transition-all duration-500 cursor-pointer',
        'hover:scale-105 gradient-border',
        'group'
      )}
      style={{ borderRadius: '50%' }}
      aria-label="تبديل الوضع"
    >
      {/* Animated gradient border on hover */}
      <span className="absolute inset-0 rounded-full gradient-border-animated opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Sun icon - golden glow when active */}
      <Sun
        className={cn(
          'h-[18px] w-[18px] absolute transition-all duration-500',
          isDark
            ? 'rotate-180 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100 text-accent',
          !isDark && 'drop-shadow-[0_0_8px_rgba(230,162,60,0.6)]'
        )}
      />
      {/* Moon icon - pink glow when active */}
      <Moon
        className={cn(
          'h-[18px] w-[18px] absolute transition-all duration-500',
          isDark
            ? 'rotate-0 scale-100 opacity-100 text-primary-light'
            : '-rotate-180 scale-0 opacity-0',
          isDark && 'drop-shadow-[0_0_8px_rgba(240,98,146,0.6)]'
        )}
      />
    </button>
  );
}
