import Link from "next/link";
import styles from "./CharacterCard.module.css";

import { Roboto } from "next/font/google";

import { Attack, Character } from "@/models/models";
import { memo, useEffect, useState } from "react";
import CardContent from "./CardContent";

export interface CharacterProps {
  _id: string;
  name: string;
  race: string;
  realm: string;
  height: string;
  mainAttack: Attack;
  specialAttack: Attack;
  health: number;
}

type FlipCharacterProps = CharacterProps & {
  flipAll: boolean;
  updateCount: (newValue: number, card: Character) => void;
};

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
});

const CharacterCard: React.FC<FlipCharacterProps> = memo((props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(!props.flipAll);
  }, [props.flipAll]);

  const character = {
    _id: props._id,
    name: props.name,
    race: props.race,
    realm: props.realm,
    height: props.height,
    mainAttack: props.mainAttack,
    specialAttack: props.specialAttack,
    health: props.health,
  };

  return (
    <div
      // href={`character/${props.name}`}
      style={{ textDecoration: "none" }}
      className={`${styles.wrapper} ${roboto.className}`}
    >
      <div
        onClick={() => {
          if (!isFlipped) {
            setIsFlipped(true);
            props.updateCount(1, character);
          } else return;

          // if (!isFlipped) {
          //   props.updateCount(1, character);
          //   return;
          // } else {
          //   props.updateCount(-1, character);
          //   return;
          // }
        }}
        className={`${styles.card} ${roboto.className}`}
      >
        <div
          className={`${styles["card-inner"]} ${isFlipped && styles.isflipped}`}
        >
          <div
            className={`${styles["card-face"]} ${styles["card-face-front"]}`}
          ></div>
          <div className={`${styles["card-face"]} ${styles["card-face-back"]}`}>
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
        </div>
      </div>
    </div>
  );
});

export default CharacterCard;
