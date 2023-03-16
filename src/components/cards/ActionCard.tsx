import { motion } from "framer-motion";

import CardContent from "./CardContent";
import { FightCardProps } from "./FightCard";

import styles from "./ActionCard.module.css";
import ActionContent from "./ActionContent";

const ActionCard: React.FC<FightCardProps> = ({ character }) => {
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
