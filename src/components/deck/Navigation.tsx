import { motion } from "framer-motion";
import { MenuItem, menuItemVarients } from "./MenuItem";

import styles from "./Menu.module.css";
import { DeckContext } from "@/context/DeckContext";
import { useContext } from "react";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const headingVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
    },
  },
  closed: {
    y: -100,
    opacity: 0,
  },
};

export const Navigation = () => {
  const { deck } = useContext(DeckContext);

  return (
    <motion.ul variants={variants} className={styles.list}>
      <motion.h3 variants={headingVariants} className={styles.heading}>
        Add to your deck
      </motion.h3>
      {deck.length > 0 ? (
        deck.map((character, index) => (
          <MenuItem key={index} name={character.name} />
        ))
      ) : (
        <motion.li variants={menuItemVarients} className={styles["list-item"]}>
          <div className={styles["icon-placeholder"]} />
          <div className={styles["text-placeholder"]}>
            <h4>Win To Earn Heroes</h4>
          </div>
        </motion.li>
      )}
    </motion.ul>
  );
};
