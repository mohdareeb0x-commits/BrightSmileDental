import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TrackingScript } from '@/components/TrackingScript';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Free Teeth Whitening Consultation | Bright Smile Dental',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  description: 'Get a brighter smile with a free, no-obligation whitening consultation. 30 minutes, zero pressure, same-week appointments. Book your spot this month.',
  keywords: ['teeth whitening', 'dental consultation', 'cosmetic dentistry', 'free consultation', 'Austin dentist'],
  authors: [{ name: 'Bright Smile Dental' }],
  creator: 'Bright Smile Dental',
  publisher: 'Bright Smile Dental',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brightsmiledental.com',
    siteName: 'Bright Smile Dental',
    title: 'Free Teeth Whitening Consultation — This Month Only',
    description: 'Get a brighter smile with a free, no-obligation whitening consultation. 30 minutes, zero pressure, same-week appointments.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bright Smile Dental - Free Whitening Consultation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Teeth Whitening Consultation — This Month Only',
    description: 'Get a brighter smile with a free, no-obligation whitening consultation. 30 minutes, zero pressure.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D9488',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className="min-h-screen flex flex-col">
        <TrackingScript />
        {children}
      </body>
    </html>
  );
}