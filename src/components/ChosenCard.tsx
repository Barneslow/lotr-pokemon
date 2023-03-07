import { Roboto } from "next/font/google";
import CardContent from "./CardContent";
import { CharacterProps } from "./CharacterCard";

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
});

const ChosenCard = (props: CharacterProps) => {
  return (
    <div
      style={{
        background: "lightgrey",
        padding: ".5rem",
        borderRadius: 10,
        fontSize: 12,
      }}
      className={roboto.className}
    >
      <CardContent
        _id={props._id}
        name={props.name}
        race={props.race}
        realm={props.realm}
        height={props.height}
        mainAttack={props.mainAttack}
        specialAttack={props.specialAttack}
        health={props.health}
      />
    </div>
  );
};

export default ChosenCard;
