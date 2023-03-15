import { Roboto } from "next/font/google";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import imageData from "../../assets/images.json";

import styles from "./FlipCard.module.css";

export interface FlipCardProps {
  _id: string;
  name: string;
  health: number;
  mainAttack: number;
  specialAttack: number;
  flipAll: boolean;
  updateCount: (newValue: number, cardId: string) => void;
}

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
});

const FlipCard: React.FC<FlipCardProps> = memo((props) => {
  const data = imageData.find((item) => item.name === props.name)!;

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(!props.flipAll);
  }, [props.flipAll]);

  const character = {
    _id: props._id,
    name: props.name,
  };

  return (
    <div
      onClick={() => {
        if (!isFlipped) {
          setIsFlipped(true);
          props.updateCount(1, character._id);
        } else return;
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
          <h3 className={styles.header}>{props.name.substring(0, 20)}</h3>
          <div className={styles["image-box"]}>
            <Image
              alt={`Picture of the ${props.name}`}
              width={400}
              height={400}
              className={styles.image}
              src={data?.imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

FlipCard.displayName = "FlipCard";

export default FlipCard;
