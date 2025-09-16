import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Suspense } from "react"
import Loading from "@/components/loading"
import { Analytics } from "@vercel/analytics/next"
import VisitorTracker  from "@/components/VisitorTracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kirti Patel - Software Developer",
  description: "Portfolio of Kirti Patel, a passionate Software Developer specializing in React, Next.js, and modern web technologies. Explore my projects, skills, and professional experience.",
  keywords: [
    "Kirti Patel",
    "Software Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Web Developer",
    "JavaScript Developer",
    "Portfolio",
    "Gujarat India"
  ],
  authors: [{ name: "Kirti Patel" }],
  creator: "Kirti Patel",
  publisher: "Kirti Patel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kpatel.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Kirti Patel - Software Developer",
    description: "Portfolio of Kirti Patel, a passionate Software Developer specializing in React, Next.js, and modern web technologies. Explore my projects, skills, and professional experience.",
    url: 'https://kpatel.site',
    siteName: 'Kirti Patel Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kirti Patel - Software Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kirti Patel - Software Developer",
    description: "Portfolio of Kirti Patel, a passionate Software Developer specializing in React, Next.js, and modern web technologies.",
    images: ['/og-image.png'],
    creator: '@kirtipatel79',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.jpg', sizes: 'any', type: 'image/jpeg' },
      { url: '/favicon.jpg', sizes: '16x16', type: 'image/jpeg' },
      { url: '/favicon.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
    apple: '/favicon.jpg',
    shortcut: '/favicon.jpg',
  },
  manifest: '/manifest.json',
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
      <Analytics/>
      <VisitorTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kirti Patel",
              "jobTitle": "Software Developer",
              "description": "Passionate Software Developer specializing in React, Next.js, and modern web technologies",
              "url": "https://kpatel.site",
              "image": "https://kpatel.site/og-image.png",
              "sameAs": [
                "https://github.com/kirtipatel79",
                "https://www.linkedin.com/in/kirtipatel79"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Gujarat",
                "addressCountry": "India"
              },
              "email": "kirtipatel79@outlook.com",
              "knowsAbout": [
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Tailwind CSS",
                "GraphQL",
                "Web Development",
                "Frontend Development"
              ]
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={<Loading />}>
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
            <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} KPateL All rights reserved.
            </footer>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}