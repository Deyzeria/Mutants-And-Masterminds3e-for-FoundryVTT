
/**
 * @type {{
 *  strength: {id: string, label: string, abbreviation: string},
 *  stamina: {id: string, label: string, abbreviation: string},
 *  agility: {id: string, label: string, abbreviation: string},
 *  dexterity: {id: string, label: string, abbreviation: string},
 *  fighting: {id: string, label: string, abbreviation: string},
 *  intelligence: {id: string, label: string, abbreviation: string},
 *  awareness: {id: string, label: string, abbreviation: string},
 *  presence: {id: string, label: string, abbreviation: string},
 * }}
 */
export const ABILITIES = Object.freeze({
  strength: {
    id: "strength",
    label: "ABILITIES.Strength",
    abbreviation: "ABLITIES.StrengthAbbr"
  },
  stamina: {
    id: "stamina",
    label: "ABILITIES.Stamina",
    abbreviation: "ABLITIES.StaminaAbbr"
  },
  agility: {
    id: "agility",
    label: "ABILITIES.Agility",
    abbreviation: "ABLITIES.AgilityAbbr"
  },
  dexterity: {
    id: "dexterity",
    label: "ABILITIES.Dexterity",
    abbreviation: "ABLITIES.DexterityAbbr"
  },
  fighting: {
    id: "fighting",
    label: "ABILITIES.Fighting",
    abbreviation: "ABLITIES.FightingAbbr"
  },
  intelligence: {
    id: "intelligence",
    label: "ABILITIES.Intelligence",
    abbreviation: "ABLITIES.IntelligenceAbbr"
  },
  awareness: {
    id: "awareness",
    label: "ABILITIES.Awareness",
    abbreviation: "ABLITIES.AwarenessAbbr"
  },
  presence: {
    id: "presence",
    label: "ABILITIES.Presence",
    abbreviation: "ABLITIES.PresenceAbbr"
  }
});

/**
 * @type {{ 
 *  dodge: {id: string, label: string, ability: string},
 *  parry: {id: string, label: string, ability: string},
 *  fortitude: {id: string, label: string, ability: string},
 *  toughness: {id: string, label: string, ability: string},
 *  will: {id: string, label: string, ability: string},
 * }}
 */
export const DEFENSES = {
  dodge: {
    id: "dodge",
    label: "DEFENSES.Dodge",
    ability: "agility"
  },
  parry: {
    id: "parry",
    label: "DEFENSES.Parry",
    ability: "fighting"
  },
  fortitude: {
    id: "fortitude",
    label: "DEFENSES.Fortitude",
    ability: "stamina"
  },
  toughness: {
    id: "toughness",
    label: "DEFENSES.Toughness",
    ability: "stamina"
  },
  will: {
    id: "will",
    label: "DEFENSES.Will",
    ability: "awareness"
  }
}

/**
 * @type {{
 *  athletics: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  acrobatics: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  closecombat: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  deception: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  expertise: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  insight: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  intimidation: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  investigation: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  perception: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  persuasion: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  rangedcombat: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  sleightofhand: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  stealth: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  technology: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  treatment: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 *  vehicles: {id: string, label: string, ability: string, customize: boolean, untrained: boolean},
 * }}
 */
export const SKILLS = {
  athletics: {
    id: "athletics",
    label: "SKILLS.Athletics",
    ability: "strength",
    customize: false,
    untrained: true
  },
  acrobatics: {
    id: "acrobatics",
    label: "SKILLS.Acrobatics",
    ability: "agility",
    customize: false,
    untrained: false
  },
  closecombat: {
    id: "closecombat",
    label: "SKILLS.CloseCombat",
    ability: "fighting",
    customize: true,
    untrained: true
  },
  deception: {
    id: "deception",
    label: "SKILLS.Deception",
    ability: "presence",
    customize: false,
    untrained: true
  },
  expertise: {
    id: "expertise",
    label: "SKILLS.Expertise",
    ability: "intelligence",
    customize: true,
    untrained: false
  },
  insight: {
    id: "insight",
    label: "SKILLS.Insight",
    ability: "awareness",
    customize: false,
    untrained: true
  },
  intimidation: {
    id: "intimidation",
    label: "SKILLS.Intimidation",
    ability: "presence",
    customize: false,
    untrained: true
  },
  investigation: {
    id: "investigation",
    label: "SKILLS.Investigation",
    ability: "intelligence",
    customize: false,
    untrained: false
  },
  perception: {
    id: "perception",
    label: "SKILLS.Perception",
    ability: "awareness",
    customize: false,
    untrained: true
  },
  persuasion: {
    id: "persuasion",
    label: "SKILLS.Persuasion",
    ability: "presence",
    customize: false,
    untrained: true
  },
  rangedcombat: {
    id: "rangedcombat",
    label: "SKILLS.RangedCombat",
    ability: "dexterity",
    customize: true,
    untrained: true
  },
  sleightofhand: {
    id: "sleightofhand",
    label: "SKILLS.SleightOfHand",
    ability: "dexterity",
    customize: false,
    untrained: false
  },
  stealth: {
    id: "stealth",
    label: "SKILLS.Stealth",
    ability: "agility",
    customize: false,
    untrained: true
  },
  technology: {
    id: "technology",
    label: "SKILLS.Technology",
    ability: "intelligence",
    customize: false,
    untrained: false
  },
  treatment: {
    id: "treatment",
    label: "SKILLS.Treatment",
    ability: "intelligence",
    customize: false,
    untrained: false
  },
  vehicles: {
    id: "vehicles",
    label: "SKILLS.Vehicles",
    ability: "dexterity",
    customize: false,
    untrained: false
  }
}

/**
 * @type {{
 *  walk: {id: string, label: string, icon: string},
 *  burrow: {id: string, label: string, icon: string},
 *  flight: {id: string, label: string, icon: string},
 *  leap: {id: string, label: string, icon: string},
 *  swim: {id: string, label: string, icon: string},
 *  teleport: {id: string, label: string, icon: string},
 * }}
 */
export const MOVEMENTS = {
  walk: {
    id: "walk",
    label: "MOVEMENTS.Walk",
    icon: `fa-solid fa-person-walking`
  },
  burrow: {
    id: "burrow",
    label: "MOVEMENTS.Burrow",
    icon: `fa-solid fa-archway`
  },
  flight: {
    id: "flight",
    label: "MOVEMENTS.Flight",
    icon: `fa-solid fa-feather`
  },
  leap: {
    id: "leap",
    label: "MOVEMENTS.Leap",
    icon: `fa-solid turn-up`
  },
  swim: {
    id: "swim",
    label: "MOVEMENTS.Swim",
    icon: `fa-solid fa-person-swimming`
  },
  teleport: {
    id: "teleport",
    label: "MOVEMENTS.Teleport",
    icon: `ra ra-player-teleport`
  },
}
