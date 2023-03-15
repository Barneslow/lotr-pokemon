import { Character } from "@/models/models";
import { createContext, ReactNode, useState } from "react";

import { DUMMY_TEAM } from "@/components/ui/DummyEnemies";

interface IDeckContext {
  deck: Character[] | [];
  updateDeck: (character: Character) => void;
}

const defaultState = {
  deck: [],
  updateDeck: () => {},
};

export const DeckContext = createContext<IDeckContext>(defaultState);

type Props = {
  children?: ReactNode;
};

export const DeckContextProvider = ({ children }: Props) => {
  const [deck, setDeck] = useState<Character[]>([]);

  function updateDeck(character: Character) {
    setDeck((prev) => [...prev, character]);
  }

  const value = {
    deck,
    updateDeck,
  };

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
};

export default DeckContextProvider;
