import imageJSON from "../assets/images.json";
import styles from "./FightCard.module.css";
import { ImageData } from "./CardContent";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import FightIcon from "./icon/FightIcon";
import { useContext } from "react";
import DeadOverlay from "./ui/DeadOverlay";
import { FightContext } from "@/context/FightContext";
import { AttackingCharacter } from "./Fight";
import { CharacterObjectProps } from "@/models/models";

interface EnemyFightCardProps extends CharacterObjectProps {
  attackingCharacter: AttackingCharacter | undefined;
}

const EnemyFightCard: React.FC<EnemyFightCardProps> = ({
  character,
  attackingCharacter,
}) => {
  const { turn, changeTurn } = useContext(FightContext);
  const data: ImageData = imageJSON.find(
    (item) => item.name === character.name
  )!;

  function AttackDamage() {
    if (!attackingCharacter) return;
    character.health = character.health - attackingCharacter.attack.value;
    changeTurn();
  }

  return (
    <button
      disabled={!turn || character.health <= 0}
      onClick={AttackDamage}
      className={styles.card}
    >
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
          height={40}
        />
      </div>
    </button>
  );
};

export default EnemyFightCard;
