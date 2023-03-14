import { FightContext } from "@/context/FightContext";
import { enemiesAttackTurn, IEnemyAttack } from "@/helpers/fight";
import { Attack } from "@/models/models";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import EnemyFightCard from "./EnemyFightCard";

import styles from "./Fight.module.css";
import FightCard from "./FightCard";
import FightModal from "./ui/FightModal";
import TableAttack from "./ui/TableAttack";

export interface AttackingCharacter {
  attack: Attack;
  name: string;
}

interface FightProps {
  setIsFighting: (boolean: boolean) => void;
}

const Fight = ({ setIsFighting }: FightProps) => {
  const { turn, changeTurn, enemy, team, reset } = useContext(FightContext);
  const [showModal, setShowModal] = useState(false);
  const [enemyAttack, setEnemyAttack] = useState<IEnemyAttack>();
  const [attackingCharacter, setAttackingCharacter] = useState<
    AttackingCharacter | undefined
  >();

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

  useEffect(() => {
    const aliveEnemies = enemy.filter((char) => char.health > 0);
    const aliveTeam = team.filter((char) => char.health > 0);

    if (aliveEnemies.length === 0 || aliveTeam.length === 0) {
      reset();
      setIsFighting(false);
      return;
    }

    if (!turn) {
      changeTurn();

      setShowModal(true);

      setTimeout(() => setShowModal(false), 4000);

      setEnemyAttack(enemiesAttackTurn(team, enemy));

      if (attackingCharacter) {
        const character = team.find(
          (char) => char.name === attackingCharacter.name
        )!;

        if (character.health <= 0) {
          setAttackingCharacter(undefined);
        }
      }
    }
  }, [turn]);

  console.log(enemyAttack);
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
            <EnemyFightCard
              character={character}
              attackingCharacter={attackingCharacter}
            />
          </motion.div>
        ))}
      </motion.div>
      <TableAttack attackingCharacter={attackingCharacter} />
      <FightModal enemyAttack={enemyAttack} showModal={showModal} />
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className={styles.container}
      >
        {team.map((character) => (
          <motion.div variants={child} key={character._id}>
            <FightCard
              character={character}
              setAttackingCharacter={setAttackingCharacter}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Fight;
