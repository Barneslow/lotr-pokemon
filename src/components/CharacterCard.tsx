import Link from "next/link";
import styles from "./CharacterCard.module.css";

import { Roboto } from "next/font/google";

import { Attack } from "@/models/models";
import { useEffect, useState } from "react";
import CardContent from "./CardContent";

export interface CharacterProps {
  _id?: string;
  name: string;
  race: string;
  realm: string;
  height: string;
  mainAttack: Attack;
  specialAttack: Attack;
  health: number;
}

type FlipCharacterProps = CharacterProps & { flipAll: boolean };

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
});

const CharacterCard = (props: FlipCharacterProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(!props.flipAll);
  }, [props.flipAll]);

  return (
    // <Link
    //   href={`character/${props.name}`}
    //   style={{ textDecoration: "none" }}
    //   className={`${styles.wrapper} ${roboto.className}`}
    // >
    <div
      onClick={() => setIsFlipped(!isFlipped)}
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
    // </Link>
  );
};

{
  /* <h4 style={{ fontWeight: 100, margin: 5 }}>{props.race}</h4> */
}

export default CharacterCard;
