import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const siteUrl = "https://neuronslab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Neurons Lab",
    template: "%s — Neurons Lab",
  },
  description:
    "Interactive modules for understanding brains, neural networks, and large language models.",
  keywords: [
    "neurons lab",
    "neural networks",
    "large language models",
    "transformers",
    "attention",
    "tokenization",
    "embeddings",
    "deep learning education",
  ],
  openGraph: {
    type: "website",
    siteName: "Neurons Lab",
    title: "Neurons Lab",
    description:
      "Interactive modules for understanding brains, neural networks, and large language models.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurons Lab",
    description:
      "Interactive modules for understanding brains, neural networks, and large language models.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
