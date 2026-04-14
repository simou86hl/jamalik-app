'use client';

import { SITE_NAME, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { useStore } from '@/store/useStore';
import { Heart, Sparkles } from 'lucide-react';
import type { CategorySlug } from '@/types';

export function Footer() {
  const { navigateTo, selectCategory } = useStore();

  return (
    <footer className="bg-card border-t border-border mt-16 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-gradient">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-text-subtle text-sm leading-relaxed mb-4">
              موقع شامل للمرأة العربية يغطي الموضة والطبخ والعناية بالبشرة والشعر
              واللياقة والتجميل والصحة بنصائح ووصفات يومية.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-bold text-text-main mb-4">الأقسام</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.categories.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => {
                      selectCategory(cat.slug as CategorySlug);
                      navigateTo('category');
                    }}
                    className="text-sm text-text-subtle hover:text-primary transition-colors cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-heading font-bold text-text-main mb-4">روابط مفيدة</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.about.map((link, i) => (
                <li key={i}>
                  <span className="text-sm text-text-subtle hover:text-primary transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-text-main mb-4">النشرة البريدية</h3>
            <p className="text-sm text-text-subtle mb-3">
              اشتركي لتلقي أحدث النصائح والوصفات مباشرة في بريدك
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-3 py-2 text-sm bg-input-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-main placeholder:text-text-subtle/50"
              />
              <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors cursor-pointer">
                اشتراك
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-subtle">
            © {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة. صُنع بـ{' '}
            <Heart className="inline h-3 w-3 text-primary fill-primary" />
          </p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-subtle hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <span className="text-xs">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
