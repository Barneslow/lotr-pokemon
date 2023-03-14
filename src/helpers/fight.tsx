import { AttackingCharacter, Character } from "@/models/models";
import { getRandomEnemyAttack } from "./arrays";

export interface IEnemyAttack {
  enemyAttack: AttackingCharacter;
  target: Character;
}

export function enemiesAttackTurn(
  team: Character[],
  enemy: Character[]
): IEnemyAttack {
  const aliveEnemies = enemy.filter((char) => char.health > 0);
  const enemyAttack = getRandomEnemyAttack(aliveEnemies);

  const aliveTeam = team.filter((char) => char.health > 0);

  const randomTeamMate =
    aliveTeam[Math.floor(Math.random() * aliveTeam.length)];

  randomTeamMate.health = randomTeamMate.health - enemyAttack.attack.value;

  return { enemyAttack, target: randomTeamMate };
}
