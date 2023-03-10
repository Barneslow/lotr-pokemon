import DeckContextProvider from "@/context/DeckContext";
import FightContextProvider from "@/context/FightContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FightContextProvider>
      <DeckContextProvider>
        <Component {...pageProps} />
      </DeckContextProvider>
    </FightContextProvider>
  );
}
