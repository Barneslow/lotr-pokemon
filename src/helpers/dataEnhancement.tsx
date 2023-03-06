import { Character } from "@/models/models";

export function dataEnhancement(array: Character[]): Character[] {
  const updatedArray = array.map((character: Character) => {
    if (character.name === "Aragorn II Elessar") {
      character.realm = "Arnor, Gondor";
      character.height = "6'6\"";
      character.mainAttack = { name: "Andúril", value: 50 };
      character.specialAttack = { name: "Army of the Dead", value: 200 };
      character.health = 500;
    }
    if (character.name === "Arwen") {
      character.realm = "Rivendell";
      character.height = "5'10\"";
      character.mainAttack = { name: "Hadhafang", value: 35 };
      character.specialAttack = { name: "Flood", value: 140 };
      character.health = 280;
    }

    if (character.name === "Frodo Baggins") {
      character.realm = "The Shire";
      character.height = "3'6\"";
      character.mainAttack = { name: "Sting", value: 30 };
      character.specialAttack = { name: "Invisibilty", value: 130 };
      character.health = 220;
    }

    if (character.name === "Balin") {
      character.realm = "Erebor";
      character.height = "4'6\"";
      character.mainAttack = { name: "Balin's Axe", value: 30 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 260;
    }

    if (character.name === "Bifur") {
      character.realm = "Blue Mountains";
      character.height = "4'5\"";
      character.mainAttack = { name: "Boar spear", value: 25 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 250;
    }

    if (character.name === "Bofur") {
      character.realm = "Blue Mountains";
      character.height = "4'8\"";
      character.mainAttack = { name: "Warhammer", value: 25 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 250;
    }

    if (character.name === "Bombur") {
      character.realm = "Erebor";
      character.height = "4'5\"";
      character.mainAttack = { name: "Flail", value: 25 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 230;
    }
    if (character.name === "Fíli and Kíli") {
      character.realm = "Erebor";
      character.height = "4'6\"";
      character.mainAttack = { name: "Dual Swords", value: 25 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 260;
    }

    if (character.name === "Boromir") {
      character.realm = "Gondor";
      character.height = "6'4\"";
      character.mainAttack = { name: "Broadsword", value: 50 };
      character.specialAttack = { name: "Horn of Gondor", value: 150 };
      character.health = 410;
    }

    if (character.name === "Meriadoc Brandybuck") {
      character.realm = "The Shire";
      character.height = "4'6\"";
      character.mainAttack = { name: "Barrow-blades", value: 20 };
      character.specialAttack = { name: "Rocks", value: 80 };
      character.health = 240;
    }

    if (character.name === "Celeborn") {
      character.realm = "Lothlórien";
      character.height = "6'4\"";
      character.mainAttack = { name: "Elvish Steel", value: 45 };
      character.specialAttack = { name: "Wisdom", value: 120 };
      character.health = 380;
    }

    if (character.name === "Damrod") {
      character.realm = "Gondor";
      character.height = "6'0\"";
      character.mainAttack = { name: "Bow", value: 25 };
      character.specialAttack = { name: "Ambush", value: 80 };
      character.health = 230;
    }

    if (character.name === "Dori") {
      character.realm = "Erebor";
      character.height = "4'5\"";
      character.mainAttack = { name: "Dwarven Axe", value: 25 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 240;
    }

    if (character.name === "Dwalin") {
      character.realm = "Erebor";
      character.height = "4'11\"";
      character.mainAttack = { name: "Dual Axes", value: 30 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 260;
    }

    if (character.name === "Dáin II Ironfoot") {
      character.realm = "Iron Hills";
      character.height = "4'5\"";
      character.mainAttack = { name: "Barazanthual", value: 35 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 300;
    }

    if (character.name === "Elrond") {
      character.height = "6'2\"";
      character.mainAttack = { name: "Hadhafang", value: 50 };
      character.specialAttack = { name: "Foresight", value: 140 };
      character.health = 420;
    }

    if (character.name === "Faramir") {
      character.realm = "Gondor";
      character.height = "6'4\"";
      character.mainAttack = { name: "Bow", value: 45 };
      character.specialAttack = { name: "Ambush", value: 120 };
      character.health = 370;
    }

    if (character.name === "Galadriel") {
      character.realm = "Lothlórien";
      character.height = "6'4\"";
      character.mainAttack = { name: "Wisdom", value: 55 };
      character.specialAttack = { name: "Nenya", value: 275 };
      character.health = 560;
    }

    if (character.name === "Samwise Gamgee") {
      character.realm = "The Shire";
      character.height = "4'0\"";
      character.mainAttack = { name: "Daggers of Westernesse", value: 40 };
      character.specialAttack = { name: "Stout Heart", value: 100 };
      character.health = 310;
    }
    if (character.name === "Gamling") {
      character.realm = "Rohan";
      character.height = "6'2\"";
      character.mainAttack = { name: "Shortsword", value: 25 };
      character.specialAttack = { name: "Standard Bearer", value: 90 };
      character.health = 240;
    }
    if (character.name === "Gil-galad") {
      character.realm = "Lindon";
      character.height = "7'0\"";
      character.mainAttack = { name: "Aeglos", value: 45 };
      character.specialAttack = { name: "High King", value: 140 };
      character.health = 450;
    }
    if (character.name === "Glorfindel") {
      character.realm = "Lindon";
      character.height = "6'8\"";
      character.mainAttack = { name: "Thorondún", value: 60 };
      character.specialAttack = { name: "Rebirth", value: 200 };
      character.health = 500;
    }
    if (character.name === "Elendil") {
      character.mainAttack = { name: "Narsil", value: 45 };
      character.specialAttack = { name: "Faithful", value: 150 };
      character.health = 440;
    }
    if (character.name === "Gimli") {
      character.realm = "Glittering Caves";
      character.height = "4'6\"";
      character.mainAttack = { name: "Balin's Axe", value: 50 };
      character.specialAttack = { name: "Let them come!", value: 140 };
      character.health = 500;
    }
    if (character.name === "Glóin") {
      character.realm = "Erebor";
      character.height = "4'7\"";
      character.mainAttack = { name: "Dwarven Axe", value: 30 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 260;
    }

    if (character.name === "Haldir (Lorien)") {
      character.realm = "Lothlórien";
      character.height = "6'2\"";
      character.mainAttack = { name: "Lorien Bow", value: 30 };
      character.specialAttack = { name: "Sniper", value: 90 };
      character.health = 300;
    }
    if (character.name === "Helm Hammerhand") {
      character.height = "6'0\"";
      character.mainAttack = { name: "Bare Hands", value: 45 };
      character.specialAttack = { name: "Horn of the Deep", value: 140 };
      character.health = 400;
    }
    if (character.name === "Háma") {
      character.height = "6'3\"";
      character.realm = "Rohan";
      character.mainAttack = { name: "Shortsword", value: 25 };
      character.specialAttack = { name: "Cavalry", value: 100 };
      character.health = 250;
    }
    if (character.name === "Legolas") {
      character.height = "6'1\"";
      character.realm = "Mirkwood";
      character.mainAttack = { name: "Bow of the Galadhrim", value: 50 };
      character.specialAttack = { name: "Double Arrow", value: 150 };
      character.health = 440;
    }
    if (character.name === "Isildur") {
      character.height = "7'1\"";
      character.mainAttack = { name: "Narsil", value: 50 };
      character.specialAttack = { name: "Saurons Bane", value: 135 };
      character.health = 480;
    }
    if (character.name === "Nori") {
      character.height = "4'5\"";
      character.realm = "Erebor";
      character.mainAttack = { name: "Dwarven Axe", value: 25 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 230;
    }
    if (character.name === "Ori") {
      character.height = "4'5\"";
      character.realm = "Erebor";
      character.mainAttack = { name: "Dwarven Axe", value: 25 };
      character.specialAttack = { name: "Dwarven Power", value: 25 };
      character.health = 240;
    }
    if (character.name === "The King of the Dead") {
      character.height = "6'0\"";
      character.realm = "White Mountains ";
      character.mainAttack = { name: "Ghostly Blade", value: 40 };
      character.specialAttack = { name: "Wind of the Mountain", value: 130 };
      character.health = 410;
    }
    if (character.name === "Thranduil") {
      character.height = "6'5\"";
      character.realm = "Mirkwood";
      character.mainAttack = { name: "Thranduil's sword", value: 40 };
      character.specialAttack = { name: "Scepter", value: 160 };
      character.health = 430;
    }
    if (character.name === "Thorin II Oakenshield") {
      character.height = "4'10\"";
      character.mainAttack = { name: "Orcrist", value: 35 };
      character.specialAttack = { name: "Oak Shield", value: 110 };
      character.health = 350;
    }
    if (character.name === "Théoden") {
      character.height = "6'2\"";
      character.realm = "Rohan";
      character.mainAttack = { name: "Herugrim", value: 35 };
      character.specialAttack = { name: "A Red Day", value: 150 };
      character.health = 380;
    }
    if (character.name === "Peregrin Took") {
      character.height = "4'5\"";
      character.realm = "The Shire";
      character.mainAttack = { name: "Barrow Blades", value: 20 };
      character.specialAttack = { name: "Rocks", value: 80 };
      character.health = 220;
    }
    if (character.name === "Gollum") {
      character.height = "3'6\"";
      character.realm = "The Shire";
      character.mainAttack = { name: "Sneak", value: 30 };
      character.specialAttack = { name: "Gollum", value: 90 };
      character.health = 250;
    }
    if (character.name === "Gandalf") {
      character.height = "5'6\"";
      character.realm = "Unknown";
      character.mainAttack = { name: "Glamdring", value: 50 };
      character.specialAttack = { name: "Narya", value: 250 };
      character.health = 460;
    }
    if (character.name === "Radagast") {
      character.height = "5'4\"";
      character.realm = "Unknown";
      character.mainAttack = { name: "Wizard Staff", value: 45 };
      character.specialAttack = { name: "Natures Call", value: 130 };
      character.health = 410;
    }
    if (character.name === "Saruman") {
      character.height = "5'9\"";
      character.realm = "Isengard";
      character.mainAttack = { name: "Wizard Staff", value: 50 };
      character.specialAttack = { name: "Dark Sorcery", value: 160 };
      character.health = 500;
    }
    if (character.name === "Sauron") {
      character.height = "9'2\"";
      character.realm = "Mordor";
      character.mainAttack = { name: "Mace", value: 100 };
      character.specialAttack = { name: "The One Ring", value: 400 };
      character.health = 750;
    }
    if (character.name === "Durin's Bane") {
      character.height = "20'0\"";
      character.realm = "Moria";
      character.mainAttack = { name: "Fiery sword", value: 75 };
      character.specialAttack = { name: "Fiery whip", value: 200 };
      character.health = 500;
    }
    if (character.name === "Treebeard") {
      character.realm = "Fangorn";
      character.mainAttack = { name: "Rock and Stone", value: 50 };
      character.specialAttack = { name: "Fangorn", value: 160 };
      character.health = 480;
    }
    if (character.name === "Mouth of Sauron") {
      character.height = "6'7\"";
      character.realm = "Mordor";
      character.mainAttack = { name: "Black Sword", value: 40 };
      character.specialAttack = { name: "Black Speech ", value: 120 };
      character.health = 340;
    }
    if (character.name === "Snaga") {
      character.height = "4'10\"";
      character.realm = "Cirith Ungol";
      character.mainAttack = { name: "Orc Scimitar", value: 20 };
      character.specialAttack = { name: "Rage", value: 60 };
      character.health = 200;
    }
    if (character.name === "Shelob") {
      character.height = "Enormous";
      character.realm = "Mordor";
      character.mainAttack = { name: "Webs", value: 45 };
      character.specialAttack = { name: "Venom", value: 170 };
      character.health = 440;
    }
    if (character.name === "Éowyn") {
      character.height = "5'10\"";
      character.realm = "Rohan";
      character.mainAttack = { name: "Shortsword", value: 35 };
      character.specialAttack = { name: "I am no man", value: 110 };
      character.health = 320;
    }
    if (character.name === "Éomer") {
      character.height = "6'6\"";
      character.mainAttack = { name: "Gúthwinë", value: 45 };
      character.specialAttack = { name: "Spear", value: 120 };
      character.health = 400;
    }
    if (character.name === "Bolg") {
      character.height = "8'6\"";
      character.realm = "Gundabad";
      character.mainAttack = { name: "Orc Blade", value: 25 };
      character.specialAttack = { name: "Gundabad Warg", value: 100 };
      character.health = 280;
    }
    if (character.name === "Mûmakil") {
      character.height = "Enormous";
      character.realm = "Harad";
      character.mainAttack = { name: "Stamp", value: 60 };
      character.specialAttack = { name: "Charge", value: 150 };
      character.health = 520;
    }
    if (character.name === "Grishnákh") {
      character.height = "5'0\"";
      character.realm = "Mordor";
      character.mainAttack = { name: "Orc Scimitar", value: 20 };
      character.specialAttack = { name: "Rage", value: 60 };
      character.health = 200;
    }
    if (character.name === "Gothmog") {
      character.height = "5'9\"";
      character.realm = "Mordor";
      character.mainAttack = { name: "Black Axe", value: 30 };
      character.specialAttack = { name: "Time of the Orc", value: 90 };
      character.health = 260;
    }
    if (character.name === "Witch-king of Angmar") {
      character.height = "7'1\"";
      character.realm = "Angmar";
      character.mainAttack = { name: "Morgul Blade", value: 45 };
      character.specialAttack = { name: "Great Mace", value: 170 };
      character.health = 470;
    }
    if (character.name === "Ungoliant") {
      character.realm = "Unknown";
      character.mainAttack = { name: "Web", value: 80 };
      character.specialAttack = { name: "Unlight", value: 220 };
      character.health = 620;
    }
    if (character.name === "Uglúk") {
      character.height = "6'6\"";
      character.mainAttack = { name: "Orc Scimitar", value: 25 };
      character.specialAttack = { name: "Orc Draught", value: 80 };
      character.health = 260;
    }
    if (character.name === "Lugdush") {
      character.height = "6'1\"";
      character.realm = "Isengard";
      character.mainAttack = { name: "Orc Scimitar", value: 25 };
      character.specialAttack = { name: "Orc Draught", value: 80 };
      character.health = 250;
    }
    if (character.name === "Shagrat") {
      character.mainAttack = { name: "Orc Blade", value: 20 };
      character.specialAttack = { name: "Brute", value: 80 };
      character.health = 250;
    }
    if (character.name === "Azog") {
      character.height = "8'5\"";
      character.realm = "Gundabad";
      character.mainAttack = { name: "War Mace ", value: 35 };
      character.specialAttack = { name: "Gundabad Warg", value: 110 };
      character.health = 300;
    }
    if (character.name === "Sharku") {
      character.height = "5'0\"";
      character.realm = "Isengard";
      character.mainAttack = { name: "Orc Scimitar", value: 20 };
      character.specialAttack = { name: "Warg Rider", value: 70 };
      character.health = 200;
    }
    if (character.name === "Khamûl") {
      character.height = "7'1\"";
      character.realm = "Rhûn";
      character.mainAttack = { name: "Pike", value: 35 };
      character.specialAttack = { name: "Chariot", value: 130 };
      character.health = 400;
    }
    if (character.name === "Black Serpent") {
      character.height = "6'0\"";
      character.realm = "Harad";
      character.mainAttack = { name: "Standard Bearer", value: 20 };
      character.specialAttack = { name: "Mûmakil", value: 140 };
      character.health = 380;
    }

    return character;
  });

  return updatedArray;
}
