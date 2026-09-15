import Head from "next/head";
import { useRouter } from "next/router";

const PUBLIC_ORIGIN = "https://whitegwireless.com";

function canonicalPath(asPath) {
  const pathname = (asPath || "/").split("?")[0].split("#")[0] || "/";
  return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
}

export default function WhiteGloveApp({ Component, pageProps }) {
  const router = useRouter();
  const path = canonicalPath(router.asPath);
  const isPrivateRoute = path.startsWith("/admin");

  return (
    <>
      <Head>
        <link key="canonical" rel="canonical" href={`${PUBLIC_ORIGIN}${path}`} />
        {isPrivateRoute && <meta name="robots" content="noindex, nofollow" />}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
