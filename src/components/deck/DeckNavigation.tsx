import { useRef } from "react";
import { circInOut, motion, useCycle } from "framer-motion";
import { useDimensions } from "@/hooks/useDimensions";
import { Navigation } from "./Navigation";
import { HamburgerToggle } from "./HamburgerToggle";

import styles from "./DeckNavigation.module.css";

const DeckNavigation = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const containerRef = useRef(null);

  const { height } = useDimensions(containerRef);

  // const sidebar = {
  //   open: {
  //     clipPath: `circle(${height}px at 40px 40px)`,
  //     transition: {
  //       delay: 0.5,
  //       type: "spring",
  //       stiffness: 400,
  //       damping: 40,
  //     },
  //   },

  //   closed: {
  //     clipPath: "circle(25px at 30px 30px)",
  //     transition: {
  //       delay: 0.5,
  //       type: "spring",
  //       stiffness: 400,
  //       damping: 40,
  //     },
  //   },
  // };

  const sidebar = {
    open: {
      width: 300,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },

    closed: {
      width: 0,
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
    >
      <motion.div className={styles.background} variants={sidebar} />
      <Navigation />
      <HamburgerToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default DeckNavigation;
