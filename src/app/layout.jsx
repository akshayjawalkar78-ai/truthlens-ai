export const metadata = {
  title: "FirstFile — Your first tax return. A clearer first step.",
  description: "FirstFile helps teens and first-time filers understand taxes through friendly learning tools, sample forms, checklists, and official resources.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-[#FAF9F6]">
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-primary-500/20 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
