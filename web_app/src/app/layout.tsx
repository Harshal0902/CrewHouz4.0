import './globals.css'
import { cn, constructMetadata } from '@/lib/utils'
import ScrollToTopBtn from '@/components/ScrollToTopBtn'
import Providers from '@/app/_provider/Providers'
import { Toaster } from '@/components/ui/sonner'

export const metadata = constructMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased font-sansSerif')}>
        <Providers>
          <main>
            {children}
          </main>
          <ScrollToTopBtn />
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
