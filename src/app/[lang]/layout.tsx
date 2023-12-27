import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crossword Puzzle Generator",
  description: "Generate a crossword puzzle from a list of questions",
};

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    lang: string
  }
}) {
  console.log(params);
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
