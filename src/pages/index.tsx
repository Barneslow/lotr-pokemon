import Head from "next/head";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { fetchAllCharacters } from "./api/hello";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Character } from "@/models/models";
import { motion } from "framer-motion";

import styles from "./index.module.css";
import { shuffleArray } from "@/helpers/arrays";
import FlipCard from "@/components/cards/FlipCard";
import Fight from "@/components/fight/Fight";
import { FightContext } from "@/context/FightContext";
import DeckNavigation from "@/components/deck/DeckNavigation";

const msPlus = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Home() {
  const [searchField, setSearchField] = useState("");
  const { updateTeam, team, setEnemyTeam, count, setCount, characters } =
    useContext(FightContext);
  const [flipAll, setFlipAll] = useState(true);
  const [isFighting, setIsFighting] = useState(false);

  const [filteredCharacters, setFilteredCharacters] =
    useState<Character[]>(characters);

  const updateCount = useCallback(
    (newValue: number, cardId: string): void => {
      setCount((prev) => (prev += newValue));

      const card = characters.find((item) => item._id === cardId)!;

      updateTeam({ ...card });
    },
    [setCount, characters]
  );

  const container = {
    initial: {},
    animate: { transition: { staggerChildren: 0.05 } },
  };

  const child = {
    initial: { scale: 0, opacity: 0, y: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "spring", bounce: 0.3 },
    },
  };

  useEffect(() => {
    shuffleArray(characters);
  }, [characters]);

  useEffect(() => {
    if (count >= 5) {
      setIsFighting(true);

      const chosenIds = team.map((card) => card._id);
      const rival = characters.filter((char) => !chosenIds.includes(char._id));

      setEnemyTeam(rival);
    }
  }, [count, characters]);

  // useEffect(() => {
  //   const chosenCardsIds = chosenCards.map((card) => card._id);
  //   setCharacters((prev) =>
  //     prev.filter((character) => !chosenCardsIds.includes(character._id))
  //   );
  // }, [count]);

  // useEffect(() => {
  //   async function initiaDataFetch() {
  //     try {
  //       const data = await fetchAllCharacters();

  //       setCharacters(data);
  //       saveJSONToFile(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   initiaDataFetch();
  // }, []);

  useEffect(() => {
    const newFilteredCharacters = characters.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchField) ||
        character.race.toLowerCase().includes(searchField)
      );
    });

    setFilteredCharacters(newFilteredCharacters);
  }, [characters, searchField]);

  // function filterCharacters(e: ChangeEvent<HTMLInputElement>): void {
  //   const searchFieldString = e.target.value.toLocaleLowerCase();

  //   setSearchField(searchFieldString);
  // }

  return (
    <>
      <Head>
        <title>LOTR-Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.background} ${msPlus.className}`}>
        {/* <input onChange={filterCharacters} />
        <button className={styles.btn} onClick={() => setFlipAll(!flipAll)}>
          Flip All
        </button> */}
        {isFighting ? (
          <Fight setIsFighting={setIsFighting} />
        ) : (
          <>
            <DeckNavigation />
            <div className={styles.heading}>
              <h1>LOTR POKEMON</h1>
              <h2>Fight to win cards!</h2>
            </div>
            <motion.div
              variants={container}
              initial="initial"
              animate="animate"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {filteredCharacters.map((character) => (
                <motion.div variants={child} key={character._id}>
                  <FlipCard
                    name={character.name}
                    _id={character._id}
                    updateCount={updateCount}
                    flipAll={flipAll}
                    health={character.health}
                    mainAttack={character.mainAttack.value}
                    specialAttack={character.specialAttack.value}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </main>
    </>
  );
}
