import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Infinity Express Business | Services multiservices en RDC",
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
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
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
