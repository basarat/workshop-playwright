import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./todomvc.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo MVC",
  description: "Sample Todo MVC App for BooleanArt Playwright workshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
