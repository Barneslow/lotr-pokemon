import { Roboto } from "next/font/google";
import CardContent from "./CardContent";
import { CharacterProps } from "./CharacterCard";
import { motion } from "framer-motion";

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  subsets: ["latin"],
});

const ChosenCard = (props: CharacterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "lightgrey",
        padding: ".5rem",
        borderRadius: 10,
        fontSize: 12,
      }}
      className={roboto.className}
    >
      <CardContent
        _id={props._id}
        name={props.name}
        race={props.race}
        realm={props.realm}
        height={props.height}
        mainAttack={props.mainAttack}
        specialAttack={props.specialAttack}
        health={props.health}
      />
    </motion.div>
  );
};

export default ChosenCard;
