import { Character } from "@/models/models";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import CharacterCard from "../CharacterCard";
import { AttackingCharacter } from "../Fight";

import styles from "./PopupModal.module.css";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

interface PopupModalProps {
  modalOpen: boolean;
  close: () => void;
  character: Character;
  setAttackingCharacter: (value: AttackingCharacter) => void;
}

const PopupModal = ({
  modalOpen,
  close,
  character,
  setAttackingCharacter,
}: PopupModalProps) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {modalOpen && (
        <Backdrop onClick={close}>
          <motion.div
            className={styles.modal}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <CharacterCard
              setAttackingCharacter={setAttackingCharacter}
              character={character}
              close={close}
            />
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;

interface BackdropProps {
  children: ReactNode;
  onClick: () => void;
}

const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
