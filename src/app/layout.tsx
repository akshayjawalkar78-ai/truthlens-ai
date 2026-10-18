import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verity — Look Beyond the Headline",
  description: "Media Literacy, Bias, and Propaganda Detection Assistant for the Congressional App Challenge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
