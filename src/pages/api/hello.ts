import { Character } from "@/models/models";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const config = {
  headers: { Authorization: "Bearer i7zQyVAkPwHh8ivp0c2S" },
};

export async function fetchAllCharacters(): Promise<Character[]> {
  const { data } = await axios(`https://the-one-api.dev/v2/character`, config);

  const includedNames = [
    "Aragorn II Elessar",
    "Legolas",
    "Gimli",
    "Gandalf",
    "Saruman",
    "Frodo Baggins",
    "Samwise Gamgee",
    "Meriadoc Brandybuck",
    "Peregrin Took",
    "Boromir",
    "Faramir",
    "Elrond",
    "Arwen",
    "Celeborn",
    "Damrod",
    "Dwalin",
    "Bombur",
    "Balin",
    "Fíli and Kíli",
    "Dori",
    "Nori",
    "Ori",
    "Glóin",
    "Bifur",
    "Bofur",
    "Thorin II Oakenshield",
    "Dáin II Ironfoot",
    "Elendil",
    "Gil-galad",
    "Glorfindel",
    "Helm Hammerhand",
    "Háma",
    "The King of the Dead",
    "Thranduil",
    "Galadriel",
    "Éomer",
    "Gollum",
    "Radagast",
    "Sauron",
    "Treebeard",
    "Witch-king of Angmar",
    "Mouth of Sauron",
    "Shelob",
    "Éowyn",
    "Haldir (Lorien)",
    "Mûmakil",
    "Ungoliant",
    "Shagrat",
    "Snaga",
    "Bolg",
    "Azog",
    "Sharku",
    "Gothmog",
    "Grishnákh",
    "Lugdush",
    "Uglúk",
    "Durin's Bane",
    "Gamling",
    "Théoden",
    "Isildur",
  ];

  const filteredData = data.docs.filter((obj: any) =>
    includedNames.includes(obj.name)
  );

  return filteredData;
}

export async function fetchCharacter(character: string): Promise<Character> {
  const { data } = await axios(
    `https://the-one-api.dev/v2/character?name=${character}`,
    config
  );

  return data.docs[0];
}

export async function fetchCharacterQuotes(id: string): Promise<string[]> {
  const { data } = await axios(
    `https://the-one-api.dev/v2/character/${id}/quote`,
    config
  );

  const quotes = data.docs.map((item: any) => item.dialog);

  console.log(quotes);

  return quotes;
}
