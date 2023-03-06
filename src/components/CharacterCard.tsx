import Link from "next/link";
import styles from "./CharacterCard.module.css";
import Image from "next/image";

import imageData from "../assets/images.json";
import { Varela_Round, Roboto } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faHandFist, faHeart } from "@fortawesome/free-solid-svg-icons";

interface CharacterProps {
  _id?: string;
  name: string;
  race: string;
  realm: string;
  height: string;
}

interface ImageData {
  name: string;
  imageUrl: string;
}

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
});

const CharacterCard = (props: CharacterProps) => {
  const data: ImageData = imageData.find((item) => item.name === props.name)!;

  return (
    <Link
      href={`character/${props.name}`}
      style={{ textDecoration: "none" }}
      className={`${styles.wrapper} ${roboto.className}`}
    >
      <div className={`${styles.card} ${roboto.className}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "100%",
            marginBottom: 5,
          }}
        >
          <h3
            style={{
              fontWeight: 400,
              margin: 5,
              fontSize: 20,
            }}
          >
            {props.name}
          </h3>
          <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 20 }}>200</span>
            <FontAwesomeIcon icon={faHeart} style={{ height: 20 }} />
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
            <FontAwesomeIcon icon={faHandFist} style={{ height: 22 }} />
            <p>Elendil!</p>
            <span>40</span>
          </div>
          <div className={styles.block}>
            <FontAwesomeIcon icon={faBolt} style={{ height: 22 }} />
            <p>Army of Dead</p>
            <span>100</span>
          </div>
          <div className={styles.bottom}>
            <div className={styles.box}>
              <p style={{ fontWeight: 700 }}>Race</p>
              <p>{props.race}</p>
            </div>
            <div className={styles.box}>
              <p style={{ fontWeight: 700 }}>Height</p>
              <p>{props.height.substring(0, 20) || "Unknown"}</p>
            </div>
            <div className={styles.box}>
              <p style={{ fontWeight: 700 }}>Realm</p>
              <p>{props.realm.substring(0, 20) || "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

{
  /* <h4 style={{ fontWeight: 100, margin: 5 }}>{props.race}</h4> */
}

export default CharacterCard;
