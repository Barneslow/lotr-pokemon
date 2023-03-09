import Link from "next/link";
import styles from "./CharacterCard.module.css";

import { Roboto } from "next/font/google";
import { motion } from "framer-motion";

import { Attack } from "@/models/models";
import CardContent from "./CardContent";

export interface CharacterObjectProps {
  character: {
    _id: string;
    name: string;
    race: string;
    realm: string;
    height: string;
    mainAttack: Attack;
    specialAttack: Attack;
    health: number;
  };
}

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
});

const CharacterCard: React.FC<CharacterObjectProps> = ({ character }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ textDecoration: "none" }}
      className={`${styles.wrapper} ${roboto.className}`}
    >
      <CardContent character={character} />
    </motion.div>
  );
};

CharacterCard.displayName = "CharacterCard";

export default CharacterCard;
