import type { Metadata } from "next";
import "./globals.css";
import { getProfile, getSettings } from "@/lib/queries";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";

export async function generateMetadata(): Promise<Metadata> {
  const [profile, settings] = await Promise.all([getProfile(), getSettings()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    metadataBase: new URL(siteUrl),
    title: settings.site_title,
    description: settings.meta_description,
    alternates: { canonical: "/" },
    openGraph: {
      title: settings.site_title,
      description: settings.meta_description,
      url: siteUrl,
      siteName: profile.name,
      type: "website",
      images: profile.profile_image_url ? [{ url: profile.profile_image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.site_title,
      description: settings.meta_description,
    },
  };
}

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [profile, settings] = await Promise.all([getProfile(), getSettings()]);

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    address: profile.location,
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
    sameAs: [`https://github.com/${profile.github}`].filter(Boolean),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.site_title,
    description: settings.meta_description,
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton whatsapp={profile.whatsapp} name={profile.name} />
        {settings.chatbot_enabled && <Chatbot />}
      </body>
    </html>
  );
}
