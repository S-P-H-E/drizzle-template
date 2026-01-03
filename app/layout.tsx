import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drizzle",
  description: "Next.js + Drizzle + Neon DB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
