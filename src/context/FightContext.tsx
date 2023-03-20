import { DUMMY_ENEMY, DUMMY_TEAM } from "@/components/ui/DummyEnemies";
import { randomFiveFromArray } from "@/helpers/arrays";
import { AttackingCharacter, Character } from "@/models/models";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import DUMMY_DATA from "../assets/data/myFile.json";

interface IFightContext {
  enemy: Character[] | [];
  team: Character[] | [];
  count: number;
  turn: number;
  characters: Character[];
  // attackingCharacter: AttackingCharacter | undefined;
  // updateAttackingCharacter: (attack: AttackingCharacter | undefined) => void;
  updateTeam: (character: Character) => void;
  setEnemyTeam: (array: Character[]) => void;
  setCount: Dispatch<SetStateAction<number>>;
  changeTurn: () => void;
  reset: () => void;
}

const defaultState: IFightContext = {
  enemy: [],
  team: [],
  characters: [],
  count: 0,
  turn: 0,
  // attackingCharacter: {},
  // updateAttackingCharacter: (character: AttackingCharacter | undefined) => {},
  updateTeam: (character: Character) => {},
  setEnemyTeam: (array: Character[]) => {},
  setCount: () => {},
  changeTurn: () => {},
  reset: () => {},
};

export const FightContext = createContext<IFightContext>(defaultState);

type Props = {
  children?: ReactNode;
};

export const FightContextProvider = ({ children }: Props) => {
  const [team, setTeam] = useState<Character[]>([]);
  const [enemy, setEnemy] = useState<Character[]>([]);
  // const [attackingCharacter, setAttackingCharacter] = useState<
  //   AttackingCharacter | undefined
  // >();
  const [characters, setCharacters] = useState<Character[]>(
    DUMMY_DATA as Character[]
  );

  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState(0);

  function updateTeam(character: Character) {
    setTeam((prev) => [...prev, character]);
  }

  // function updateAttackingCharacter(
  //   newCharacter: AttackingCharacter | undefined
  // ) {
  //   setAttackingCharacter(newCharacter);
  // }

  function setEnemyTeam(rival: Character[]) {
    const randomEnemies = randomFiveFromArray(rival);

    const duplicateEnemies = randomEnemies.map((char) => {
      const newChar = { ...char };
      return newChar;
    });

    setEnemy(duplicateEnemies);
  }

  function reset() {
    setEnemy([]);
    setTeam([]);
    setCount(0);

    setCharacters(DUMMY_DATA);
  }

  function changeTurn() {
    setTurn((prev) => prev + 1);
  }
  const value = {
    enemy,
    team,
    setEnemyTeam,
    count,
    setCount,
    reset,
    changeTurn,
    turn,
    updateTeam,
    characters,
  };
  return (
    <FightContext.Provider value={value}>{children}</FightContext.Provider>
  );
};

export default FightContextProvider;
