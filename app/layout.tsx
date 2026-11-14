import type { Metadata } from 'next';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import './globals.css';
import './reference.css';
import './centering.css';
import { Shell } from '@/components/Shell';

export const metadata: Metadata = {
  title: 'LocalDoc | Private File Tools',
  description: 'Convert, edit and organize images, PDFs and Office files locally. Free, private, and nothing ever uploads.',
  applicationName: 'LocalDoc',
  icons: { icon: '/localdoc-logo.png', shortcut: '/localdoc-logo.png', apple: '/localdoc-logo.png' },
  openGraph: { title: 'LocalDoc | Private File Tools', description: 'All your file tools. Nothing leaves your device.', type: 'website', siteName: 'LocalDoc' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
