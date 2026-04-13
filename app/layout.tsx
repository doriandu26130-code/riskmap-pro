import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RiskMap Pro',
  description: 'Plateforme SaaS pour les courtiers en assurance en France'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
