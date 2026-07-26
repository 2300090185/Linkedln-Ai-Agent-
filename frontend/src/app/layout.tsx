import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexusAI - AI Content Intelligence Platform",
  description: "Enterprise AI Content Intelligence Platform powered by Gemini 2.5 Flash",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
