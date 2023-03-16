import { motion } from "framer-motion";

import styles from "./ActionCard.module.css";
import ActionContent from "./ActionContent";
import { Character } from "@/models/models";
import { SpecialPowerIcon, SwordIcon } from "./FightCard";
import { calculateAttackTimeRemaining } from "@/helpers/fight";

export type CharacterCardProps = {
  character: Character;
};

const ActionCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textDecoration: "none" }}
      className={styles.card}
    >
      <ActionContent character={character} />
    </motion.div>
  );
};

export default ActionCard;
