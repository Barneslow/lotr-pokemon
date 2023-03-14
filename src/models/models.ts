export interface Character {
  _id: string;
  height: string;
  race: string;
  mainAttack: Attack;
  specialAttack: Attack;
  health: number;
  gender?: string;
  birth?: string;
  death?: string;
  name: string;
  realm: string;
  hair?: string;
  spouse?: string;
  wikiUrl?: string;
}

export interface Attack {
  name: string;
  value: number;
}

export interface CharacterObjectProps {
  character: {
    _id: string;
    name: string;
    race: string;
    realm: string;
    height: string;
    mainAttack: Attack;
    specialAttack: Attack;
    health: number;
  };
}

export interface AttackingCharacter {
  attack: Attack;
  name: string;
}
