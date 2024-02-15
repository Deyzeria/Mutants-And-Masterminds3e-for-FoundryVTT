import * as ATTRIBUTES from "./attributes.mjs";
import * as DETAILS from "./details.mjs";
import * as SCALE from "./scale.mjs";
export const SYSTEM_ID = "mnm3efvtt";

export const SYSTEM = {
  id: SYSTEM_ID,
  ABILITIES: ATTRIBUTES.ABILITIES,
  DEFENSES: ATTRIBUTES.DEFENSES,
  SKILLS: ATTRIBUTES.SKILLS,
  POINTS_PER_PL: DETAILS.POINTS_PER_PL,
  SKILLS_PER_PP: DETAILS.SKILLS_PER_PP,
  PASSIVE_BASE: DETAILS.PASSIVE_BASE,
  SCALE: {
    DISTANCE: SCALE.DISTANCE,
    MASS: SCALE.MASS,
    TIME: SCALE.TIME,
    VOLUME: SCALE.VOLUME
  }
}
