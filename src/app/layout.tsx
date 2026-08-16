import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono, Anton } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { PostHogPageview } from "@/components/analytics/PostHogPageview";
import { site } from "@/content/site";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.metaDescription,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.metaDescription,
    url: site.url,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${newsreader.variable} ${inter.variable} ${plexMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <PostHogProvider>
          <PostHogPageview />
          <a
            href="#main"
            className="label sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </PostHogProvider>
      </body>
    </html>
  );
}
