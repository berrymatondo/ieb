import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Infinity Express Business | Services Multiservices RDC",
  description:
    "IEB - Entreprise de services polyvalente à Lubumbashi, RDC. Nettoyage industriel, services administratifs, facilitation pour entreprises minières.",
  generator: "v0.app",
  keywords: [
    "services",
    "nettoyage",
    "mines",
    "Lubumbashi",
    "RDC",
    "administratif",
    "ARSP",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
