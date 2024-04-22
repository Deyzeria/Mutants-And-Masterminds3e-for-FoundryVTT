/**
 * @typedef {Object} MNMActorAbility
 * @property {number} rank Purchased ranks
 * @property {number} misc Misc additions per user's choice
 * @property {number} [auto]
 * @property {number} [total]
 * @property {number} [spent]
 */

/**
 * @typedef {Object} MNMActorDefense
 * @property {number} rank Purchased ranks
 * @property {number} misc Misc additions per user's choice
 * @property {number} [ability]
 * @property {number} [auto]
 * @property {number} [total]
 * @property {number} [spent]
 * @property {number} [armor]
 * @property {boolean} [immune]
 * @property {number} [impervious]
 */

/**
 * @typedef {Object} MNMActorSkill
 * @property {number} rank Purchased ranks
 * @property {number} misc Misc additions per user's choice
 * @property {boolean} mastery If user has mastery in a skill
 * @property {number} [ability]
 * @property {number} [auto]
 * @property {number} [total]
 * @property {number} [spent]
 */

/**
 * This class defines data schema, methods, and properties shared by all Actor subtypes in the Mutants and Masterminds system.
 * 
 * @property {Object<string, MNMActorAbility>} abilities
 * @property {Object<string, MNMActorDefense>} defenses
 * @property {Object<string, MNMActorSkill>} skills
 */
export default class MutantsAndMastermindsActorType extends foundry.abstract.TypeDataModel {

  /**
   * Define shared schema elements used by every Actor sub-type in MnM.
   * This method is extended by subclasses to add type-specific fields.
   * @override
   */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    // Ability scores
    schema.abilities = new fields.SchemaField(Object.values(SYSTEM.ABILITIES).reduce((obj, ability) => {
      obj[ability.id] = new fields.SchemaField({
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 }),
        misc: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 })
      }, { label: ability.label });
      return obj;
    }, {}));

    // Defenses
    schema.defenses = new fields.SchemaField(Object.values(SYSTEM.DEFENSES).reduce((obj, defense) => {
      obj[defense.id] = new fields.SchemaField({
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 }),
        misc: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 })
      }, { label: defense.label });
      return obj;
    }, {}));

    // Skills
    schema.skills = new fields.SchemaField(Object.values(SYSTEM.SKILLS).reduce((obj, skill) => {
      obj[skill.id] = new fields.SchemaField({
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 }),
        misc: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 }),
        speciality: new fields.StringField({ required: false, initial: undefined, blank: false }),
        mastery: new fields.BooleanField()
      }, { label: skill.label });
      return obj;
    }, {}));

    // Movements
    schema.movements = new fields.SchemaField(Object.values(SYSTEM.MOVEMENTS).reduce((obj, movement) => {
      obj[movement.id] = new fields.SchemaField({
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: -5 })
      }, { label: movement.label });
      return obj;
    }, {}));

    schema.status = new fields.ObjectField({nullable: true, initial: null});

    return schema;
  }


  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Base data preparation workflows used by all Actor subtypes.
   * @override
   */
  prepareBaseData() {
    this.status ||= {};
    this._prepareDetails();
    this._prepareAbilities();
    this._prepareDefenses();
    this._prepareSkills();
  }

  /**
   * Prepare creature details for all Actor subtypes.
   * @protected
   */
  _prepareDetails() {

  }

  /* -------------------------------------------- */

  /**
   * Prepare ability scores for all Actor subtypes.
   * @protected
   */
  _prepareAbilities() {
    for (const ability of Object.entries(this.abilities)) {
      this._prepareAbility(...ability);
    }
  }

  /**
   * Prepare single Ability for all Actor types
   * @param {MNMActorAbility} ability 
   */
  _prepareAbility(abilityId, ability) {
    const rank = ability.rank ||= 0;

    ability.misc ||= 0;

    // TODO: Maximum -10
    ability.spent = Math.max(rank * 2, -10);
  }

  /* -------------------------------------------- */

  /**
   * Prepare ability scores for all Actor subtypes.
   * @protected
   */
  _prepareDefenses() {
    for (const defense of Object.entries(this.defenses)) {
      this._prepareDefense(...defense);
    }
  }

  /**
   * Prepare a single Defense for all Actor subtypes.
   * @param {string} defenseId          ID of a defense being configured
   * @param {MNMActorDefense} defense   Source data of the defense being configured
   */
  _prepareDefense(defenseId, defense) {
    const rank = defense.rank ||= 0;
    defense.misc ||= 0;

    defense.spent = rank;
    defense.immune ||= false;
    defense.impervious ||= 0;
  }

  /* -------------------------------------------- */

  /**
   * Prepare skills data for all Actor subtypes.
   * @protected
   */
  _prepareSkills() {
    for (const skill of Object.entries(this.skills)) {
      this._prepareSkill(...skill);
    }
  }

  /**
   * Prepare a single Skill for all Actor subtypes.
   * @param {string} skillId          ID of a skill being configured
   * @param {MNMActorSkill} skill     Source data of the skill being configured
   * @protected
   */
  _prepareSkill(skillId, skill) {
    const config = SYSTEM.SKILLS[skillId];
    const rank = skill.rank ||= 0;
    skill.misc ||= 0;

    skill.spent = rank / SYSTEM.SKILLS_PER_PP;
  }

  /**
   * Derived data preparation workflows used by all Actor subtypes.
   * @override
   */
  prepareDerivedData() {
    this.#prepareAbilities();
    this.#prepareDefenses();
    this.#prepareSkills();

    //this.#prepareMovement();
  }

  #prepareAbilities() {
    const { enhanced } = this.parent;

    for (const [id, ability] of Object.entries(this.abilities)) {
      const auto = ability.auto = enhanced[id] ?? 0;
      ability.total = ability.rank + ability.misc + auto;
    }
  }

  #prepareDefenses() {
    const { enhanced } = this.parent;

    for (const [id, defense] of Object.entries(this.defenses)) {
      // TODO: check if id exists here or how to get it
      const config = SYSTEM.DEFENSES[id];

      let auto = defense.auto = enhanced[id] ?? 0;
      let abonus = defense.ability = this.abilities[config.ability].total;
      let total = defense.total = defense.rank + defense.misc + abonus + auto;
      defense.armor = SYSTEM.PASSIVE_BASE + total;
    }
  }

  #prepareSkills() {
    const { enhanced } = this.parent;
    const skills = this.skills;

    for (const [id, skill] of Object.entries(skills)) {
      const config = SYSTEM.SKILLS[id];

      // TODO: I only need to get system.abilities[config.ability].total
      const abonus = skill.ability = this.abilities[config.ability].total;
      const auto = skill.auto = enhanced[id] ?? 0;
      skill.total = skill.rank + skill.misc + abonus + auto;
    }
  }

  #prepareMovement() {
    const { movementPowers } = this.parent;
    const movements = this.movement;
    const speedValues = game.settings.get(SYSTEM.id, "movementScalesSetting");

    for (const [id, movement] of Object.entries(movements)) {
      let active = movement.active = movementPowers[id];

      if (movement.active) {
        let speedRank = movement.rank + speedValues[id];
        movement.speed = SYSTEM.SCALE.DISTANCE[speedRank].m_value;
        movement.display = `${SYSTEM.SCALE.DISTANCE[speedRank].m_label} ${SYSTEM.SCALE.DISTANCE[speedRank].m_scale}`;
      }
    }
  }
}
