import DeckContextProvider from "@/context/DeckContext";
import FightContextProvider from "@/context/FightContext";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FightContextProvider>
      <DeckContextProvider>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} />
        </AnimatePresence>
      </DeckContextProvider>
    </FightContextProvider>
  );
}
