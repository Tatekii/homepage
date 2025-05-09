import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@/components/analytics';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'Personal developer portfolio with EDM aesthetics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            {/* <Navbar /> */}
            <main className="flex-grow">{children}</main>
            {/* <Footer /> */}
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}