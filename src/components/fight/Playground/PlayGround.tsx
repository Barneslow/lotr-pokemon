import ActionCard from "@/components/cards/ActionCard";
import { FightContext } from "@/context/FightContext";
import { Character } from "@/models/models";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableActionCharacter from "./DraggableActionCharacter";
import DraggableCharacter from "./DraggableCharacter";

import styles from "./Playground.module.css";

const reorder = (list: Character[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type DroppableZonesProps = {
  randomAttacker: Character | undefined;
  children: ReactNode;
};
const DroppableZones = ({ children, randomAttacker }: DroppableZonesProps) => {
  const { team, updateAttackingCharacter } = useContext(FightContext);
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

  useEffect(() => {
    updateAttackingCharacter(undefined);
  }, [inPlayCharacter]);

  function setInPlayCharacterClickHandler(character: Character) {
    const newTeamArray = Array.from(teamArray);

    const updatedArray = newTeamArray.filter(
      (char) => char.name !== character.name
    );

    setTeamArray([...updatedArray, ...inPlayCharacter]);

    setInPlayCharacter([character]);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.wrapper}>
        <div className={styles["fight-area"]}>
          <div className={styles["fight-zone-container"]}>
            <Droppable droppableId="droppable1">
              {(provided, snapshot) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`${styles["fight-zone"]} ${
                    snapshot.isDraggingOver && styles.hover
                  }`}
                >
                  {inPlayCharacter.map((character, index) => (
                    <DraggableActionCharacter
                      character={character}
                      index={index}
                      key={character._id}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            {randomAttacker && (
              <div className={styles["fight-zone"]}>
                <ActionCard character={randomAttacker} />
              </div>
            )}
          </div>
        </div>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => {
            return (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${styles.container} ${
                  snapshot.isDraggingOver && styles.hover
                }`}
              >
                {teamArray.map((character, index) => (
                  <DraggableCharacter
                    index={index}
                    character={character}
                    key={character._id}
                    onClick={() => setInPlayCharacterClickHandler(character)}
                  />
                ))}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
        {children}
      </div>
    </DragDropContext>
  );
};

export default DroppableZones;
