/**
 * Amount of points user acquires per power level rank 
 * @type {number}
 */
export const POINTS_PER_PL = 15;

/**
 * Amount of ranks of skill you can purchase per spent power point. 
 * @type {number}
 */
export const SKILLS_PER_PP = 2;

/**
 * Base for passive checks (skill mastery), AC
 * @type {number}
 */
export const PASSIVE_BASE = 10;

/**
 * @type {{
  * abilities: number,
  * defenses: number,
  * skills: number,
  * advantages: number,
  * powers: number
 * }}
 */
export const POWER_POINTS = {
  abilities: 0,
  defenses: 0,
  skills: 0,
  advantages: 0,
  powers: 0
}
