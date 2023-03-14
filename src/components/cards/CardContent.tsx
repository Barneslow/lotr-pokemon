import { faBolt, faHandFist, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import styles from "./CardContent.module.css";
import imageData from "../../assets/images.json";
import { FightCardProps } from "./FightCard";

const CardContent = ({
  character,
  setAttackingCharacter,
  close,
}: FightCardProps) => {
  const data = imageData.find((item) => item.name === character.name)!;

  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <h3 style={{ fontSize: 20 }}>{character.name}</h3>
        <div>
          <span style={{ fontSize: 20 }}>{character.health}</span>
          <FontAwesomeIcon icon={faHeart} height={20} color="red" />
        </div>
      </div>
      <div className={styles["image-box"]}>
        <Image
          alt={`Picture of the ${character.name}`}
          width={400}
          height={400}
          className={styles.image}
          src={data?.imageUrl}
        />
      </div>
      <button
        className={styles.button}
        disabled={character.mainAttack.disabledTurns > 0}
        onClick={() => {
          setAttackingCharacter({
            attack: character.mainAttack,
            name: character.name,
          });
          if (close) {
            close();
          }
        }}
      >
        <FontAwesomeIcon
          icon={faHandFist}
          style={{
            height: 20,
            color: "blue",
            stroke: "black",
            strokeWidth: 5,
          }}
        />
        <p>{character.mainAttack?.name}</p>
        <span style={{ fontWeight: 700 }}>{character.mainAttack?.value}</span>
      </button>
      <button
        className={styles.button}
        disabled={character.specialAttack.disabledTurns > 0}
        onClick={() => {
          setAttackingCharacter({
            attack: character.specialAttack,
            name: character.name,
          });
          if (close) {
            close();
          }
        }}
      >
        <FontAwesomeIcon
          icon={faBolt}
          style={{
            height: 20,
            color: "yellow",
            stroke: "black",
            strokeWidth: 5,
          }}
        />
        <p>{character.specialAttack?.name}</p>
        <span style={{ fontWeight: 700 }}>
          {character.specialAttack?.value}
        </span>
      </button>
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
    </div>
  );
};

export default CardContent;
