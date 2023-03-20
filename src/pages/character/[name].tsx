import { motion } from "framer-motion";

import Layout from "@/components/Layout/Layout";
import Quote from "@/components/Quote";
import { Character } from "@/models/models";
import { GetStaticPaths, GetStaticProps } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import imageData from "../../assets/images.json";

import { ParsedUrlQuery } from "querystring";
import { fetchCharacter, fetchCharacterQuotes } from "../api/hello";

import styles from "./CharacterPage.module.css";
import Image from "next/image";
import CharacterInfo from "@/components/CharacterInfo";

const msPlus = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

type CharacterPageProps = {
  character: Character;
  quotes: string[];
  imageUrl: string;
};

interface Params extends ParsedUrlQuery {
  name: string;
}

const CharacterPage = ({ character, quotes, imageUrl }: CharacterPageProps) => {
  return (
    <Layout>
      <main className={`${styles.background} ${msPlus.className}`}>
        <div className={styles.container}>
          <div className={styles["image-box"]}>
            <Image
              className={styles.image}
              width={1000}
              height={1000}
              src={imageUrl}
              alt={`Picture of ${character.name}`}
            />
          </div>
          <h1>{character.name}</h1>
          <CharacterInfo character={character} />
          <div className={styles.quotes}>
            {quotes.map((quote, index) => (
              <Quote key={index} quote={quote} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CharacterPage;

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  CharacterPageProps,
  Params
> = async (context) => {
  const { name } = context.params!;

  const { imageUrl } = imageData.find((char) => char.name === name)!;

  const character = await fetchCharacter(name);

  const quotes = await fetchCharacterQuotes(character._id);

  return {
    props: {
      character,
      quotes,
      imageUrl,
    },
  };
};

// ...
