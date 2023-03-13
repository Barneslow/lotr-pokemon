import imageJSON from "../assets/images.json";
import styles from "./FightCard.module.css";
import { ImageData } from "./CardContent";
import Image from "next/image";
import DeadOverlay from "./ui/DeadOverlay";
import { AttackingCharacter } from "./Fight";
import useModal from "@/hooks/useModal";
import PopupModal from "./ui/PopupModal";
import { CharacterObjectProps } from "@/models/models";

export interface FightCardProps extends CharacterObjectProps {
  setAttackingCharacter: (value: AttackingCharacter) => void;
  close?: () => void;
}

const FightCard: React.FC<FightCardProps> = ({
  character,
  setAttackingCharacter,
}) => {
  const data: ImageData = imageJSON.find(
    (item) => item.name === character.name
  )!;

  const { open, modalOpen, close } = useModal();

  return (
    <>
      <PopupModal
        setAttackingCharacter={setAttackingCharacter}
        modalOpen={modalOpen}
        close={close}
        character={character}
      />
      <div onClick={open} className={styles.card}>
        {character.health <= 0 && <DeadOverlay />}
        <h3 className={styles.header}>{character.name.substring(0, 20)}</h3>
        <Image
          alt={`Picture of the ${character.name}`}
          width={400}
          height={400}
          className={styles.image}
          src={data?.imageUrl}
        />
      </div>
    </>
  );
};

export default FightCard;
