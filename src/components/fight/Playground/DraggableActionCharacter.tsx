import ActionCard from "@/components/cards/ActionCard";
import { AttackingCharacter } from "@/models/models";
import { Draggable } from "react-beautiful-dnd";
import { DraggableCharacterProps } from "./DraggableCharacter";

interface DrabbleActionCharacterProps extends DraggableCharacterProps {
  fight: (attackingCharacter: AttackingCharacter) => Promise<void>;
}

const DraggableActionCharacter = ({
  character,
  index,
  fight,
}: DrabbleActionCharacterProps) => {
  return (
    <Draggable draggableId={character._id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ActionCard
              character={character}
              stroke="3px solid rgb(50, 177, 50)"
              fight={fight}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default DraggableActionCharacter;
