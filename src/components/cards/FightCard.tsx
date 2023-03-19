import imageJSON from "../../assets/images.json";
import styles from "./FightCard.module.scss";
import Image from "next/image";
import DeadOverlay from "../ui/DeadOverlay";
import { CharacterObjectProps } from "@/models/models";

import {
  calculateAttackTimeRemaining,
  calculateCharacterHealth,
} from "@/helpers/fight";
import { HeartIcon, SpecialPowerIcon, SwordIcon } from "../ui/icon/CardIcons";

export interface FightCardProps extends CharacterObjectProps {
  onClick: () => void;
}

const FightCard: React.FC<FightCardProps> = ({ character, onClick }) => {
  const data = imageJSON.find((item) => item.name === character.name)!;

  const percentage = calculateCharacterHealth(character);

  const { mainPower, specialPower } = calculateAttackTimeRemaining(character);

  return (
    <>
      <div onClick={onClick} className={styles.card}>
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
          <SwordIcon id={character._id} used={mainPower} />
          <SpecialPowerIcon id={character._id} used={specialPower} />
        </div>
      </div>
    </>
  );
};

export default FightCard;
