import { Character } from "@/models/models";
import { motion } from "framer-motion";
import CharacterCard from "./CharacterCard";

import styles from "./Fight.module.css";
import FightCard from "./FightCard";

interface FightProps {
  enemy: Character[];
  team: Character[];
}

const Fight = ({ enemy, team }: FightProps) => {
  const container = {
    initial: {},
    animate: { transition: { staggerChildren: 0.05 } },
  };

  const child = {
    initial: { scale: 0, opacity: 0, y: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "spring", bounce: 0.3 },
    },
  };
  return (
    <div className={styles.wrapper}>
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className={styles.container}
      >
        {enemy.map((character) => (
          <motion.div variants={child} key={character._id}>
            <FightCard character={character} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className={styles.container}
      >
        {team.map((character) => (
          <motion.div variants={child} key={character._id}>
            <FightCard character={character} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Fight;
