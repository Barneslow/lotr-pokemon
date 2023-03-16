import { motion } from "framer-motion";

import styles from "./ActionCard.module.css";
import ActionContent from "./ActionContent";
import { AttackingCharacter, Character } from "@/models/models";

export type CharacterCardProps = {
  character: Character;
  stroke?: string;
  attackingCharacter?: AttackingCharacter | undefined;
};

const ActionCard: React.FC<CharacterCardProps> = ({ character, stroke }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textDecoration: "none", border: stroke }}
      className={styles.card}
    >
      <ActionContent character={character} />
    </motion.div>
  );
};

export default ActionCard;
