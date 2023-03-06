import Head from "next/head";
import { Varela_Round } from "next/font/google";
import { fetchAllCharacters } from "./api/hello";
import { ChangeEvent, useEffect, useState } from "react";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/models/models";

const varela = Varela_Round({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  const [searchField, setSearchField] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] =
    useState<Character[]>(characters);

  useEffect(() => {
    async function initiaDataFetch() {
      try {
        const data = await fetchAllCharacters();

        setCharacters(data);
      } catch (error) {
        console.log(error);
      }
    }
    initiaDataFetch();
  }, []);

  useEffect(() => {
    const newFilteredCharacters = characters.filter((character) => {
      return character.name.toLowerCase().includes(searchField);
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
      <main className="background" style={{ maxWidth: "100vw" }}>
        <input onChange={filterCharacters} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {filteredCharacters.map((character, index) => (
            <CharacterCard
              key={index}
              name={character.name}
              race={character.race}
              realm={character.realm}
              height={character.height}
            />
          ))}
        </div>
      </main>
    </>
  );
}
