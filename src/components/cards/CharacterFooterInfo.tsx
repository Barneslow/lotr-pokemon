import { CharacterCardProps } from "./ActionCard";

import styles from "./CardContent.module.css";

const CharacterFooterInfo = ({ character }: CharacterCardProps) => {
  return (
    <div className={styles.info}>
      <div className={styles.box}>
        <p className={styles.stat} style={{ fontWeight: 700 }}>
          Race
        </p>
        <p className={styles.stat}>{character.race}</p>
      </div>
      <div className={styles.box}>
        <p className={styles.stat} style={{ fontWeight: 700 }}>
          Height
        </p>
        <p className={styles.stat}>{character.height}</p>
      </div>
      <div className={styles.box}>
        <p className={styles.stat} style={{ fontWeight: 700 }}>
          Realm
        </p>
        <p className={styles.stat}>{character.realm}</p>
      </div>
    </div>
  );
};

export default CharacterFooterInfo;
