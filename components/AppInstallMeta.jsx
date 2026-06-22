import Head from "next/head";

export default function AppInstallMeta({ slug, name, themeColor }) {
  const base = `/app-icons/${slug}`;
  return (
    <Head>
      <link rel="manifest" href={`/manifests/${slug}.webmanifest`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${base}/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="192x192" href={`${base}/icon-192.png`} />
      <link rel="icon" type="image/png" sizes="512x512" href={`${base}/icon-512.png`} />
      <meta name="theme-color" content={themeColor} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={name} />
      <meta name="application-name" content={name} />
    </Head>
  );
}
