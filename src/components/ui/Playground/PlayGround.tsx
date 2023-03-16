import ActionCard from "@/components/cards/ActionCard";
import FightCard from "@/components/cards/FightCard";
import { FightContext } from "@/context/FightContext";
import { Character } from "@/models/models";
import React, { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DUMMY_CHARACTER } from "../DummyEnemies";

import styles from "./Playground.module.css";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Playground = () => {
  const { team } = useContext(FightContext);
  const [inPlayCharacter, setInPlayCharacter] = useState<Character[]>([]);
  const [teamArray, setTeamArray] = useState<Character[]>(team);

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === "droppable2" &&
      destination.droppableId === "droppable2"
    ) {
      const newOrder = reorder(teamArray, source.index, destination.index);

      setTeamArray(newOrder);
    }

    if (
      destination.droppableId === "droppable1" &&
      inPlayCharacter.length >= 1
    ) {
      const newSelected = teamArray.filter(
        (character) => character._id === draggableId
      )!;

      const cardItems = teamArray.filter(
        (character) => character._id !== draggableId
      );

      setTeamArray([...cardItems, inPlayCharacter[0]]);
      setInPlayCharacter(newSelected);

      return;
    }

    if (
      source.droppableId === "droppable1" &&
      destination.droppableId === "droppable2"
    ) {
      const newCharacter = Array.from(inPlayCharacter);
      const [removed] = newCharacter.splice(source.index, 1);
      setInPlayCharacter(newCharacter);

      const newTeamArray = Array.from(teamArray);
      newTeamArray.splice(destination.index, 0, removed);
      setTeamArray(newTeamArray);
    } else if (
      source.droppableId === "droppable2" &&
      destination.droppableId === "droppable1"
    ) {
      const newTeamArray = Array.from(teamArray);
      const [removed] = newTeamArray.splice(source.index, 1);
      setTeamArray(newTeamArray);

      const newCharacter = Array.from(inPlayCharacter);
      newCharacter.splice(destination.index, 0, removed);
      setInPlayCharacter(newCharacter);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.wrapper}>
        <Droppable droppableId="droppable1">
          {(provided, snapshot) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${styles["fight-area"]} ${
                snapshot.isDraggingOver && styles.hover
              }`}
            >
              {inPlayCharacter.map((character, index) => (
                <Draggable
                  key={character._id}
                  draggableId={character._id}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <ActionCard character={character} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <Droppable droppableId="droppable2" direction="horizontal">
          {(provided, snapshot) => {
            return (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${styles.list} ${
                  snapshot.isDraggingOver && styles.hover
                }`}
              >
                {teamArray.map((character, index) => (
                  <Draggable
                    key={character._id}
                    draggableId={character._id}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <FightCard character={character} />
                        </li>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Playground;
