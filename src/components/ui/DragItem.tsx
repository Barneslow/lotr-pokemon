import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

import styles from "./DragItem.module.css";

type DragItemProps = {
  setItem: Dispatch<SetStateAction<boolean>>;
  style?: {};
};

const DragItem = ({ setItem, style }: DragItemProps) => {
  const motionY = useMotionValue(0);

  const color = useTransform(
    motionY,
    [-150, -50],
    ["rgb(3, 209, 0)", "rgb(68, 0, 255)"]
  );

  const tickPath = useTransform(motionY, [-50, -150], [0, 1]);

  return (
    <motion.div
      style={{ ...style, y: motionY }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 3 }}
      drag={true}
      className={styles.drag}
      dragConstraints={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      dragElastic={{ top: 0.8, bottom: 0.01, left: 0.3, right: 0.3 }}
      onDragEnd={(event, info) => {
        if (info.offset.y < -180) {
          setItem(false);
        }
      }}
    >
      <svg viewBox="0 0 50 50">
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke={color}
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{ translateX: 5, translateY: 5 }}
        />
        <motion.path
          fill="none"
          strokeWidth="2"
          stroke={color}
          d="M14,26 L 22,33 L 35,16"
          strokeDasharray="0 1"
          style={{ pathLength: tickPath }}
        />
      </svg>
    </motion.div>
  );
};

export default DragItem;
