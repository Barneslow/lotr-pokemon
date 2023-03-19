import FightCard from "@/components/cards/FightCard";
import { Character } from "@/models/models";
import { Draggable } from "react-beautiful-dnd";

export interface DraggableCharacterProps {
  character: Character;
  index: number;
}

interface DraggableClickCharacterProps extends DraggableCharacterProps {
  onClick: () => void;
}

const DraggableCharacter = ({
  character,
  onClick,
  index,
}: DraggableClickCharacterProps) => {
  return (
    <Draggable draggableId={character._id} index={index}>
      {(provided, snapshot) => {
        return (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <FightCard onClick={onClick} character={character} />
          </li>
        );
      }}
    </Draggable>
  );
};

export default DraggableCharacter;
