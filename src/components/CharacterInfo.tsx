import { CharacterCardProps } from "./cards/ActionCard";
import { motion } from "framer-motion";

import styles from "./CharacterInfo.module.css";

interface Iterator {
  [key: string]: any;
}

function* iterateObject(obj: Iterator): IterableIterator<[string, any]> {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    yield [keys[i], obj[keys[i]]];
  }
}

const CharacterInfo = ({ character }: CharacterCardProps) => {
  const iterableCharacter = iterateObject(character);

  const traitArray = Array.from(iterableCharacter);

  return (
    <>
      <div className={styles.container}>
        {traitArray.map((trait) => (
          <div className={styles.item}>
            <h4 className={styles.title}> {trait[0]}</h4>
            <span>{trait[1] || "unknown"}</span>
          </div>
        ))}
        <motion.a
          whileHover={{ scale: 1.01, background: "white" }}
          whileTap={{ scale: 0.95 }}
          target="_blank"
          className={styles.button}
          href={character.wikiUrl}
        >
          Find out More
        </motion.a>
      </div>
    </>
  );
};

export default CharacterInfo;
