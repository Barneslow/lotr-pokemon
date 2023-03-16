import imageJSON from "../../assets/images.json";
import Image from "next/image";
import { useContext } from "react";
import DeadOverlay from "../ui/DeadOverlay";
import { FightContext } from "@/context/FightContext";
import { Character, CharacterObjectProps } from "@/models/models";

import characterHealthData from "../../assets/data/myFile.json";

import styles from "./FightCard.module.scss";
import { isOdd } from "@/helpers/fight";
import { HeartIcon } from "../icon/CardIcons";

interface EnemyFightCardProps extends CharacterObjectProps {
  playerFightAnimation: (target: Character) => void;
}

const EnemyFightCard: React.FC<EnemyFightCardProps> = ({
  character,
  playerFightAnimation,
}) => {
  const { turn, attackingCharacter } = useContext(FightContext);
  const data = imageJSON.find((item) => item.name === character.name)!;

  const { health } = characterHealthData.find(
    (char) => char.name === character.name
  )!;

  const percentage = 100 - (character.health / health) * 100;

  return (
    <button
      disabled={isOdd(turn) || character.health <= 0 || !attackingCharacter}
      onClick={() => {
        playerFightAnimation(character);
      }}
      className={styles.card}
    >
      <div className={styles.enemy}></div>
      {character.health <= 0 && <DeadOverlay />}
      <div className={styles.header}>
        <h3>{character.name.substring(0, 20)}</h3>
      </div>{" "}
      <Image
        alt={`Picture of the ${character.name}`}
        width={400}
        height={400}
        className={styles.image}
        src={data?.imageUrl}
      />
      <div className={styles.info}>
        <HeartIcon percentage={percentage} id={character._id}>
          <span className={styles.health}>{character.health}</span>
        </HeartIcon>
      </div>
    </button>
  );
};

export default EnemyFightCard;
