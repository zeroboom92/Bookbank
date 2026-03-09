import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookbank',
  description: '온라인 독서통장 v0.1'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
