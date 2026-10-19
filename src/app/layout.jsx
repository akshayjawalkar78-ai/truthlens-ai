export const metadata = {
  title: "FirstFile — Your First Tax Return, Simplified",
  description: "Free, teen-first tax education platform helping student workers and first-time filers understand tax withholding and build their filing readiness checklist.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
