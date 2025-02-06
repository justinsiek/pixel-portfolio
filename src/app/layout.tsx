import "./globals.css";
import { pixelify } from '@/components/fonts'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixelify.variable}`}>
      <body className={`antialiased font-pixel`}>{children}</body>
    </html>
  );
}
