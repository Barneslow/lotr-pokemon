export interface Character {
  _id: string;
  height: string;
  race: string;
  mainAttack?: Attack;
  specialAttack?: Attack;
  gender: string;
  birth?: string;
  death?: string;
  name: string;
  realm: string;
  hair?: string;
  spouse?: string;
  wikiUrl: string;
}

export interface Attack {
  name: string;
  value: number;
}
