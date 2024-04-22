export const statusEffectsArray = [
  {
    id: "asleep",
    label: "EFFECT.NAME.Asleep",
    icon: "systems/mnm3efvtt/icons/statuses/asleep.svg"
  },
  {
    id: "blind",
    label: "EFFECT.NAME.Blind",
    icon: "systems/mnm3efvtt/icons/statuses/blinded.svg"
  },
  {
    id: "bound",
    label: "EFFECT.NAME.Bound",
    icon: "systems/mnm3efvtt/icons/statuses/bound.svg"
  },
  {
    id: "compelled",
    label: "EFFECT.NAME.Compelled",
    icon: "systems/mnm3efvtt/icons/statuses/compelled.svg"
  },
  {
    id: "controlled",
    label: "EFFECT.NAME.Controlled",
    icon: "systems/mnm3efvtt/icons/statuses/controlled.svg"
  },
  {
    id: "dazed",
    label: "EFFECT.NAME.Dazed",
    icon: "systems/mnm3efvtt/icons/statuses/dazed.svg"
  },
  {
    id: "deaf",
    label: "EFFECT.NAME.Deaf",
    icon: "systems/mnm3efvtt/icons/statuses/deaf.svg"
  },
  {
    id: "debilitated",
    label: "EFFECT.NAME.Debilitated",
    icon: "systems/mnm3efvtt/icons/statuses/debilitated.svg"
  },
  {
    id: "defenseless",
    label: "EFFECT.NAME.Defenseless",
    icon: "systems/mnm3efvtt/icons/statuses/defenseless.svg"
  },
  {
    id: "disabled",
    label: "EFFECT.NAME.Disabled",
    icon: "systems/mnm3efvtt/icons/statuses/disabled.svg"
  },
  {
    id: "dying",
    label: "EFFECT.NAME.Dying",
    icon: "systems/mnm3efvtt/icons/statuses/dying.svg"
  },
  {
    id: "entranced",
    label: "EFFECT.NAME.Entranced",
    icon: "systems/mnm3efvtt/icons/statuses/entranced.svg"
  },
  {
    id: "exhausted",
    label: "EFFECT.NAME.Exhausted",
    icon: "systems/mnm3efvtt/icons/statuses/exhausted.svg"
  },
  {
    id: "fatigued",
    label: "EFFECT.NAME.Fatigued",
    icon: "systems/mnm3efvtt/icons/statuses/fatigued.svg"
  },
  {
    id: "hindered",
    label: "EFFECT.NAME.Hindered",
    icon: "systems/mnm3efvtt/icons/statuses/hindered.svg"
  },
  {
    id: "immobile",
    label: "EFFECT.NAME.Immobile",
    icon: "systems/mnm3efvtt/icons/statuses/immobile.svg"
  },
  {
    id: "impaired",
    label: "EFFECT.NAME.Impaired",
    icon: "systems/mnm3efvtt/icons/statuses/impaired.svg"
  },
  {
    id: "incapacitated",
    label: "EFFECT.NAME.Incapacitated",
    icon: "systems/mnm3efvtt/icons/statuses/incapacitated.svg"
  },
  {
    id: "paralyzed",
    label: "EFFECT.NAME.Paralyzed",
    icon: "systems/mnm3efvtt/icons/statuses/paralyzed.svg"
  },
  {
    id: "prone",
    label: "EFFECT.NAME.Prone",
    icon: "systems/mnm3efvtt/icons/statuses/prone.svg"
  },
  {
    id: "restrained",
    label: "EFFECT.NAME.Restrained",
    icon: "systems/mnm3efvtt/icons/statuses/restrained.svg"
  },
  {
    id: "staggered",
    label: "EFFECT.NAME.Staggered",
    icon: "systems/mnm3efvtt/icons/statuses/staggered.svg"
  },
  {
    id: "stunned",
    label: "EFFECT.NAME.Stunned",
    icon: "systems/mnm3efvtt/icons/statuses/stunned.svg"
  },
  {
    id: "surprised",
    label: "EFFECT.NAME.Surprised",
    icon: "systems/mnm3efvtt/icons/statuses/surprised.svg"
  },
  {
    id: "transformed",
    label: "EFFECT.NAME.Transformed",
    icon: "systems/mnm3efvtt/icons/statuses/transformed.svg"
  },
  {
    id: "unaware",
    label: "EFFECT.NAME.Unaware",
    icon: "systems/mnm3efvtt/icons/statuses/unaware.svg"
  },
  {
    id: "vulnerable",
    label: "EFFECT.NAME.Vulnerable",
    icon: "systems/mnm3efvtt/icons/statuses/vulnerable.svg"
  },
  {
    id: "weakened",
    label: "EFFECT.NAME.Weakened",
    icon: "systems/mnm3efvtt/icons/statuses/weakened.svg"
  },

]

/**
 * Primary object for accessign specific Status Effects.
 * Rank referes to ranks as per Affliction effect, so they can be easily searchable. 
 * @type {{label: string, description: string, rank: number, includes: Object<string, {subtype?: string, mandatory?: boolean}>, debilitatedby: string, subtype: boolean}}
 */
export const STATUSEFFECTS = {
  asleep: {
    label: "EFFECT.NAME.Asleep",
    description: "EFFECT.DESCRIPTION.Asleep",
    rank: 3,
    includes: { "defenseless": {}, "stunned": {}, "unaware": {} },
    debilitatedby: null,
    subtype: false
  },
  blind: {
    label: "EFFECT.NAME.Blind",
    description: "EFFECT.DESCRIPTION.Blind",
    rank: 0,
    includes: { "hindered": {}, "unaware": { subtype: "visual" }, "vulnerable": {} },
    debilitatedby: null,
    subtype: false
  },
  bound: {
    label: "EFFECT.NAME.Bound",
    description: "EFFECT.DESCRIPTION.Bound",
    rank: 0,
    includes: { "defenseless": {}, "immobile": {}, "impaired": {} },
    debilitatedby: null,
    subtype: false
  },
  compelled: {
    label: "EFFECT.NAME.Compelled",
    description: "EFFECT.DESCRIPTION.Compelled",
    rank: 2,
    includes: null,
    debilitatedby: "controlled",
    subtype: false
  },
  controlled: {
    label: "EFFECT.NAME.Controlled",
    description: "EFFECT.DESCRIPTION.Controlled",
    rank: 3,
    includes: null,
    debilitatedby: null,
    subtype: false
  },
  dazed: {
    label: "EFFECT.NAME.Dazed",
    description: "EFFECT.DESCRIPTION.Dazed",
    rank: 1,
    includes: null,
    debilitatedby: "stunned",
    subtype: false
  },
  deaf: {
    label: "EFFECT.NAME.Deaf",
    description: "EFFECT.DESCRIPTION.Deaf",
    rank: 0,
    includes: { "unaware": { subtype: "auditory" } },
    debilitatedby: null,
    subtype: false
  },
  debilitated: {
    label: "EFFECT.NAME.Debilitated",
    description: "EFFECT.DESCRIPTION.Debilitated",
    rank: 0,
    includes: null,
    debilitatedby: null,
    subtype: true
  },
  defenseless: {
    label: "EFFECT.NAME.Defenseless",
    description: "EFFECT.DESCRIPTION.Defenseless",
    rank: 2,
    includes: null,
    debilitatedby: { "prone": { mandatory: false } },
    subtype: false
  },
  disabled: {
    label: "EFFECT.NAME.Disabled",
    description: "EFFECT.DESCRIPTION.Disabled",
    rank: 2,
    includes: null,
    debilitatedby: "debilitated",
    subtype: true
  },
  dying: {
    label: "EFFECT.NAME.Dying",
    description: "EFFECT.DESCRIPTION.Dying",
    rank: 0,
    includes: { "incapacitated": {} },
    debilitatedby: null,
    subtype: false
  },
  entranced: {
    label: "EFFECT.NAME.Entranced",
    description: "EFFECT.DESCRIPTION.Entranced",
    rank: 1,
    includes: { "stunned": {} },
    debilitatedby: null,
    subtype: false
  },
  exhausted: {
    label: "EFFECT.NAME.Exhausted",
    description: "EFFECT.DESCRIPTION.Exhausted",
    rank: 2,
    includes: { "impaired": {}, "hindered": {} },
    debilitatedby: null,
    subtype: false
  },
  fatigued: {
    label: "EFFECT.NAME.Fatigued",
    description: "EFFECT.DESCRIPTION.Fatigued",
    rank: 1,
    includes: { "hindered": {} },
    debilitatedby: null,
    subtype: false
  },
  hindered: {
    label: "EFFECT.NAME.Hindered",
    description: "EFFECT.DESCRIPTION.Hindered",
    rank: 1,
    includes: null,
    debilitatedby: "immobile",
    subtype: false
  },
  immobile: {
    label: "EFFECT.NAME.Immobile",
    description: "EFFECT.DESCRIPTION.Immobile",
    rank: 2,
    includes: null,
    debilitatedby: null,
    subtype: false
  },
  impaired: {
    label: "EFFECT.NAME.Impaired",
    description: "EFFECT.DESCRIPTION.Impaired",
    rank: 1,
    includes: null,
    debilitatedby: "disabled",
    subtype: true
  },
  incapacitated: {
    label: "EFFECT.NAME.Incapacitated",
    description: "EFFECT.DESCRIPTION.Incapacitated",
    rank: 3,
    includes: { "defenseless": {}, "stunned": {}, "unaware": {}, "prone": { mandatory: false } },
    debilitatedby: null,
    subtype: false
  },
  paralyzed: {
    label: "EFFECT.NAME.Paralyzed",
    description: "EFFECT.DESCRIPTION.Paralyzed",
    rank: 3,
    includes: { "defenseless": {}, "immobile": {}, "stunned": { subtype: "physical" } },
    debilitatedby: null,
    subtype: false
  },
  prone: {
    label: "EFFECT.NAME.Prone",
    description: "EFFECT.DESCRIPTION.Prone",
    rank: 2,
    includes: { "hindered": {} },
    debilitatedby: null,
    subtype: false
  },
  restrained: {
    label: "EFFECT.NAME.Restrained",
    description: "EFFECT.DESCRIPTION.Restrained",
    rank: 0,
    includes: { "hindered": { mandatory: false }, "immobile": { mandatory: false }, "vulnerable": {} },
    debilitatedby: null,
    subtype: false
  },
  staggered: {
    label: "EFFECT.NAME.Staggered",
    description: "EFFECT.DESCRIPTION.Staggered",
    rank: 0,
    includes: { "dazed": {}, "hindered": {} },
    debilitatedby: null,
    subtype: false
  },
  stunned: {
    label: "EFFECT.NAME.Stunned",
    description: "EFFECT.DESCRIPTION.Stunned",
    rank: 2,
    includes: null,
    debilitatedby: null,
    subtype: false
  },
  surprised: {
    label: "EFFECT.NAME.Surprised",
    description: "EFFECT.DESCRIPTION.Surprised",
    rank: 0,
    includes: { "stunned": {}, "vulnerable": {} },
    debilitatedby: null,
    subtype: false
  },
  transformed: {
    label: "EFFECT.NAME.Transformed",
    description: "EFFECT.DESCRIPTION.Transformed",
    rank: 3,
    includes: null,
    debilitatedby: null,
    subtype: true
  },
  unaware: {
    label: "EFFECT.NAME.Unaware",
    description: "EFFECT.DESCRIPTION.Unaware",
    rank: 3,
    includes: null,
    debilitatedby: null,
    subtype: true
  },
  vulnerable: {
    label: "EFFECT.NAME.Vulnerable",
    description: "EFFECT.DESCRIPTION.Vulnerable",
    rank: 1,
    includes: null,
    debilitatedby: "defenseless",
    subtype: false
  },
  weakened: {
    label: "EFFECT.NAME.Weakened",
    description: "EFFECT.DESCRIPTION.Weakened",
    rank: 0,
    includes: null,
    debilitatedby: "debilitated",
    subtype: true
  },
}
