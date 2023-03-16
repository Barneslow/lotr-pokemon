import { FightContext } from "@/context/FightContext";
import {
  animationTimer,
  enemiesAttackTurn,
  IAttackingAnimationProps,
  isOdd,
} from "@/helpers/fight";
import { Character } from "@/models/models";
import { useContext, useEffect, useState } from "react";
import EnemyFightCard from "../cards/EnemyFightCard";

import styles from "./Fight.module.css";
import FightModal from "./FightModal";

import useSound from "use-sound";
import CompletedModal from "./CompletedModal";
import { randomFromArray } from "@/helpers/arrays";
import { DeckContext } from "@/context/DeckContext";
import Playground from "../ui/Playground/PlayGround";

interface FightProps {
  setIsFighting: (boolean: boolean) => void;
}

const NewFight = ({ setIsFighting }: FightProps) => {
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

  const [showModal, setShowModal] = useState(false);
  const [completedAnimation, setCompletedAnimation] = useState(false);
  const [victoryCharacter, setVictoryCharacter] = useState<
    Character | undefined
  >();
  const [animatedAttack, setAnimatedAttack] =
    useState<IAttackingAnimationProps>();

  const [gondorAudio] = useSound("/audio/gondor.mp3");
  const [mordorAudio] = useSound("/audio/mordor.mp3");

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
          updateAttackingCharacter(undefined);
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
    updateAttackingCharacter(undefined);
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
      <div className={styles.container}>
        {enemy.map((character) => (
          <EnemyFightCard
            key={character._id}
            character={character}
            playerFightAnimation={playerFightAnimation}
          />
        ))}
      </div>
      <FightModal animatedAttack={animatedAttack} showModal={showModal} />
      <Playground />
    </div>
  );
};

export default NewFight;
