import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import styles from "./Menu.module.css";
import Image from "next/image";
import imageData from "../../assets/images.json";

export const menuItemVarients = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 200,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

type MenuItemProps = {
  name: string;
  placeholder?: boolean;
};

export const MenuItem = ({ name, placeholder }: MenuItemProps) => {
  const data = imageData.find((item) => item.name === name)!;

  return (
    <Link href={`/character/${name}`}>
      <motion.li
        variants={menuItemVarients}
        whileHover={{ scale: 1.1, background: "lightgrey" }}
        whileTap={{ scale: 0.95 }}
        className={styles["list-item"]}
      >
        <div className={styles["image-box"]}>
          <Image
            alt={`Picture of the ${name}`}
            width={400}
            height={400}
            className={styles.image}
            src={data?.imageUrl}
          />
        </div>
        <div className={styles["name-box"]}>{name}</div>
      </motion.li>
    </Link>
  );
};
