import imageJSON from "../../../assets/images.json";
import Image from "next/image";
import DeadOverlay from "../../ui/DeadOverlay";
import { CharacterObjectProps } from "@/models/models";

import characterHealthData from "../../../assets/data/myFile.json";

import styles from "../FightCard.module.scss";
import { HeartIcon } from "../../ui/icon/CardIcons";

const EnemyFightCard: React.FC<CharacterObjectProps> = ({ character }) => {
  const data = imageJSON.find((item) => item.name === character.name)!;

  const { health } = characterHealthData.find(
    (char) => char.name === character.name
  )!;

  const percentage = 100 - (character.health / health) * 100;

  return (
    <div className={styles.card}>
      <div className={styles.enemy}></div>
      {character.health <= 0 && <DeadOverlay />}
      <div className={styles.header}>
        <h3>{character.name.substring(0, 20)}</h3>
      </div>
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
    </div>
  );
};

export default EnemyFightCard;
