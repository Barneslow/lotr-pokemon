import { calculateAttackTimeRemaining } from "@/helpers/fight";
import { AttackingCharacter, Character } from "@/models/models";
import { SpecialPowerIcon, SwordIcon } from "../cards/FightCard";
import styles from "./ActionButtons.module.css";

type ActionButtonProps = {
  character: Character;
  setAttackingCharacter: (value: AttackingCharacter) => void;
};

const ActionButtons = ({
  character,
  setAttackingCharacter,
}: ActionButtonProps) => {
  const { mainPower, specialPower } = calculateAttackTimeRemaining(character);

  return (
    <div className={styles["button-container"]}>
      <button
        onClick={() =>
          setAttackingCharacter({
            attack: character.mainAttack,
            name: character.name,
          })
        }
        disabled={character.mainAttack.disabledTurns > 0}
        className={styles.button}
      >
        <SwordIcon
          id={character._id}
          size={30}
          stroke="black"
          used={mainPower}
        />
      </button>
      <button
        onClick={() =>
          setAttackingCharacter({
            attack: character.specialAttack,
            name: character.name,
          })
        }
        disabled={character.specialAttack.disabledTurns > 0}
        className={styles.button}
      >
        <SpecialPowerIcon
          id={character._id}
          size={30}
          stroke="black"
          used={specialPower}
        />
      </button>
    </div>
  );
};

export default ActionButtons;
