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

  reset: () => void;
  turn: number;
  updateTeam: (character: Character) => void;
  changeTurn: () => void;
  setEnemyTeam: (array: Character[]) => void;
  setCount: Dispatch<SetStateAction<number>>;
  characters: Character[];
  attackingCharacter: AttackingCharacter | undefined;
  updateAttackingCharacter: (attack: AttackingCharacter | undefined) => void;
}

const defaultState = {
  enemy: [],
  team: [],
  characters: [],
  count: 0,
  //   chosenAttack: { name: "null", value: 0 },
  //   enemySpecial: 3,
  //   teamSpecial: 3,
  reset: () => {},
  turn: 0,
  changeTurn: () => {},
  updateTeam: (character: Character) => {},
  setEnemyTeam: (array: Character[]) => {},
  setCount: () => {},
};

export const FightContext = createContext<IFightContext>(defaultState);

type Props = {
  children?: ReactNode;
};

export const FightContextProvider = ({ children }: Props) => {
  const [team, setTeam] = useState<Character[]>([]);
  const [enemy, setEnemy] = useState<Character[]>([]);
  const [attackingCharacter, setAttackingCharacter] = useState<
    AttackingCharacter | undefined
  >();
  const [characters, setCharacters] = useState<Character[]>(
    DUMMY_DATA as Character[]
  );

  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState(0);

  function updateTeam(character: Character) {
    setTeam((prev) => [...prev, character]);
  }

  function updateAttackingCharacter(
    newCharacter: AttackingCharacter | undefined
  ) {
    setAttackingCharacter(newCharacter);
  }

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
    attackingCharacter,
    updateAttackingCharacter,
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
