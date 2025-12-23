import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AccountProvider } from "@/contexts/account-context";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <Component {...pageProps} />
      <Toaster richColors position="top-right" />
    </AccountProvider>
  );
}
