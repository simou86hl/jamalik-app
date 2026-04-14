'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Share2, Clock, Eye, User, Calendar } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/lib/constants';
import { ARTICLES } from '@/data/seedData';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { formatDate, getReadingTime, cn } from '@/lib/utils';

export function ArticlePage() {
  const { selectedArticle, goBack, toggleFavorite, isFavorite } = useStore();

  if (!selectedArticle) {
    return (
      <div className="py-20 text-center">
        <p className="text-text-subtle">المقال غير موجود</p>
        <button onClick={goBack} className="mt-4 text-primary text-sm cursor-pointer">العودة</button>
      </div>
    );
  }

  const article = selectedArticle;
  const cat = CATEGORIES.find((c) => c.slug === article.category);
  const saved = isFavorite(article.id);

  const related = ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      {/* Back */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-sm text-text-subtle hover:text-primary transition-colors mb-6 cursor-pointer"
      >
        <ArrowRight className="h-4 w-4" /> العودة
      </button>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-6">
        <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 right-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
            {cat?.name}
          </span>
        </div>
      </div>

      {/* Title & Meta */}
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-main leading-relaxed mb-4">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-text-subtle text-xs mb-6 pb-4 border-b border-border">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" /> {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {getReadingTime(article.content)} دقائق قراءة
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {article.stats.views} مشاهدة
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => toggleFavorite(article.id, 'article')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer',
              saved ? 'bg-primary text-white' : 'bg-card border border-border text-text-subtle hover:border-primary/30'
            )}
          >
            <Heart className={cn('h-4 w-4', saved && 'fill-white')} />
            {saved ? 'محفوظ' : 'حفظ'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-card border border-border text-text-subtle hover:border-primary/30 transition-all cursor-pointer">
            <Share2 className="h-4 w-4" /> مشاركة
          </button>
          <span className="flex items-center gap-1 text-xs text-text-subtle mr-auto">
            <Heart className="h-3.5 w-3.5 text-primary" /> {article.stats.likes}
          </span>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-text-main leading-[1.9] text-[15px]
            [&_h3]:font-heading [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-text-main [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:mb-4 [&_p]:text-text-main/90"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-input-bg rounded-full text-xs text-text-subtle">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-heading font-bold text-text-main mb-4">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
