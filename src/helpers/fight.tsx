import { AttackingCharacter, Character } from "@/models/models";
import { getRandomEnemyAttack } from "./arrays";

export interface IAttackingAnimationProps {
  attacker: AttackingCharacter;
  target: Character;
}

export function enemiesAttackTurn(
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
