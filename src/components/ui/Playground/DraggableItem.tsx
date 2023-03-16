import { motion, useMotionValue, useTransform } from "framer-motion";

import styles from "./PlayGround.module.css";

const DraggableItem = () => {
  const motionY = useMotionValue(0);

  const color = useTransform(
    motionY,
    [-100, -50],
    ["rgb(3, 209, 0)", "rgb(68, 0, 255)"]
  );

  const tickPath = useTransform(motionY, [-50, -100], [0, 1]);

  return (
    <motion.div
      style={{ y: motionY, background: "white" }}
      drag
      dragElastic={0}
    >
      <svg viewBox="0 0 50 50" height={50} width={50}>
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

export default DraggableItem;
