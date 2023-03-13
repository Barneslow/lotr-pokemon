import Link from "next/link";
import styles from "./CharacterCard.module.css";

import { motion } from "framer-motion";

import CardContent from "./CardContent";
import { FightCardProps } from "./FightCard";

const CharacterCard: React.FC<FightCardProps> = ({
  character,
  setAttackingCharacter,
  close,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textDecoration: "none" }}
      className={styles.wrapper}
    >
      <CardContent
        setAttackingCharacter={setAttackingCharacter}
        character={character}
        close={close}
      />
    </motion.div>
  );
};

CharacterCard.displayName = "CharacterCard";

export default CharacterCard;
