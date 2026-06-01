import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gojags Classroom | LMS Pusdiklat BPS",
  description:
    "Platform LMS resmi Pusdiklat BPS untuk kursus, knowledge center, webinar, diskusi, dan pembelajaran digital.",
  keywords:
    "Gojags Classroom, Pusdiklat BPS, LMS BPS, SE2026, Sensus Ekonomi 2026, BPS Kepulauan Sangihe",
  authors: [{ name: "BPS Kabupaten Kepulauan Sangihe" }],
  openGraph: {
    title: "MOOC Pelatihan Petugas SE2026 | Gojags Classroom",
    description:
      "Pelatihan Petugas Sensus Ekonomi 2026 oleh BPS Kabupaten Kepulauan Sangihe",
    siteName: "Gojags Classroom",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/bps-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
