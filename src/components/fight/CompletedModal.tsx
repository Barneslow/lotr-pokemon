import { motion, AnimatePresence } from "framer-motion";

import styles from "./FightModal.module.css";
import { Backdrop } from "../ui/PopupModal";
import CharacterCard from "../cards/CharacterCard";
import { Character } from "@/models/models";

interface CompletedModalProps {
  showModal: boolean;
  character?: Character;
  victory: boolean;
  onClick: () => {};
}

const CompletedModal = ({
  showModal,
  character,
  victory,
  onClick,
}: CompletedModalProps) => {
  const container = {
    initial: {},
    animate: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
  };

  const child = {
    initial: { scale: 0, opacity: 0, y: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "spring", bounce: 0.3 },
    },
  };

  return (
    <AnimatePresence>
      {showModal && (
        <Backdrop onClick={onClick}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={container}
            className={styles["victory-container"]}
          >
            <motion.h3 variants={child} className={styles.text}>
              {victory ? `YOU WON ${character?.name}` : "YOU LOST. TRY AGAIN!"}
            </motion.h3>
            {character && (
              <motion.div variants={child} className={styles.victory}>
                <CharacterCard character={character} />
              </motion.div>
            )}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default CompletedModal;
