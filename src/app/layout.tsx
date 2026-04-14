import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "جمالكِ | Jamalik - موقع المرأة العربية الشامل",
  description:
    "موقع شامل للمرأة العربية يغطي الموضة والطبخ والعناية بالبشرة والشعر واللياقة البدنية والتجميل والصحة. نصائح ومقالات ووصفات يومية تناسب جميع الأعمار.",
  keywords: [
    "جمالك",
    "موضة",
    "طبخ",
    "بشرة",
    "شعر",
    "لياقة",
    "تجميل",
    "صحة",
    "وصفات",
    "مرأة عربية",
  ],
  authors: [{ name: "جمالكِ" }],
  openGraph: {
    title: "جمالكِ | Jamalik",
    description: "موقع المرأة العربية الشامل",
    type: "website",
    locale: "ar_AR",
    siteName: "جمالكِ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${tajawal.variable} min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
