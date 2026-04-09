import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aashir Ahmed — Senior Web Developer',
  description:
    'Senior Web Developer with 3+ years and 400+ delivered websites. Specializing in WordPress, Shopify, API integrations, and SEO optimization.',
  keywords: [
    'Senior Web Developer',
    'WordPress Developer',
    'Shopify Developer',
    'Frontend Developer',
    'SEO',
    'Karachi',
    'Pakistan',
    'Aashir Ahmed',
  ],
  authors: [{ name: 'Aashir Ahmed' }],
  openGraph: {
    title: 'Aashir Ahmed — Senior Web Developer',
    description: '400+ websites delivered. WordPress, Shopify, SEO & API integrations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
