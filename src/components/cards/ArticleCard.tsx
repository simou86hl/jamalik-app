'use client';

import { motion } from 'framer-motion';
import { Clock, Heart, TrendingUp } from 'lucide-react';
import type { Article } from '@/types';
import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';
import { formatDate, getReadingTime } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  horizontal?: boolean;
}

export function ArticleCard({ article, horizontal = false }: ArticleCardProps) {
  const { selectArticle, navigateTo } = useStore();
  const cat = CATEGORIES.find((c) => c.slug === article.category);

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
        <div className="w-28 sm:w-36 flex-shrink-0">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center min-w-0">
          <span className="text-xs font-medium text-primary mb-1">{cat?.name}</span>
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
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="bg-card rounded-2xl overflow-hidden border border-border card-hover cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {article.isFeatured && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-accent text-white text-[10px] font-bold rounded-full flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> مميزة
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 dark:bg-black/70 text-primary text-[11px] font-bold rounded-full backdrop-blur-sm">
            {cat?.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-bold text-text-main text-sm sm:text-base leading-relaxed mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-text-subtle text-xs leading-relaxed line-clamp-2 mb-3">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-text-subtle text-[11px] pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{getReadingTime(article.content)} دقائق</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </motion.article>
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
