import { FightContext } from "@/context/FightContext";
import { calculateAttackTimeRemaining } from "@/helpers/fight";
import { useContext } from "react";
import { CharacterCardProps } from "../cards/ActionCard";
import { SkipIcon, SpecialPowerIcon, SwordIcon } from "./icon/CardIcons";
import styles from "./ActionButtons.module.css";

const ActionButtons = ({ character }: CharacterCardProps) => {
  const { changeTurn, updateAttackingCharacter } = useContext(FightContext);
  const { mainPower, specialPower } = calculateAttackTimeRemaining(character);

  return (
    <div className={styles["button-container"]}>
      <button onClick={changeTurn} className={styles.button}>
        <SkipIcon stroke="black" size={40} />
      </button>
      <button
        onClick={() =>
          updateAttackingCharacter({
            attack: character.mainAttack,
            name: character.name,
          })
        }
        disabled={character.mainAttack.disabledTurns > 0}
        className={styles.button}
      >
        <SwordIcon
          id={character._id}
          size={40}
          stroke="black"
          used={mainPower}
        />
      </button>
      <button
        onClick={() =>
          updateAttackingCharacter({
            attack: character.specialAttack,
            name: character.name,
          })
        }
        disabled={character.specialAttack.disabledTurns > 0}
        className={styles.button}
      >
        <SpecialPowerIcon
          id={character._id}
          size={40}
          stroke="black"
          used={specialPower}
        />
      </button>
    </div>
  );
};

export default ActionButtons;
