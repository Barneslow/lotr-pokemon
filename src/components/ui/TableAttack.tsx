import { AttackingCharacter } from "../Fight";

import styles from "./TableAttack.module.css";

interface TableAttackProps {
  attackingCharacter: AttackingCharacter | undefined;
}

const TableAttack = ({ attackingCharacter }: TableAttackProps) => {
  return (
    <div className={styles.table}>
      <p className={styles.item}>{attackingCharacter?.name}</p>
      <p className={styles.item}>{attackingCharacter?.attack?.name}</p>
      <p className={styles.item}>{attackingCharacter?.attack?.value}</p>
    </div>
  );
};

export default TableAttack;
