import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { ContentOverrideProvider } from "@/components/providers/content-provider";
import { portfolio } from "@/config/portfolio";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

const { siteUrl, author, metadata: meta, social, jsonLd: ld } = portfolio;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: meta.defaultTitle,
    template: meta.titleTemplate,
  },
  description: meta.description,
  keywords: [...meta.keywords],
  authors: [{ name: author.displayName, url: siteUrl }],
  creator: author.displayName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: meta.siteName,
    title: meta.defaultTitle,
    description: meta.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.defaultTitle,
    description: meta.ogDescription,
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: author.displayName,
  // Full legal name as used in press coverage, so search engines connect both names.
  alternateName: ["Carlos Iván Ibarra Pacheco", "Iván Ibarra Pacheco"],
  birthPlace: {
    "@type": "Place",
    name: "León, Guanajuato, Mexico",
  },
  jobTitle: author.jobTitle,
  description: author.shortBio,
  url: siteUrl,
  image: `${siteUrl}/profile-photo.jpg`,
  sameAs: [social.github, social.linkedin, social.instagram, social.tiktok],
  email: author.email,
  knowsAbout: [...ld.knowsAbout],
  alumniOf: ld.alumniOf.map((name) => ({
    "@type": "EducationalOrganization",
    name,
  })),
  worksFor: {
    "@type": "Organization",
    name: author.currentEmployer,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');else if(t==='dark')document.documentElement.classList.add('dark');var l=localStorage.getItem('lang');if(l==='es')document.documentElement.lang='es'}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-medium focus:outline-none"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <ContentOverrideProvider overrides={{}}>
              {children}
            </ContentOverrideProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
