import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";

import styles from "./FightIcon.module.css";

interface FightIconProps {
  icon: IconProp;
  value: number;
  color: string;
  height: number;
  onClick?: () => void;
}

const FightIcon = ({ icon, value, color, height, onClick }: FightIconProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <FontAwesomeIcon icon={icon} color={color} height={height} />
      <span>{value}</span>
    </div>
  );
};

export default FightIcon;
