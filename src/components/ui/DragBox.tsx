import { useState } from "react";
import { motion } from "framer-motion";

import styles from "./DragBox.module.css";

import DragItem from "./DragItem";

export const DragBox = () => {
  const [item, setItem] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles["fight-area"]}>
        {!item && (
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            HELLO SIR
          </motion.h1>
        )}
      </div>
      <div className={styles["example-container"]}>
        {item && (
          <>
            <DragItem setItem={setItem} />
            <DragItem setItem={setItem} style={{ left: 160 }} />
            <DragItem setItem={setItem} style={{ left: 320 }} />
            <DragItem setItem={setItem} style={{ left: 480 }} />
            <DragItem setItem={setItem} style={{ left: 640 }} />
          </>
        )}
      </div>
    </div>
  );
};
