import { CharacterObjectProps } from "./CharacterCard";

import imageJSON from "../assets/images.json";
import styles from "./FightCard.module.css";
import { ImageData } from "./CardContent";
import { faBolt, faHandFist, faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import FightIcon from "./icon/FightIcon";
import DeadOverlay from "./ui/DeadOverlay";
import { AttackingCharacter } from "./Fight";

interface FightCardProps extends CharacterObjectProps {
  setAttackingCharacter: (value: AttackingCharacter) => void;
}

const FightCard: React.FC<FightCardProps> = ({
  character,
  setAttackingCharacter,
}) => {
  const data: ImageData = imageJSON.find(
    (item) => item.name === character.name
  )!;

  return (
    <div className={styles.card}>
      {character.health <= 0 && <DeadOverlay />}
      <h3 className={styles.header}>{character.name.substring(0, 20)}</h3>
      <Image
        alt={`Picture of the ${character.name}`}
        width={400}
        height={400}
        className={styles.image}
        src={data?.imageUrl}
      />
      <div className={styles.info}>
        <FightIcon
          icon={faHeart}
          color="red"
          value={character.health}
          height={30}
        />
        <FightIcon
          icon={faHandFist}
          color="blue"
          value={character.mainAttack?.value}
          height={30}
          onClick={() =>
            setAttackingCharacter({
              attack: character.mainAttack,
              name: character.name,
            })
          }
        />
        <FightIcon
          icon={faBolt}
          color="orange"
          value={character.specialAttack?.value}
          height={30}
          onClick={() =>
            setAttackingCharacter({
              attack: character.specialAttack,
              name: character.name,
            })
          }
        />
      </div>
    </div>
  );
};

export default FightCard;
