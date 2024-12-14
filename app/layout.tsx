//layout.tsx

import type { Metadata } from "next";
//import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import LoaderWrapper from "./ui/LoadWrapper";

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
      <body>
        <LoaderWrapper>
          <AuthProvider>
            <ToastContainer />
            {children}
          </AuthProvider>
        </LoaderWrapper>
      </body>
    </html>
  );
}
