import { motion } from "framer-motion";
import { CharacterCardProps } from "./ActionCard";
import {
  StaticHeartIcon,
  StaticSpecialPowerIcon,
  StaticSwordIcon,
} from "../ui/icon/CardIcons";
import Image from "next/image";

import imageData from "../../assets/images.json";

import styles from "./CharacterCard.module.css";

const CharacterCard: React.FC<CharacterCardProps> = ({ character, stroke }) => {
  const data = imageData.find((item) => item.name === character.name)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textDecoration: "none", border: stroke }}
      className={styles.card}
    >
      <div className={styles.heading}>
        <h3>{character.name.substring(0, 16)}</h3>
        <StaticHeartIcon>
          <span className={styles.health}>{character.health}</span>
        </StaticHeartIcon>
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
      <div className={styles.row}>
        <StaticSwordIcon />
        <h5>{character.mainAttack.name}</h5>
        <h5>{character.mainAttack.value}</h5>
      </div>
      <div className={styles.row}>
        <StaticSpecialPowerIcon />
        <h5>{character.specialAttack.name}</h5>
        <h5>{character.specialAttack.value}</h5>
      </div>
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
    </motion.div>
  );
};

export default CharacterCard;
