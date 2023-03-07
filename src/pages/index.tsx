import Head from "next/head";
import { Varela_Round } from "next/font/google";
import { fetchAllCharacters } from "./api/hello";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/models/models";
import DUMMY_DATA from "../assets/data/myFile.json";
import { motion } from "framer-motion";

import styles from "./index.module.css";
import { randomFiveFromArray, shuffleArray } from "@/helpers/arrays";
import ChosenCards from "@/components/ChosenCards";
import ChosenCard from "@/components/ChosenCard";
import FlipCard from "@/components/FlipCard";

const varela = Varela_Round({ weight: ["400"], subsets: ["latin"] });

// function saveJSONToFile(jsonData) {
//   const blob = new Blob([JSON.stringify(jsonData)], {
//     type: "application/json",
//   });
//   saveAs(blob, "myFile.json");
// }

export default function Home() {
  const [searchField, setSearchField] = useState("");
  const [flipAll, setFlipAll] = useState(true);
  const [fight, setFight] = useState(false);
  const [enemy, setEnemy] = useState<Character[]>([]);
  const [count, setCount] = useState(0);
  const [chosenCards, setChosenCards] = useState<Character[]>([]);
  const [characters, setCharacters] = useState<Character[]>(
    DUMMY_DATA as Character[]
  );
  const [filteredCharacters, setFilteredCharacters] =
    useState<Character[]>(characters);

  const updateCount = useCallback(
    (newValue: number, cardId: string): void => {
      setCount((prev) => (prev += newValue));

      const card = characters.find((item) => item._id === cardId)!;

      setChosenCards((prev) => [...prev, card]);
    },
    [setCount, setChosenCards, characters]
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
      setFight(true);

      const chosenIds = chosenCards.map((card) => card._id);
      const rival = characters.filter((char) => !chosenIds.includes(char._id));

      setEnemy(randomFiveFromArray(rival));
    }
  }, [count, characters, chosenCards]);

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

  function filterCharacters(e: ChangeEvent<HTMLInputElement>): void {
    const searchFieldString = e.target.value.toLocaleLowerCase();

    setSearchField(searchFieldString);
  }

  return (
    <>
      <Head>
        <title>LOTR-Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.background}>
        <input onChange={filterCharacters} />
        <button className={styles.btn} onClick={() => setFlipAll(!flipAll)}>
          Flip All
        </button>
        <ChosenCards count={count} cards={chosenCards} />
        {fight ? (
          <>
            <motion.div
              variants={container}
              initial="initial"
              animate="animate"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {enemy.map((character) => (
                <motion.div variants={child} key={character._id}>
                  <ChosenCard
                    _id={character._id}
                    name={character.name}
                    race={character.race}
                    realm={character.realm}
                    height={character.height}
                    mainAttack={character.mainAttack}
                    specialAttack={character.specialAttack}
                    health={character.health}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
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
                {/* <CharacterCard
                  _id={character._id}
                  flipAll={flipAll}
                  key={character._id}
                  name={character.name}
                  race={character.race}
                  realm={character.realm}
                  height={character.height}
                  mainAttack={character.mainAttack}
                  specialAttack={character.specialAttack}
                  health={character.health}
                  updateCount={updateCount}
                /> */}
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
        )}
      </main>
    </>
  );
}
