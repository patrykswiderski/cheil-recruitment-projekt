import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const samsungOneArabic = localFont({
  src: [
    {
      path: "../public/fonts/SamsungOneArabic-300.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/SamsungOneArabic-400.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/SamsungOneArabic-450.ttf",
      weight: "450",
    },
    {
      path: "../public/fonts/SamsungOneArabic-600.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/SamsungOneArabic-700.ttf",
      weight: "700",
    },
  ],
  variable: "--font-samsung-one-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cheil Poland",
  description: "Cheil Poland recruitment task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${samsungOneArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
