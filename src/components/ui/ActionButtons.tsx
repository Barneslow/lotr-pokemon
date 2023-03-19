import { FightContext } from "@/context/FightContext";
import { useContext } from "react";
import { FightIcon, SkipIcon } from "./icon/CardIcons";
import styles from "./ActionButtons.module.css";

type ActionButtonProps = {
  fight: () => {};
};

const ActionButtons = ({ fight }: ActionButtonProps) => {
  const { changeTurn } = useContext(FightContext);

  return (
    <div className={styles["button-container"]}>
      <button onClick={changeTurn} className={styles.button}>
        <SkipIcon stroke="black" />
      </button>
      <button onClick={fight} className={styles.button}>
        <FightIcon stroke="green" />
      </button>
    </div>
  );
};

export default ActionButtons;
