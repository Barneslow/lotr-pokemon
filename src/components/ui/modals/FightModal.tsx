import { motion, AnimatePresence } from "framer-motion";

import { IAttackingAnimationProps } from "@/helpers/fight";
import images from "../../../assets/images.json";

import styles from "./FightModal.module.css";
import { Backdrop } from "./PopupModal";
import Image from "next/image";

interface FightModalProps {
  animatedAttack: IAttackingAnimationProps | undefined;
  showModal: boolean;
}

const FightModal = ({ animatedAttack, showModal }: FightModalProps) => {
  const enemyImage = images.find(
    (item) => item.name === animatedAttack?.attacker.name
  )!;

  const teamImage = images.find(
    (item) => item.name === animatedAttack?.target.name
  )!;

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
        <Backdrop>
          <motion.div
            className={styles.modal}
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={styles["image-box"]}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
            >
              <Image
                className={styles.image}
                src={enemyImage?.imageUrl}
                alt={`Picture of ${animatedAttack?.attacker.name}`}
                width={400}
                height={400}
              />
            </motion.div>
            <motion.div
              variants={container}
              initial="initial"
              animate="animate"
              className={styles["text-box"]}
            >
              <motion.p variants={child}>
                {animatedAttack?.attacker.name} uses{" "}
                {animatedAttack?.attacker.attack.name}
              </motion.p>
              <motion.p variants={child}>
                {animatedAttack?.target.name} is hit for{" "}
                {animatedAttack?.attacker.attack.value}
              </motion.p>
            </motion.div>
            <motion.div
              className={styles["image-box"]}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.6 }}
            >
              <Image
                className={styles.image}
                src={teamImage?.imageUrl}
                alt={`Picture of ${animatedAttack?.target.name}`}
                width={400}
                height={400}
              />
            </motion.div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default FightModal;
