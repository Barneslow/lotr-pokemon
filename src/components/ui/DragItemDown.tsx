import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

import styles from "./DragBox.module.css";

type DragItemProps = {
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  setDragItem: Dispatch<SetStateAction<boolean>>;
};

const DragItemDown = ({
  isDragging,
  setIsDragging,
  setDragItem,
}: DragItemProps) => {
  const motionY = useMotionValue(0);

  const color = useTransform(
    motionY,
    [-150, -50],
    ["rgb(3, 209, 0)", "rgb(68, 0, 255)"]
  );

  const tickPath = useTransform(motionY, [-50, -150], [0, 1]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <div className={styles["example-container"]}>
      <motion.div
        drag="y"
        className={styles["drag-item"]}
        style={{ y: motionY }}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={{ top: 0.8, bottom: 0.01 }}
        onDragStart={handleDragStart}
        onDragEnd={(event, info) => {
          if (isDragging && info.offset.y < -150) {
            //   setDragConstraints(constraintsRef);
            console.log("changing ref");
            setDragItem(false);

            //   setAxis(false);
            setIsDragging(false);
          }
          setIsDragging(false);
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
    </div>
  );
};

export default DragItemDown;
