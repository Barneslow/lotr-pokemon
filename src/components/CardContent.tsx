import { faBolt, faHandFist, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CharacterProps } from "./CharacterCard";
import Image from "next/image";

import styles from "./CharacterCard.module.css";
import imageData from "../assets/images.json";

export interface ImageData {
  name: string;
  imageUrl: string;
}

const CardContent = (props: CharacterProps) => {
  const data: ImageData = imageData.find((item) => item.name === props.name)!;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          width: "100%",
          marginBottom: 2,
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            margin: 5,
            fontSize: 14,
          }}
        >
          {props.name.substring(0, 20)}
        </h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
          <span style={{ fontSize: 14 }}>{props.health}</span>
          <FontAwesomeIcon
            icon={faHeart}
            style={{ height: 14, color: "red" }}
          />
        </div>
      </div>
      <div className={styles["image-box"]}>
        <Image
          alt={`Picture of the ${props.name}`}
          width={400}
          height={400}
          className={styles.image}
          src={data?.imageUrl}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.block}>
          <FontAwesomeIcon
            icon={faHandFist}
            style={{
              height: 14,
              color: "blue",
              stroke: "black",
              strokeWidth: 10,
            }}
          />
          <p>{props.mainAttack?.name}</p>
          <span style={{ fontWeight: 700 }}>{props.mainAttack?.value}</span>
        </div>
        <div className={styles.block}>
          <FontAwesomeIcon
            icon={faBolt}
            style={{
              height: 14,
              color: "yellow",
              stroke: "black",
              strokeWidth: 10,
            }}
          />
          <p>{props.specialAttack?.name}</p>
          <span style={{ fontWeight: 700 }}>{props.specialAttack?.value}</span>
        </div>
        <div className={styles.bottom}>
          <div className={styles.box}>
            <p style={{ fontWeight: 700 }}>Race</p>
            <p style={{ fontWeight: 300 }}>{props.race}</p>
          </div>
          <div className={styles.box}>
            <p style={{ fontWeight: 700 }}>Height</p>
            <p style={{ fontWeight: 300 }}>{props.height}</p>
          </div>
          <div className={styles.box}>
            <p style={{ fontWeight: 700 }}>Realm</p>
            <p style={{ fontWeight: 300 }}>{props.realm}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardContent;
