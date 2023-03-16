import imageJSON from "../../assets/images.json";
import styles from "./FightCard.module.scss";
import Image from "next/image";
import DeadOverlay from "../ui/DeadOverlay";
import useModal from "@/hooks/useModal";
import PopupModal from "../ui/PopupModal";
import { AttackingCharacter, CharacterObjectProps } from "@/models/models";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  calculateAttackTimeRemaining,
  calculateCharacterHealth,
} from "@/helpers/fight";

export interface FightCardProps extends CharacterObjectProps {
  setAttackingCharacter: (value: AttackingCharacter) => void;
  close?: () => void;
}

const FightCard: React.FC<FightCardProps> = ({
  character,
  setAttackingCharacter,
}) => {
  const data = imageJSON.find((item) => item.name === character.name)!;

  const { open, modalOpen, close } = useModal();

  const percentage = calculateCharacterHealth(character);

  const { mainPower, specialPower } = calculateAttackTimeRemaining(character);

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
        <div className={styles.header}>
          <h3>{character.name.substring(0, 20)}</h3>
        </div>
        <Image
          alt={`Picture of the ${character.name}`}
          width={400}
          height={400}
          className={styles.image}
          src={data?.imageUrl}
        />
        <div className={styles.info}>
          <HeartIcon percentage={percentage} id={character._id}>
            <span className={styles.health}>{character.health}</span>
          </HeartIcon>
          <SwordIcon id={character._id} used={mainPower} />
          <SpecialPowerIcon id={character._id} used={specialPower} />
        </div>
      </div>
    </>
  );
};

export default FightCard;

export type HeartIconProps = {
  children: ReactNode;
  percentage: number;
  id: string;
  stroke?: string;
};

export type PowerIconProps = {
  id: string;
  used: number;
  stroke?: string;
  size?: number;
};

export function SwordIcon({ id, used, stroke, size }: PowerIconProps) {
  return (
    <svg
      viewBox="0 0 510.31 510.3"
      className={styles.svg}
      style={{ width: size, height: size }}
    >
      <linearGradient id={`swordgradient${id}`} gradientTransform="rotate(90)">
        <stop offset={`${used}%`} stop-color="white" stop-opacity=".5" />
        <stop offset={`${used}%`} stop-color="#0A6EBD" />
      </linearGradient>

      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        fill={`url('#swordgradient${id}')`}
        stroke={stroke || "white"}
        strokeWidth={10}
        transition={{
          duration: 5,
          type: "tween",
          ease: "easeOut",
          delay: 0.5,
        }}
        d="M504.06,443.728c-8.341-8.341-21.845-8.341-30.165,0h-0.021L412.946,382.8c20.096-23.915,34.731-50.389,36.928-72.768
        c1.131-11.733-7.424-22.165-19.157-23.317c-11.925-1.195-22.165,7.445-23.317,19.157c-0.256,2.773-1.067,5.803-2.091,8.917
        l-59.648-59.627l128.235-128.235c2.325-2.347,4.096-5.205,5.141-8.341l30.165-90.496c2.56-7.68,0.555-16.128-5.141-21.845
        c-5.717-5.717-14.187-7.701-21.845-5.141L391.719,31.27c-3.136,1.045-5.995,2.816-8.341,5.163L255.143,164.646L126.93,36.432
        c-2.325-2.347-5.184-4.117-8.341-5.163L28.092,1.104c-7.616-2.56-16.128-0.597-21.824,5.141
        c-5.717,5.717-7.723,14.165-5.163,21.845l30.165,90.496c1.045,3.136,2.816,5.995,5.163,8.341l128.213,128.213l-59.904,59.925
        c-0.917-2.965-1.621-5.824-1.771-8.405c-0.704-11.755-10.88-20.693-22.592-20.011c-11.776,0.725-20.693,10.837-19.989,22.592
        c1.344,22.251,16.149,49.237,36.864,73.643l-60.821,60.843c-8.341-8.341-21.845-8.341-30.165,0c-8.341,8.32-8.341,21.824,0,30.165
        l30.165,30.165c4.16,4.16,9.621,6.251,15.083,6.251s10.901-2.091,15.083-6.251c8.32-8.341,8.32-21.845,0-30.165l60.907-60.928
        c23.915,20.096,50.411,34.709,72.789,36.885c0.725,0.085,1.408,0.107,2.091,0.107c10.859,0,20.139-8.235,21.205-19.264
        c1.152-11.712-7.445-22.165-19.157-23.296c-2.773-0.277-5.803-1.067-8.917-2.112l59.648-59.627l59.904,59.904
        c-2.965,0.917-5.824,1.621-8.405,1.771c-11.776,0.704-20.715,10.816-20.011,22.592c0.683,11.307,10.091,20.032,21.269,20.032
        c0.448,0,0.875,0,1.323-0.043c22.251-1.344,49.216-16.149,73.621-36.864l60.843,60.843c-8.32,8.32-8.32,21.824,0,30.165
        c4.181,4.16,9.643,6.251,15.104,6.251c5.44,0,10.901-2.091,15.083-6.251l30.165-30.165
        C512.38,465.552,512.38,452.048,504.06,443.728z M157.927,382.544c-5.653-4.587-11.2-9.557-16.448-14.784
        c-0.149-0.149-0.299-0.32-0.448-0.469c-4.715-4.736-9.237-9.728-13.419-14.784l67.2-67.179l30.187,30.165L157.927,382.544z
         M298.194,207.696l-12.864-12.885L409.98,70.16l45.269-15.083l-15.104,45.248L315.495,224.998L298.194,207.696z"
      />
    </svg>
  );
}

export function SpecialPowerIcon({ id, used, stroke, size }: PowerIconProps) {
  return (
    <svg
      viewBox="0 -0.5 17 17"
      className={styles.svg}
      style={{ width: size, height: size }}
    >
      <linearGradient id={`spicongradient${id}`} gradientTransform="rotate(90)">
        <stop offset={`${used}%`} stop-color="white" stop-opacity=".5" />
        <stop offset={`${used}%`} stop-color="#32CD32" />
      </linearGradient>

      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        fill={`url('#spicongradient${id}')`}
        stroke={stroke || "white"}
        strokeWidth={0.5}
        transition={{
          duration: 1,
          type: "tween",
          ease: "easeOut",
          delay: 0.5,
        }}
        d="M14.289,0.023 L6.925,0 L2.984,8 L8,8 L3.666,15.916 L14.924,4.941 L10.35,4.941 L14.289,0.023"
      />
    </svg>
  );
}

export function HeartIcon({
  children,
  percentage,
  id,
  stroke,
}: HeartIconProps) {
  return (
    <div
      style={{
        position: "relative",
        alignItems: "center",
        display: "flex",
      }}
    >
      <svg viewBox="0 0 24 24" className={styles.svg}>
        <linearGradient id={`gradient${id}`} gradientTransform="rotate(90)">
          <stop
            offset={`${percentage}%`}
            stop-color="white"
            stop-opacity=".5"
          />
          <stop offset={`${percentage}%`} stop-color="red" />
        </linearGradient>

        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          fill={`url('#gradient${id}')`}
          stroke={stroke || "white"}
          strokeWidth={0.6}
          transition={{
            duration: 1,
            type: "tween",
            ease: "easeOut",
            delay: 0.5,
          }}
          d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"
        />
      </svg>
      {children}
    </div>
  );
}
