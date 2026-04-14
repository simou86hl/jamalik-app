import type { Category, NavLink } from '@/types';

// ============================================================
// Site Information
// ============================================================

export const SITE_NAME = 'جمالكِ';
export const SITE_DESCRIPTION =
  'موقع شامل للمرأة العربية يغطي الموضة والطبخ والعناية بالبشرة والشعر واللياقة البدنية والتجميل والصحة. نصائح ومقالات ووصفات يومية تناسب جميع الأعمار.';
export const SITE_URL = 'https://jamalik.app';

// ============================================================
// Categories (8 main categories)
// ============================================================

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'الموضة',
    slug: 'fashion',
    icon: 'Shirt',
    description: 'آخر صيحات الموضة والأزياء، نصائح لاختيار الملابس المناسبة وإطلالات مميزة لكل مناسبة',
    image: '/images/categories/fashion.jpg',
    order: 1,
    subcategories: ['ملابس يومية', 'سهرة', 'محجبات', 'إكسسوارات', 'أحذية', 'حقائب'],
  },
  {
    id: 'cat-2',
    name: 'الطبخ',
    slug: 'cooking',
    icon: 'ChefHat',
    description: 'وصفات شهية من المطبخ العربي والعالمي، من الأطباق الرئيسية إلى الحلويات والمشروبات',
    image: '/images/categories/cooking.jpg',
    order: 2,
    subcategories: ['أطباق رئيسية', 'حلويات', 'مقبلات', 'سلطات', 'مشروبات', 'أكل صحي'],
  },
  {
    id: 'cat-3',
    name: 'البشرة',
    slug: 'skincare',
    icon: 'Sparkles',
    description: 'روتين العناية بالبشرة، ماسكات طبيعية، نصائح للترطيب والتفتيح ومكافحة مشاكل البشرة',
    image: '/images/categories/skincare.jpg',
    order: 3,
    subcategories: ['تنظيف', 'ترطيب', 'ماسكات', 'مشاكل', 'واقي شمس', 'تبييض'],
  },
  {
    id: 'cat-4',
    name: 'الشعر',
    slug: 'haircare',
    icon: 'Scissors',
    description: 'عناية شاملة بالشعر، وصفات للتطويل والتكثيف، تسريحات حديثة ونصائح للصبغات',
    image: '/images/categories/haircare.jpg',
    order: 4,
    subcategories: ['تطويل', 'تكثيف', 'تساقط', 'صبغات', 'تسريحات', 'زيوت'],
  },
  {
    id: 'cat-5',
    name: 'اللياقة',
    slug: 'fitness',
    icon: 'Dumbbell',
    description: 'تمارين رياضية منزلية، يوغا، حميات غذائية صحية ونصائح لتحسين اللياقة البدنية',
    image: '/images/categories/fitness.jpg',
    order: 5,
    subcategories: ['تمارين', 'يوغا', 'حميات', 'إنقاص وزن', 'زيادة وزن', 'صحة نفسية'],
  },
  {
    id: 'cat-6',
    name: 'التجميل',
    slug: 'beauty',
    icon: 'Palette',
    description: 'أسرار المكياج، نصائح التجميل اليومي والسهرة، العناية بالأظافر والعطور',
    image: '/images/categories/beauty.jpg',
    order: 6,
    subcategories: ['مكياج يومي', 'مكياج سهرة', 'أظافر', 'عطور', 'إزالة شعر'],
  },
  {
    id: 'cat-7',
    name: 'الصحة',
    slug: 'health',
    icon: 'Heart',
    description: 'نصائح صحية شاملة، تغذية سليمة، صحة المرأة والحمل والنصائح الطبية العامة',
    image: '/images/categories/health.jpg',
    order: 7,
    subcategories: ['حمل وولادة', 'دورة شهرية', 'تغذية', 'نصائح طبية'],
  },
  {
    id: 'cat-8',
    name: 'وصفات طبيعية',
    slug: 'natural',
    icon: 'Leaf',
    description: 'وصفات طبيعية من المطبخ للعناية بالبشرة والشعر والجسم بدون مواد كيميائية',
    image: '/images/categories/natural.jpg',
    order: 8,
    subcategories: ['بشرة', 'شعر', 'جسم', 'وجه', 'شفاة', 'أظافر'],
  },
];

// ============================================================
// Navigation Links
// ============================================================

export const NAV_LINKS: NavLink[] = [
  { label: 'الرئيسية', slug: 'home' },
  { label: 'الموضة', slug: 'fashion', icon: 'Shirt' },
  { label: 'الطبخ', slug: 'cooking', icon: 'ChefHat' },
  { label: 'البشرة', slug: 'skincare', icon: 'Sparkles' },
  { label: 'الشعر', slug: 'haircare', icon: 'Scissors' },
  { label: 'اللياقة', slug: 'fitness', icon: 'Dumbbell' },
  { label: 'التجميل', slug: 'beauty', icon: 'Palette' },
  { label: 'الصحة', slug: 'health', icon: 'Heart' },
  { label: 'طبيعي', slug: 'natural', icon: 'Leaf' },
];

// ============================================================
// Footer Links
// ============================================================

export const FOOTER_LINKS = {
  categories: CATEGORIES.map((c) => ({ label: c.name, slug: c.slug })),
  about: [
    { label: 'من نحن', slug: '#' },
    { label: 'سياسة الخصوصية', slug: '#' },
    { label: 'شروط الاستخدام', slug: '#' },
    { label: 'تواصل معنا', slug: '#' },
  ],
};

// ============================================================
// Social Media Links
// ============================================================

export const SOCIAL_LINKS = [
  { name: 'انستغرام', url: 'https://instagram.com/jamalik', icon: 'instagram' },
  { name: 'تويتر', url: 'https://twitter.com/jamalik', icon: 'twitter' },
  { name: 'فيسبوك', url: 'https://facebook.com/jamalik', icon: 'facebook' },
  { name: 'تيك توك', url: 'https://tiktok.com/@jamalik', icon: 'tiktok' },
  { name: 'يوتيوب', url: 'https://youtube.com/@jamalik', icon: 'youtube' },
  { name: 'سناب شات', url: 'https://snapchat.com/add/jamalik', icon: 'snapchat' },
];

// ============================================================
// Age Groups Labels (Arabic)
// ============================================================

export const AGE_GROUP_LABELS: Record<string, string> = {
  all: 'جميع الأعمار',
  teen: 'مراهقات',
  young: 'شابات',
  adult: 'بالغات',
  mature: 'ناضجات',
};

// ============================================================
// Difficulty Labels
// ============================================================

export const DIFFICULTY_LABELS: Record<string, string> = {
  'سهل': 'سهل',
  'متوسط': 'متوسط',
  'صعب': 'صعب',
};

// ============================================================
// Constants for UI behavior
// ============================================================

export const ARTICLES_PER_PAGE = 12;
export const RECIPES_PER_PAGE = 12;
export const SEARCH_DEBOUNCE_MS = 300;
export const TOAST_DURATION_MS = 3000;
export const HERO_SLIDE_INTERVAL_MS = 5000;
export const MAX_IMAGE_SIZE_MB = 5;
