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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6763ba8349e2fd8dfefa26df/1ifep15b2';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
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
