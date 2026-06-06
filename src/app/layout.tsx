import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://heartsutra.app"),
  title: "般若心経 - Heart Sutra | Buddhist Scripture",
  description: "Read the Heart Sutra (般若心経) with vertical Japanese text, accurate furigana annotations, and English translations. Perfect for spiritual practice, study, and meditation.",
  manifest: "/manifest.json",
  keywords: [
    "般若心経",
    "心経",
    "Heart Sutra",
    "Buddhist scripture",
    "Buddhism",
    "経典",
    "仏教",
    "瞑想",
    "meditation",
  ],
  authors: [{ name: "Buddhist Community" }],
  creator: "Buddhist Community",
  publisher: "Buddhist Community",
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
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://heartsutra.app",
    siteName: "般若心経 - Heart Sutra",
    title: "般若心経 - Heart Sutra",
    description:
      "Traditional Buddhist Heart Sutra with vertical Japanese text, accurate furigana, and English translations.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "般若心経 Heart Sutra App Icon",
        type: "image/png",
      },
      {
        url: "/icon-192.png",
        width: 192,
        height: 192,
        alt: "Heart Sutra Icon",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "般若心経 - Heart Sutra",
    description: "Read the Heart Sutra with vertical Japanese text and translations",
    images: ["/icon-512.png"],
    creator: "@heartsutra",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "般若心経",
    startupImage: "/icon-512.png",
  },
  formatDetection: {
    telephone: false,
    email: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#2d3748",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#2d3748",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://heartsutra.app/#website",
        url: "https://heartsutra.app",
        name: "般若心経 - Heart Sutra",
        description:
          "Traditional Buddhist Heart Sutra with vertical Japanese text and translations",
        inLanguage: "ja",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://heartsutra.app/?search={search_term_string}",
          },
          query_input: "required name=search_term_string",
        },
      },
      {
        "@type": "CreativeWork",
        "@id": "https://heartsutra.app/#creativework",
        url: "https://heartsutra.app",
        name: "般若心経 (Heart Sutra)",
        description:
          "The Heart Sutra is one of the most important texts in Mahayana Buddhism, presenting the essence of Buddhist wisdom in concise form.",
        inLanguage: "ja",
        author: {
          "@type": "Organization",
          name: "Buddhist Community",
        },
        about: {
          "@type": "Thing",
          name: "Buddhism",
          url: "https://en.wikipedia.org/wiki/Buddhism",
        },
        genre: [
          "Religion",
          "Philosophy",
          "Buddhist Scripture",
          "Spiritual Practice",
        ],
        datePublished: "2025-06-07",
        dateModified: new Date().toISOString().split("T")[0],
        image: {
          "@type": "ImageObject",
          url: "https://heartsutra.app/icon-512.png",
          width: 512,
          height: 512,
        },
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://heartsutra.app/#organization",
        name: "Heart Sutra Reader",
        url: "https://heartsutra.app",
        logo: {
          "@type": "ImageObject",
          url: "https://heartsutra.app/icon-512.png",
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://en.wikipedia.org/wiki/Heart_Sutra",
          "https://en.wikipedia.org/wiki/Buddhism",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://heartsutra.app/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://heartsutra.app",
          },
        ],
      },
    ],
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <meta name="theme-color" content="#2d3748" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(() => {
                  // Service worker registration failed, app will work without offline support
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
