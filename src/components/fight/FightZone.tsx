import { Character } from "@/models/models";
import ActionCard from "../cards/ActionCard";
import styles from "./FightZone.module.css";

type FightZoneProps = {
  inPlayCharacter: Character | undefined;
  randomAttacker: Character | undefined;
};

const FightZone = ({ inPlayCharacter, randomAttacker }: FightZoneProps) => {
  return (
    <div className={styles["fight-area"]}>
      <div className={styles["fight-zone"]}>
        {inPlayCharacter && randomAttacker && (
          <ActionCard character={inPlayCharacter} />
        )}
      </div>
      <div className={styles["fight-zone"]}>
        {inPlayCharacter && randomAttacker && (
          <ActionCard character={randomAttacker} />
        )}
      </div>
    </div>
  );
};

export default FightZone;
