import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Truthoganda — Propaganda & Rhetorical Manipulation Engine",
  description: "Forensic analysis of propaganda techniques, fear appeals, loaded language, and persuasive coercion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,600;0,700;0,800;1,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-[#fcfbf9] text-[#1c1917] antialiased selection:bg-[#991b1b] selection:text-white">
        {children}
      </body>
    </html>
  );
}
