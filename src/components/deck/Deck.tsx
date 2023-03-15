import styles from "./Deck.module.css";

import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "@/hooks/useDimensions";
import { Navigation } from "./Navigation";
import { HamburgerToggle } from "./HamburgerToggle";

const Deck = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const containerRef = useRef(null);

  const { height } = useDimensions(containerRef);

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: "circle(25px at 30px 30px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={styles.nav}
      style={{ width: isOpen ? 300 : 0 }}
    >
      <motion.div className={styles.background} variants={sidebar} />
      <Navigation />
      <HamburgerToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default Deck;
