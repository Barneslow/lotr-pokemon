import Image from "next/image";

import imageData from "../../assets/images.json";
import { CharacterCardProps } from "./ActionCard";
import {
  calculateAttackTimeRemaining,
  calculateCharacterHealth,
} from "@/helpers/fight";

import styles from "./ActionContent.module.css";
import CharacterFooterInfo from "./CharacterFooterInfo";
import { HeartIcon, SpecialPowerIcon, SwordIcon } from "../icon/CardIcons";
import { useContext } from "react";
import { FightContext } from "@/context/FightContext";

const ActionContent = ({ character }: CharacterCardProps) => {
  const data = imageData.find((item) => item.name === character.name)!;
  const { attackingCharacter, updateAttackingCharacter } =
    useContext(FightContext);

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
      <div
        className={`${styles.row} ${
          character.mainAttack.disabledTurns > 0 && styles.disabled
        } ${
          attackingCharacter?.attack === character.mainAttack &&
          styles["selected-attack"]
        } `}
        onClick={() =>
          updateAttackingCharacter({
            attack: character.mainAttack,
            name: character.name,
          })
        }
      >
        <SwordIcon id={character._id} used={mainPower} stroke="black" />
        <h5>{character.mainAttack.name}</h5>
        <h5>{character.mainAttack.value}</h5>
      </div>
      <div
        onClick={() =>
          updateAttackingCharacter({
            attack: character.specialAttack,
            name: character.name,
          })
        }
        className={`${styles.row} ${
          character.specialAttack.disabledTurns > 0 && styles.disabled
        } ${
          attackingCharacter?.attack === character.specialAttack &&
          styles["selected-attack"]
        } `}
      >
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
