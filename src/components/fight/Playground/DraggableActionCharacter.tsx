import ActionCard from "@/components/cards/ActionCard";
import { Draggable } from "react-beautiful-dnd";
import { DraggableCharacterProps } from "./DraggableCharacter";

const DraggableActionCharacter = ({
  character,
  index,
}: DraggableCharacterProps) => {
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
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default DraggableActionCharacter;
