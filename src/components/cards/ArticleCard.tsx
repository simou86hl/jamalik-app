'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, TrendingUp } from 'lucide-react';
import type { Article } from '@/types';
import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, getReadingTime, cn } from '@/lib/utils';

const CATEGORY_GRADIENTS: Record<string, string> = {
  fashion: 'from-pink-500 to-rose-400',
  cooking: 'from-orange-500 to-amber-400',
  skincare: 'from-purple-500 to-violet-400',
  haircare: 'from-amber-500 to-yellow-400',
  fitness: 'from-green-500 to-emerald-400',
  beauty: 'from-rose-500 to-pink-400',
  health: 'from-red-500 to-rose-400',
  natural: 'from-emerald-500 to-teal-400',
};

interface ArticleCardProps {
  article: Article;
  horizontal?: boolean;
}

function use3DTilt(maxTilt = 8) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      setTilt({ rotateX, rotateY });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return { cardRef, tilt, handleMouseMove, handleMouseLeave };
}

function ShimmerOverlay() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 800);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="absolute inset-0 z-20 animate-shimmer rounded-2xl pointer-events-none" />
  );
}

export function ArticleCard({ article, horizontal = false }: ArticleCardProps) {
  const { selectArticle, navigateTo } = useStore();
  const cat = CATEGORIES.find((c) => c.slug === article.category);
  const { cardRef, tilt, handleMouseMove, handleMouseLeave } = use3DTilt();

  const handleClick = () => {
    selectArticle(article);
    navigateTo('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (horizontal) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={handleClick}
        className="flex gap-4 bg-card rounded-2xl overflow-hidden border border-border card-hover w-full text-right cursor-pointer"
      >
        <div className="w-28 sm:w-36 flex-shrink-0 relative overflow-hidden">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center min-w-0">
          <span className={cn(
            'text-xs font-bold text-white px-2 py-0.5 rounded-full w-fit mb-1',
            'bg-gradient-to-r',
            CATEGORY_GRADIENTS[article.category] || 'from-pink-500 to-rose-400'
          )}>
            {cat?.name}
          </span>
          <h3 className="font-heading font-bold text-text-main text-sm sm:text-base leading-snug mb-1 line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-3 text-text-subtle text-xs mt-1">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {article.stats.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" /> {article.stats.likes}
            </span>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="bg-card rounded-2xl overflow-hidden border border-border card-hover cursor-pointer group relative"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.35s ease, translateY 0.35s ease',
      }}
    >
      {/* Shimmer overlay on first render */}
      <ShimmerOverlay />

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Image overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Featured badge with animated gradient border */}
        {article.isFeatured && (
          <div className="absolute top-3 right-3 gradient-border-animated rounded-full p-[1px]">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-card rounded-full text-[10px] font-bold glow-primary">
              <TrendingUp className="h-3 w-3 text-accent" />
              <span className="text-accent">مميزة</span>
            </div>
          </div>
        )}

        {/* Category badge - gradient */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-2.5 py-1 text-[11px] font-bold rounded-full text-white bg-gradient-to-r shadow-lg',
            CATEGORY_GRADIENTS[article.category] || 'from-pink-500 to-rose-400'
          )}>
            {cat?.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-text-main text-sm sm:text-base leading-relaxed mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {article.title}
        </h3>
        <p className="text-text-subtle text-xs leading-relaxed line-clamp-2 mb-3">
          {article.excerpt}
        </p>

        {/* Meta with glass-subtle pill backgrounds */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="glass-subtle flex items-center gap-1.5 text-text-subtle text-[11px] px-2 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              {getReadingTime(article.content)} دقائق
            </span>
          </div>
          <span className="glass-subtle text-text-subtle text-[11px] px-2 py-1 rounded-full">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </div>
    </article>
  );
}

function Eye({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
