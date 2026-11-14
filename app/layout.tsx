import type { Metadata } from 'next';
import './globals.css';
import { Shell } from '@/components/Shell';

export const metadata: Metadata = {
  title: 'LocalDoc — Private file tools, right in your browser',
  description: 'Convert, edit and organize images, PDFs and Office files locally. Free, private, and nothing ever uploads.',
  applicationName: 'LocalDoc',
  openGraph: { title: 'LocalDoc — Private file tools', description: 'All your file tools. Nothing leaves your device.', type: 'website', siteName: 'LocalDoc' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
