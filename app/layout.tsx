import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maximus",
  description: "Azmain Morshed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Maximus</title>
        <meta name="description" content="Azmain Morshed" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/logo_s.png" type="image/png" />
      </head>
      <body
      >
        {children}
      </body>
    </html>
  );
}
