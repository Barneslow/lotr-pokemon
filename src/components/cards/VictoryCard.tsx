import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faHandFist, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Character } from "@/models/models";
import Image from "next/image";

import styles from "./VictoryCard.module.css";

import imageData from "../../assets/images.json";

type VictoryCardProps = {
  character: Character;
};

const VictoryCard = ({ character }: VictoryCardProps) => {
  const data = imageData.find((item) => item.name === character.name)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ textDecoration: "none" }}
      className={styles.victory}
    >
      <div className={styles.card}>
        <div className={styles.heading}>
          <h3 style={{ fontSize: 25 }}>{character.name}</h3>
          <div>
            <span style={{ fontSize: 25 }}>{character.health}</span>
            <FontAwesomeIcon icon={faHeart} height={25} color="red" />
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
        <div className={styles["stat-block"]}>
          <FontAwesomeIcon
            icon={faHandFist}
            style={{
              height: 30,
              color: "var(--blue)",
              stroke: "black",
              strokeWidth: 5,
            }}
          />
          <p>{character.mainAttack?.name}</p>
          <span style={{ fontWeight: 700 }}>{character.mainAttack?.value}</span>
        </div>
        <div className={styles["stat-block"]}>
          <FontAwesomeIcon
            icon={faBolt}
            style={{
              height: 30,
              color: "#32CD32",
              stroke: "black",
              strokeWidth: 5,
            }}
          />
          <p>{character.specialAttack?.name}</p>
          <span style={{ fontWeight: 700 }}>
            {character.specialAttack?.value}
          </span>
        </div>
        <div className={styles.info}>
          <div>
            <p style={{ fontWeight: 700 }}>Race</p>
            <p>{character.race}</p>
          </div>
          <div>
            <p style={{ fontWeight: 700 }}>Height</p>
            <p>{character.height}</p>
          </div>
          <div>
            <p style={{ fontWeight: 700 }}>Realm</p>
            <p>{character.realm}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VictoryCard;
