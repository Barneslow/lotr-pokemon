import { AttackingCharacter, Character } from "@/models/models";

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function randomFromArray(array: any[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function randomFiveFromArray(array: any[]) {
  let randomItems = [];

  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    randomItems.push(array.splice(randomIndex, 1)[0]);
  }

  return randomItems;
}

export function getRandomEnemyAttack(array: Character[]): AttackingCharacter {
  const randomCharacter = array[Math.floor(Math.random() * array.length)];

  const randomAttack =
    Math.random() < 0.5
      ? randomCharacter.specialAttack
      : randomCharacter.mainAttack;

  return { attack: randomAttack, name: randomCharacter.name };
}
