import { motion, AnimatePresence } from "framer-motion";

import { IEnemyAttack } from "@/helpers/fight";
import images from "../../assets/images.json";

import styles from "./FightModal.module.css";
import { Backdrop } from "./PopupModal";
import Image from "next/image";

interface FightModalProps {
  enemyAttack: IEnemyAttack | undefined;
  showModal: boolean;
}

const FightModal = ({ enemyAttack, showModal }: FightModalProps) => {
  const enemyImage = images.find(
    (item) => item.name === enemyAttack?.enemyAttack.name
  )!;

  const teamImage = images.find(
    (item) => item.name === enemyAttack?.target.name
  )!;

  const container = {
    initial: {},
    animate: { transition: { delayChildren: 1, staggerChildren: 1 } },
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
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={styles["image-box"]}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <Image
                className={styles.image}
                src={enemyImage?.imageUrl}
                alt={`Picture of ${enemyAttack?.enemyAttack.name}`}
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
                {enemyAttack?.enemyAttack.name} uses{" "}
                {enemyAttack?.enemyAttack.attack.name}
              </motion.p>
              <motion.p variants={child}>
                {enemyAttack?.target.name} is hit for{" "}
                {enemyAttack?.enemyAttack.attack.value}
              </motion.p>
            </motion.div>
            <motion.div
              className={styles["image-box"]}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 2 }}
            >
              <Image
                className={styles.image}
                src={teamImage?.imageUrl}
                alt={`Picture of ${enemyAttack?.target.name}`}
                width={400}
                height={400}
              />
            </motion.div>
          </motion.div>
        </Backdrop>
      )}
      ,
    </AnimatePresence>
  );
};

export default FightModal;
