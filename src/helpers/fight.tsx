import { Attack, Character } from "@/models/models";
import { getRandomEnemyAttack } from "./arrays";

export function enemiesAttackTurn(
  team: Character[],
  enemy: Character[]
): Attack {
  const aliveEnemies = enemy.filter((char) => char.health > 0);
  const enemyAttack = getRandomEnemyAttack(aliveEnemies);

  const aliveTeam = team.filter((char) => char.health > 0);

  const randomTeamMate =
    aliveTeam[Math.floor(Math.random() * aliveTeam.length)];

  randomTeamMate.health = randomTeamMate.health - enemyAttack.value;

  return enemyAttack;
}
