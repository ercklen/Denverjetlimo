import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Denver Jet Limo | Luxury Airport Transportation Denver",
  description: "Premium private airport transportation from Denver International Airport (DEN) to destinations throughout Denver and Colorado. Luxury SUVs, Executive Jet Sprinters, and premium sedans.",
  keywords: ["Denver airport transportation", "luxury car service Denver", "private transfer DEN", "Vail transportation", "Aspen car service", "Colorado executive transport", "Denver Jet Limo"],
  authors: [{ name: "Denver Jet Limo" }],
  creator: "Denver Jet Limo",
  publisher: "Denver Jet Limo",
  metadataBase: new URL("https://denverjetlimo.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Denver Jet Limo | Luxury Airport Transportation",
    description: "Premium private airport transportation from Denver International Airport. Serving Denver, Vail, Aspen, and all of Colorado.",
    url: "https://denverjetlimo.com/",
    siteName: "Denver Jet Limo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 1024,
        alt: "Denver Jet Limo - Luxury Airport Transportation Denver",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denver Jet Limo | Luxury Airport Transportation",
    description: "Premium private airport transportation from Denver International Airport.",
    creator: "@DenverJetLimo",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
