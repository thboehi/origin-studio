// Layout racine de l'application
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Origin Studio",
  description: "Agence web suisse spécialisée dans les applications web sur mesure et les solutions IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true}>
      <head>
        {/* Favicon et icônes de base */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script defer src="https://umami.ext4.ch/script.js" data-website-id="eb8645c7-36a1-4c3f-a9a8-947b512bb57b"></script>
        
        {/* Preconnect pour optimiser les performances */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch pour les domaines externes si nécessaire */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full max-w-[100vw] overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
