import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProviderComp } from "@/store/provider";
import { LayoutShell } from "@/component/layoutShell";
import { InactivityWatcher } from "@/component/inactivityWatcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Administrador",
  description: "Gestiona rifas, compras, estadísticas y más",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ProviderComp>
          <InactivityWatcher />
          <LayoutShell>{children}</LayoutShell>
        </ProviderComp>
      </body>
    </html>
  );
}
