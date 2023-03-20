import { motion } from "framer-motion";
import DeadOverlay from "@/components/ui/DeadOverlay";
import { CharacterCardProps } from "../ActionCard";
import EnemyActionContent from "./EnemyActionContent";

import styles from "./EnemyActionCard.module.css";

const EnemyActionCard: React.FC<CharacterCardProps> = ({
  character,
  stroke,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textDecoration: "none", border: stroke }}
      className={styles.card}
    >
      {character.health <= 0 && <DeadOverlay />}
      <EnemyActionContent character={character} />
    </motion.div>
  );
};

export default EnemyActionCard;
