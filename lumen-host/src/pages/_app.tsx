import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AccountProvider } from "@/contexts/account-context";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <Head>
        <title>Lumen Financial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Toaster richColors position="top-right" />
    </AccountProvider>
  );
}
