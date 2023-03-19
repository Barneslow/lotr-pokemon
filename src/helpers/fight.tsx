import { AttackingCharacter, Character } from "@/models/models";
import originalData from "../assets/data/myFile.json";
import { getRandomEnemyAttack } from "./arrays";

export interface IAttackingAnimationProps {
  attacker: AttackingCharacter;
  target: Character;
}

export function randomEnemyAttackTurn(
  team: Character[],
  enemy: Character[]
): IAttackingAnimationProps {
  const aliveEnemies = enemy.filter((char) => char.health > 0);
  const enemyAttack = getRandomEnemyAttack(aliveEnemies);

  const aliveTeam = team.filter((char) => char.health > 0);

  const randomTeamMate =
    aliveTeam[Math.floor(Math.random() * aliveTeam.length)];

  randomTeamMate.health = randomTeamMate.health - enemyAttack.attack.value;

  return { attacker: enemyAttack, target: randomTeamMate };
}

export function selectedEnemyAttackTurn(
  unit: Character,
  enemy: Character
): IAttackingAnimationProps {
  const randomAttack =
    Math.random() < 0.5 ? enemy.specialAttack : enemy.mainAttack;

  const enemyAttack = { name: enemy.name, attack: randomAttack };

  return { attacker: enemyAttack, target: unit };
}

export function animationTimer(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isOdd(n: number) {
  return Math.abs(n % 2) == 1;
}

export function calculatePercentage(max: number, value: number): number {
  const parts = 100 / max;
  const percentage = value * parts;

  return percentage;
}

export function calculateAttackTimeRemaining(character: Character) {
  const specialPower = calculatePercentage(
    character.specialAttack.disabledFor,
    character.specialAttack.disabledTurns
  );

  const mainPower = calculatePercentage(
    character.mainAttack.disabledFor,
    character.mainAttack.disabledTurns
  )!;

  return { mainPower, specialPower };
}

export function calculateCharacterHealth(character: Character) {
  const { health } = originalData.find((char) => char.name === character.name)!;

  const percentage = 100 - (character.health / health) * 100;

  return percentage;
}
