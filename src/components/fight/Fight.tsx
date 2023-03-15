import { FightContext } from "@/context/FightContext";
import {
  animationTimer,
  enemiesAttackTurn,
  IAttackingAnimationProps,
  isOdd,
} from "@/helpers/fight";
import { AttackingCharacter, Character } from "@/models/models";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import EnemyFightCard from "../cards/EnemyFightCard";

import styles from "./Fight.module.css";
import FightCard from "../cards/FightCard";
import FightModal from "./FightModal";

import useSound from "use-sound";
import CompletedModal from "./CompletedModal";
import { randomFromArray } from "@/helpers/arrays";
import { DeckContext } from "@/context/DeckContext";

interface FightProps {
  setIsFighting: (boolean: boolean) => void;
}

const Fight = ({ setIsFighting }: FightProps) => {
  const { turn, changeTurn, enemy, team, reset } = useContext(FightContext);
  const { updateDeck } = useContext(DeckContext);

  const [showModal, setShowModal] = useState(false);
  const [completedAnimation, setCompletedAnimation] = useState(false);
  const [victoryCharacter, setVictoryCharacter] = useState<
    Character | undefined
  >();
  const [animatedAttack, setAnimatedAttack] =
    useState<IAttackingAnimationProps>();
  const [attackingCharacter, setAttackingCharacter] = useState<
    AttackingCharacter | undefined
  >();

  const [gondorAudio] = useSound("/audio/gondor.mp3");
  const [mordorAudio] = useSound("/audio/mordor.mp3");

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
      let victoryCharacter;

      if (aliveTeam.length > 0) {
        victoryCharacter = randomFromArray(team);
      }

      setCompletedAnimation(true);
      setVictoryCharacter(victoryCharacter);

      return;
    }

    if (aliveEnemies.length === 0) {
    }

    async function OpposingTeamsTurn() {
      await animationTimer(500);

      mordorAudio();

      team.forEach((char) => {
        if (char.mainAttack.disabledTurns > 0) {
          char.mainAttack.disabledTurns -= 1;
        }
        if (char.specialAttack.disabledTurns > 0) {
          char.specialAttack.disabledTurns -= 1;
        }
      });
      changeTurn();

      setShowModal(true);

      setTimeout(() => setShowModal(false), 500);

      setAnimatedAttack(enemiesAttackTurn(team, enemy));

      if (attackingCharacter) {
        const character = team.find(
          (char) => char.name === attackingCharacter.name
        )!;

        if (character.health <= 0) {
          setAttackingCharacter(undefined);
        }
      }
    }

    if (isOdd(turn)) {
      OpposingTeamsTurn();
    }
  }, [turn]);

  async function playerFightAnimation(target: Character) {
    if (!attackingCharacter) return;

    gondorAudio();

    setShowModal(true);
    setAnimatedAttack({
      attacker: attackingCharacter,
      target,
    });

    attackingCharacter.attack.disabledTurns =
      attackingCharacter.attack.disabledFor;

    target.health = target.health - attackingCharacter.attack.value;

    await animationTimer(500);
    changeTurn();
    setShowModal(false);
    setAttackingCharacter(undefined);
  }

  async function closeModal() {
    if (victoryCharacter) {
      updateDeck(victoryCharacter);
    }

    reset();
    setIsFighting(false);
  }

  return (
    <div className={styles.wrapper}>
      <CompletedModal
        victory={team.filter((char) => char.health > 0).length > 0}
        showModal={completedAnimation}
        character={victoryCharacter}
        onClick={closeModal}
      />
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
              playerFightAnimation={playerFightAnimation}
              attackingCharacter={attackingCharacter}
            />
          </motion.div>
        ))}
      </motion.div>
      <FightModal animatedAttack={animatedAttack} showModal={showModal} />
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
              attackingCharacter={attackingCharacter}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Fight;
