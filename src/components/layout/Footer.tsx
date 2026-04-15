'use client';

import { SITE_NAME, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { useStore } from '@/store/useStore';
import {
  Heart, Sparkles, Camera, MessageCircle, Users,
  Tv, Send, Film,
  Shirt, ChefHat, Scissors, Dumbbell,
  Palette, Leaf, Globe, Info, Shield, Phone, FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';

import type { CategorySlug, SitePage } from '@/types';

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: Camera,
  twitter: MessageCircle,
  facebook: Users,
  tiktok: Film,
  youtube: Tv,
  snapchat: Send,
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  fashion: Shirt,
  cooking: ChefHat,
  skincare: Sparkles,
  haircare: Scissors,
  fitness: Dumbbell,
  beauty: Palette,
  health: Heart,
  natural: Leaf,
};

const USEFUL_LINKS = [
  { label: 'من نحن', page: 'about' as SitePage, icon: Info },
  { label: 'سياسة الخصوصية', page: 'privacy' as SitePage, icon: Shield },
  { label: 'شروط الاستخدام', page: 'about' as SitePage, icon: FileText },
  { label: 'تواصل معنا', page: 'contact' as SitePage, icon: Phone },
];

const MORE_LINKS = [
  { label: 'الاختبارات', page: 'quiz' as SitePage, icon: 'Brain' },
  { label: 'مقارنة المنتجات', page: 'compare' as SitePage, icon: 'GitCompareArrows' },
  { label: 'الدعوة والأصدقاء', page: 'referral' as SitePage, icon: 'Gift' },
  { label: 'الإشعارات', page: 'notifications' as SitePage, icon: 'Bell' },
];

export function Footer() {
  const { navigateTo, selectCategory } = useStore();

  const handleCategoryClick = (slug: string) => {
    selectCategory(slug as CategorySlug);
    navigateTo('category');
  };

  const handlePageNav = (page: SitePage) => {
    navigateTo(page);
  };

  return (
    <footer className="bg-card/50 border-t border-border/30 mt-8 pb-20 lg:pb-4 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ─── Brand + Social Icons Row ─── */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-heading font-bold text-gradient">{SITE_NAME}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon] || MessageCircle;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full glass-subtle flex items-center justify-center text-text-subtle transition-all duration-300 hover:bg-gradient-primary hover:text-white hover:scale-110 cursor-pointer"
                  aria-label={social.name}
                >
                  <Icon className="h-3 w-3" />
                </a>
              );
            })}
          </div>
        </div>

        {/* ─── الأقسام (pill chips - single row wrap) ─── */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {FOOTER_LINKS.categories.slice(0, 7).map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.slug];
              return (
                <motion.button
                  key={cat.slug}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium glass-subtle text-text-subtle hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                >
                  {Icon && <Icon className="h-2.5 w-2.5" />}
                  {cat.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ─── روابط مفيدة + المزيد (inline links) ─── */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {USEFUL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => handlePageNav(link.page)}
                  className="flex items-center gap-1 text-[11px] text-text-subtle hover:text-primary transition-colors duration-200 cursor-pointer py-0.5"
                >
                  <Icon className="h-2.5 w-2.5" />
                  {link.label}
                </button>
              );
            })}
            <span className="text-border">|</span>
            {MORE_LINKS.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handlePageNav(link.page)}
                  className="flex items-center gap-1 text-[11px] text-text-subtle hover:text-primary transition-colors duration-200 cursor-pointer py-0.5"
                >
                  {link.label}
                </button>
              ))}
            <button className="flex items-center gap-1 text-[11px] text-text-subtle hover:text-primary transition-colors duration-200 cursor-pointer py-0.5">
              <Globe className="h-2.5 w-2.5" />
              اللغة العربية
            </button>
          </div>
        </div>

        {/* ─── Copyright ─── */}
        <div className="pt-3 border-t border-border/20 flex items-center justify-center gap-1">
          <p className="text-[10px] text-text-subtle/60">
            © {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.
          </p>
          <Heart className="h-2.5 w-2.5 text-primary fill-primary" />
        </div>
      </div>
    </footer>
  );
}
