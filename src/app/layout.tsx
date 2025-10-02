import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iglesia Cristiana - Bienvenidos",
  description: "Somos una comunidad cristiana comprometida con el amor de Dios y el servicio al prójimo. Únete a nosotros en adoración, crecimiento espiritual y servicio comunitario.",
  keywords: "iglesia, cristiana, comunidad, fe, adoración, ministerios, eventos, predicaciones",
  authors: [{ name: "Iglesia Cristiana" }],
  creator: "Iglesia Cristiana",
  publisher: "Iglesia Cristiana",
  openGraph: {
    title: "Iglesia Cristiana - Bienvenidos",
    description: "Somos una comunidad cristiana comprometida con el amor de Dios y el servicio al prójimo.",
    type: "website",
    locale: "es_ES",
    siteName: "Iglesia Cristiana",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iglesia Cristiana - Bienvenidos",
    description: "Somos una comunidad cristiana comprometida con el amor de Dios y el servicio al prójimo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
