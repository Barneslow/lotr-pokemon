import { Character } from "@/models/models";
import CharacterCard from "./CharacterCard";

type CountProps = {
  cards: Character[];
  count: number;
};

const ChosenCards = (props: CountProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        width: "100%",
        justifyContent: "center",
        padding: "1rem",
        // overflow: "scroll",
      }}
    >
      {props.cards.map((char, index) => (
        <CharacterCard key={index} character={char} />
      ))}
    </div>
  );
};

export default ChosenCards;
