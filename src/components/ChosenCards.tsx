import { Character } from "@/models/models";
import ChosenCard from "./ChosenCard";

type CountProps = {
  cards: Character[];
  count: number;
};

const ChosenCards = (props: CountProps) => {
  return (
    <div style={{ background: "rgba(0, 0, 0, .8)", borderRadius: 10 }}>
      <h1 style={{ color: "white", textAlign: "center" }}>{props.count}</h1>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          justifyContent: "center",
          padding: "1rem",
          overflow: "scroll",
        }}
      >
        {props.cards.map((char, index) => (
          <ChosenCard
            _id={char._id}
            key={index}
            name={char.name}
            race={char.race}
            realm={char.realm}
            height={char.height}
            mainAttack={char.mainAttack}
            specialAttack={char.specialAttack}
            health={char.health}
          />
        ))}
      </div>
    </div>
  );
};

export default ChosenCards;
