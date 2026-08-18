import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ProviderComp } from "@/store/provider";
import { LayoutShell } from "@/component/layoutShell";
import { InactivityWatcher } from "@/component/inactivityWatcher";

// Antes se descargaban Geist Y Geist Mono y globals.css las anulaba con
// `font-family: Arial`: se pagaba la descarga de dos fuentes invisibles.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Administrador",
  description: "Gestiona rifas, compras, estadísticas y más",
  // El panel de administración no debe indexarse en buscadores.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`dark ${geistSans.variable}`}>
      <body>
        <ProviderComp>
          <InactivityWatcher />
          <LayoutShell>{children}</LayoutShell>
        </ProviderComp>
      </body>
    </html>
  );
}
