import { Character } from "@/models/models";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { fetchCharacter, fetchCharacterQuotes } from "../api/hello";

type CharacterPageProps = {
  character: Character;
  quotes: string[];
};

interface Params extends ParsedUrlQuery {
  name: string;
}

const CharacterPage = (props: CharacterPageProps) => {
  const { character, quotes } = props;

  return (
    <div>
      <h1>Character Page</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      ></div>

      <p>{character.name}</p>
      <a target="_blank" href={character.wikiUrl}>
        Find out More
      </a>
      {quotes.map((quote, index) => (
        <p key={index}>{quote}</p>
      ))}
    </div>
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

  const character = await fetchCharacter(name);

  const quotes = await fetchCharacterQuotes(character._id);

  return {
    props: {
      character,
      quotes,
    },
  };
};

// ...
