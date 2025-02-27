import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TrpcProvider from '@web/providers/trpc-provider';
import { Disclosure } from '@headlessui/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ice Breaker',
  description:
    'Start a conversation with anyone by learning about their interests',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        suppressHydrationWarning
      >
        <TrpcProvider>
          <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between"></div>
              </div>
            </Disclosure>
            {children}
          </div>
        </TrpcProvider>
      </body>
    </html>
  );
}
