import { motion } from "framer-motion";
import styles from "./ActionCard.module.css";
import { AttackingCharacter, Character } from "@/models/models";
import DeadOverlay from "../ui/DeadOverlay";
import {
  calculateAttackTimeRemaining,
  calculateCharacterHealth,
} from "@/helpers/fight";
import { FightContext } from "@/context/FightContext";
import { useContext } from "react";

import imageData from "../../assets/images.json";
import { HeartIcon, SpecialPowerIcon, SwordIcon } from "../ui/icon/CardIcons";
import Image from "next/image";
import CharacterFooterInfo from "./CharacterFooterInfo";

export interface CharacterCardProps {
  character: Character;
  stroke?: string;
  attackingCharacter?: AttackingCharacter | undefined;
}

interface ActionCharacterProps extends CharacterCardProps {
  fight: (attackingCharacter: AttackingCharacter) => {};
}

const ActionCard: React.FC<ActionCharacterProps> = ({
  character,
  stroke,
  fight,
}) => {
  const data = imageData.find((item) => item.name === character.name)!;

  const percentage = calculateCharacterHealth(character);

  const { mainPower, specialPower } = calculateAttackTimeRemaining(character);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textDecoration: "none", border: stroke }}
      className={styles.card}
    >
      {character.health <= 0 && <DeadOverlay />}
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3>{character.name}</h3>
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
        <button
          disabled={character.mainAttack.disabledTurns > 0}
          className={`${styles.row} ${
            character.mainAttack.disabledTurns > 0 && styles.disabled
          }`}
          onClick={() =>
            fight({
              attack: character.mainAttack,
              name: character.name,
            })
          }
        >
          <SwordIcon id={character._id} used={mainPower} stroke="black" />
          <h5>{character.mainAttack.name}</h5>
          <h5>{character.mainAttack.value}</h5>
        </button>
        <button
          disabled={character.specialAttack.disabledTurns > 0}
          onClick={() =>
            fight({
              attack: character.specialAttack,
              name: character.name,
            })
          }
          className={`${styles.row} ${
            character.specialAttack.disabledTurns > 0 && styles.disabled
          } `}
        >
          <SpecialPowerIcon
            id={character._id}
            used={specialPower}
            stroke="black"
          />
          <h5>{character.specialAttack.name}</h5>
          <h5>{character.specialAttack.value}</h5>
        </button>
        <CharacterFooterInfo character={character} />
      </div>
    </motion.div>
  );
};

export default ActionCard;
