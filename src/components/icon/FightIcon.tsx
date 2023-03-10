import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./FightIcon.module.css";

interface FightIconProps {
  icon: IconProp;
  value: number;
  color: string;
  height: number;
}

const FightIcon = ({ icon, value, color, height }: FightIconProps) => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={icon} color={color} height={height} />
      <span>{value}</span>
    </div>
  );
};

export default FightIcon;
