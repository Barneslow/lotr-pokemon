import Image from "next/image";

import imageData from "../../assets/images.json";
import { CharacterCardProps } from "./ActionCard";
import {
  calculateAttackTimeRemaining,
  calculateCharacterHealth,
} from "@/helpers/fight";

import { HeartIcon, SpecialPowerIcon, SwordIcon } from "./FightCard";

import styles from "./ActionContent.module.css";
import CharacterFooterInfo from "./CharacterFooterInfo";

const ActionContent = ({ character }: CharacterCardProps) => {
  const data = imageData.find((item) => item.name === character.name)!;

  const percentage = calculateCharacterHealth(character);

  const { mainPower, specialPower } = calculateAttackTimeRemaining(character);

  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <h3 style={{ fontSize: 20 }}>{character.name}</h3>
        <HeartIcon id={character._id} percentage={percentage} stroke="black">
          <span className={styles.health}>{character.health}</span>
        </HeartIcon>
      </div>
      <div className={styles["image-box"]}>
        <Image
          alt={`Picture of the ${character.name}`}
          width={400}
          height={400}
          className={styles.image}
          src={data?.imageUrl}
        />
      </div>
      <div className={styles.row}>
        <SwordIcon id={character._id} used={mainPower} stroke="black" />
        <h5>{character.mainAttack.name}</h5>
        <h5>{character.mainAttack.value}</h5>
      </div>
      <div className={styles.row}>
        <SpecialPowerIcon
          id={character._id}
          used={specialPower}
          stroke="black"
        />
        <h5>{character.specialAttack.name}</h5>
        <h5>{character.specialAttack.value}</h5>
      </div>
      <CharacterFooterInfo character={character} />
    </div>
  );
};

export default ActionContent;
