import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Roboto, Noto_Sans } from 'next/font/google';
import { Footer, Header } from '@/components/frame';
import '../styles/globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Ollin's Portfolio",
  description: 'Next.js Project Portfolio',
  openGraph: {
    title: "Ollin's Portfolio",
    description: 'Next.js Project Portfolio',
    images: [
      {
        url: '/images/profile_1.png',
        width: 1200,
        height: 630,
        alt: "Ollin's Portfolio Thumbnail",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ollin's Portfolio",
    description: 'Next.js Project Portfolio',
    images: ['/images/profile_1.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        {/* 파비콘 설정 */}
        <link rel='icon' href='/images/favicon.ico' />
      </head>
      <body className={`${roboto.variable} ${notoSans.variable}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
