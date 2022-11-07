import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
function MyApp({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AnimatePresence exitBeforeEnter initial={false}>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
    </SessionProvider>
  );
}

export default MyApp;
