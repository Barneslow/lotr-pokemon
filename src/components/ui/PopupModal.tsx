import { FightContext } from "@/context/FightContext";
import { animationTimer } from "@/helpers/fight";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import CharacterCard from "../cards/CharacterCard";

import styles from "./PopupModal.module.css";

const dropIn = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    scale: 2,
    transition: { duration: 0.3 },
    filter: "blur(4px)",
  },
};

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.15 } },
};

const enemyContainer = {
  initial: {},
  animate: { transition: { delayChildren: 2.5, staggerChildren: 0.15 } },
};
const child = {
  initial: { x: "100vw" },
  animate: {
    x: 0,
    transition: { duration: 1, type: "spring", bounce: 0.1 },
  },
};

interface PopupModalProps {
  modalOpen: boolean;
  close: () => void;
}

const PopupModal = ({ modalOpen, close }: PopupModalProps) => {
  const { team, enemy } = useContext(FightContext);
  const router = useRouter();

  async function startFight() {
    close();
    router.push("/fight");
  }
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
            <motion.div
              className={styles.container}
              variants={container}
              initial="initial"
              animate="animate"
            >
              {team.map((character) => (
                <motion.div
                  key={character._id}
                  variants={child}
                  style={{ display: "flex" }}
                >
                  <CharacterCard character={character} />
                </motion.div>
              ))}
            </motion.div>
            <h1 style={{ color: "white" }}>VS</h1>
            <motion.div
              className={styles.container}
              variants={enemyContainer}
              initial="initial"
              animate="animate"
              onAnimationComplete={startFight}
            >
              {enemy.map((character) => (
                <motion.div
                  key={character._id}
                  variants={child}
                  style={{ display: "flex" }}
                >
                  <CharacterCard character={character} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;

interface BackdropProps {
  children: ReactNode;
  onClick?: () => void;
}

export const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <motion.div
      className={styles.backdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, background: "black" }}
    >
      {children}
    </motion.div>
  );
};
