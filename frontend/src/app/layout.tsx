import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { QueryProvider, ThemeProvider, ToastProvider } from "@/providers";
import { Navbar } from "@/shared/components/layout/navbar";
import { Footer } from "@/shared/components/layout/footer";
import { SITE } from "@/constants";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} flex min-h-screen flex-col antialiased`}>
        <ThemeProvider>
          <QueryProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ToastProvider />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
