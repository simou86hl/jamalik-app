<div align="center">

# جمالكِ | Jamalik

**موقع المرأة العربية الشامل للجمال والعناية والأناقة**

<img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />

</div>

---

## 🌸 نظرة عامة

**جمالكِ** هو موقع ويب شامل مصمم خصيصاً للمرأة العربية، يغطي 8 أقسام رئيسية:

| القسم | المحتوى |
|-------|---------|
| 👗 **الموضة** | صيحات أزياء، تنسيقات، إطلالات مناسبات |
| 🍳 **الطبخ** | وصفات عربية وعالمية، أطباق رئيسية وحلويات |
| ✨ **البشرة** | روتين عناية، ماسكات طبيعية، علاج مشاكل |
| 💇 **الشعر** | تطويل، تكثيف، تسريحات، زيوت طبيعية |
| 💪 **اللياقة** | تمارين منزلية، يوغا، حميات صحية |
| 💄 **التجميل** | مكياج يومي وسهرة، أظافر، عطور |
| ❤️ **الصحة** | نصائح صحية، تغذية، صحة المرأة |
| 🌿 **وصفات طبيعية** | خلطات من المطبخ للبشرة والشعر والجسم |

## ✨ المميزات

- 🌙 **الوضع الليلي/النهاري** - تصميم متكامل لكلا الوضعين
- 📱 **تصميم متجاوب** - يعمل على الجوال والتابلت والكمبيوتر
- 🔍 **بحث فوري** - ابحثي في المقالات والوصفات مباشرة
- ❤️ **نظام المفضلة** - حفظ المقالات والوصفات المفضلة
- 🎬 **حركات سلسة** - Framer Motion لتجربة مستخدم مميزة
- 🔤 **RTL عربي كامل** - تصميم من اليمين لليسار
- 📝 **محتوى عربي غني** - 25 مقال + 15 وصفة + 30 نصيحة يومية

## 🛠️ التقنيات المستخدمة

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Zustand** (إدارة الحالة)
- **Framer Motion** (الحركات)
- **next-themes** (الوضع الليلي)
- **Lucide React** (الأيقونات)

## 🚀 التشغيل المحلي

```bash
# تثبيت التبعيات
bun install
# أو
npm install

# تشغيل خادم التطوير
bun dev
# أو
npm run dev
```

افتحي [http://localhost:3000](http://localhost:3000) في المتصفح

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── globals.css        # نظام التصميم
│   ├── layout.tsx         # Layout الرئيسي (RTL + Fonts)
│   └── page.tsx           # الصفحة الرئيسية (SPA Router)
├── components/
│   ├── cards/             # بطاقات المقالات والوصفات
│   ├── home/              # مكونات الصفحة الرئيسية
│   ├── layout/            # Navbar, Footer, ThemeToggle
│   ├── pages/             # صفحات المحتوى
│   └── shared/            # SearchModal
├── data/
│   └── seedData.ts        # البيانات (مقالات، وصفات، نصائح)
├── lib/
│   ├── constants.ts       # الثوابت والأقسام
│   └── utils.ts           # الدوال المساعدة
├── store/
│   └── useStore.ts        # Zustand Store
└── types/
    └── index.ts           # TypeScript Types
```

## 🌐 النشر على Vercel

1. ارفعي المشروع على GitHub
2. ادخلي [vercel.com](https://vercel.com)
3. اربطي حساب GitHub واختاري المستودع
4. اضغطي **Deploy** - وسيعمل مباشرة!

---

<div align="center">
صُنع بـ ❤️ للمرأة العربية
</div>
