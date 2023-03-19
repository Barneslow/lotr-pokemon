import { FightContext } from "@/context/FightContext";
import {
  animationTimer,
  IAttackingAnimationProps,
  selectedEnemyAttackTurn,
} from "@/helpers/fight";
import { Character } from "@/models/models";
import { useContext, useEffect, useState } from "react";
import EnemyFightCard from "@/components/cards/EnemyFightCard";

import { motion } from "framer-motion";

import styles from "./Fight.module.css";
import FightModal from "@/components/fight/FightModal";

import useSound from "use-sound";
import CompletedModal from "@/components/fight/CompletedModal";
import { randomFromArray } from "@/helpers/arrays";
import { DeckContext } from "@/context/DeckContext";
import DroppableZones from "@/components/fight/Playground/PlayGround";
import ActionButtons from "@/components/ui/ActionButtons";
import { useRouter } from "next/router";

import { M_PLUS_Rounded_1c } from "next/font/google";
import Layout from "@/components/Layout/Layout";

const msPlus = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

interface FightProps {
  setIsFighting: (boolean: boolean) => void;
}

const FightScreen = ({ setIsFighting }: FightProps) => {
  const {
    turn,
    changeTurn,
    enemy,
    team,
    reset,
    updateAttackingCharacter,
    attackingCharacter,
  } = useContext(FightContext);
  const { updateDeck } = useContext(DeckContext);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [completedAnimation, setCompletedAnimation] = useState(false);
  const [victoryCharacter, setVictoryCharacter] = useState<
    Character | undefined
  >();
  const [animatedAttack, setAnimatedAttack] =
    useState<IAttackingAnimationProps>();

  const [randomAttacker, setRandomAttacker] = useState<Character>(
    randomFromArray(enemy)
  );

  const [gondorAudio] = useSound("/audio/gondor.mp3");
  const [mordorAudio] = useSound("/audio/mordor.mp3");

  const aliveEnemies = enemy.filter((char) => char.health > 0);
  const aliveTeam = team.filter((char) => char.health > 0);

  useEffect(() => {
    if (aliveEnemies.length === 0 || aliveTeam.length === 0) {
      let victoryCharacter;

      if (aliveTeam.length > 0) {
        victoryCharacter = randomFromArray(team);
      }

      setCompletedAnimation(true);
      setVictoryCharacter(victoryCharacter);

      return;
    }
  }, [turn]);

  async function fightPokemonStyle() {
    if (!attackingCharacter) return;

    gondorAudio();

    setShowModal(true);
    setAnimatedAttack({
      attacker: attackingCharacter,
      target: randomAttacker,
    });

    attackingCharacter.attack.disabledTurns =
      attackingCharacter.attack.disabledFor;

    randomAttacker.health =
      randomAttacker.health - attackingCharacter.attack.value;

    await animationTimer(500);
    changeTurn();
    setShowModal(false);
    updateAttackingCharacter(undefined);

    const aliveEnemies = enemy.filter((char) => char.health > 0);

    if (aliveEnemies.length === 0) {
      return;
    }

    if (randomAttacker.health <= 0) {
      const newEnemy = randomFromArray(aliveEnemies);
      await OpposingTeamsTurn(newEnemy);
      setRandomAttacker(newEnemy);
    } else {
      OpposingTeamsTurn(randomAttacker);
    }
  }

  async function OpposingTeamsTurn(enemy: Character) {
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

    setTimeout(() => setShowModal(false), 2000);

    if (attackingCharacter) {
      const character = team.find(
        (char) => char.name === attackingCharacter.name
      )!;

      const selectedAttack = selectedEnemyAttackTurn(character, enemy);

      setAnimatedAttack(selectedAttack);

      character.health =
        character.health - selectedAttack.attacker.attack.value;

      if (character.health < 0) {
        updateAttackingCharacter(undefined);
      }
    }
  }

  async function closeModal() {
    if (victoryCharacter) {
      updateDeck(victoryCharacter);
    }

    reset();
    router.push("/");
  }

  return (
    <Layout>
      <main className={`${styles.background} ${msPlus.className}`}>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={styles.wrapper}
        >
          <CompletedModal
            victory={team.filter((char) => char.health > 0).length > 0}
            showModal={completedAnimation}
            character={victoryCharacter}
            onClick={closeModal}
          />
          <div className={styles.container}>
            {enemy.map((character) => (
              <EnemyFightCard key={character._id} character={character} />
            ))}
          </div>
          <FightModal animatedAttack={animatedAttack} showModal={showModal} />
          <DroppableZones randomAttacker={randomAttacker}>
            {attackingCharacter && <ActionButtons fight={fightPokemonStyle} />}
          </DroppableZones>
        </motion.div>
      </main>
    </Layout>
  );
};

export default FightScreen;
