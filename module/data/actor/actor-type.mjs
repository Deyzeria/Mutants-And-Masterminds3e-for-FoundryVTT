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
    schema.abilities = new fields.SchemaField(Object.values(SYSTEM.ABILITIES).reduce(obj, ability => {
      obj[ability.id] = new fields.SchemaField({
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 }),
        misc: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 })
      }, { label: ability.label });
      return obj;
    }, {}));

    // Defenses
    schema.defenses = new fields.SchemaField(Object.values(SYSTEM.DEFENSES).reduce(obj, defense => {
      obj[defense.id] = new fields.SchemaField({
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 }),
        misc: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 })
      }, { label: defense.label });
      return obj;
    }, {}));

    // Skills
    schema.skills = new fields.SchemaField(Object.values(SYSTEM.DEFENSES).reduce(obj, skill => {
      obj[skill.id] = new fields.SchemaField({
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 }),
        misc: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6 }),
        speciality: new fields.StringField({ required: false, initial: undefined, blank: false }),
        mastery: new fields.BooleanField()
      }, { label: ability.label });
      return obj;
    }, {}));

    // Movements
    schema.movements = new fields.SchemaField(Object.values(SYSTEM.DEFENSES).reduce(obj, movement => {
      obj[movement.id] = new fields.SchemaField({
        rank: new fields.NumberField({ ...requiredInteger, initial: 0, min: -5 }),
        active: new fields.BooleanField()
      }, { label: movement.label });
      return obj;
    }, {}));

    schema.advancements = new fields.SchemaField(
      level = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      extrapoints = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    );
    
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
    this._prepareDetails();
    this._prepareAbilities();
    this._prepareDefenses();
    this._prepareSkills();

    this._preparePowerPoints();
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
    for ( const ability of Object.entries(this.abilities) ) {
      this._prepareAbility(...ability);
    }
  }

  /**
   * 
   * @param {string} abilityId 
   * @param {MNMActorAbility} ability 
   */
  _prepareAbility(abilityId, ability) {
    const rank = ability.rank ||= 0;
    const misc = ability.misc ||= 0;

    const auto = ability.auto ||= 0;
    const total = ability.total = rank + misc + auto;
    // TODO: Maximum -10
    ability.spent = Math.min(rank * 2, -10);
  }

  /* -------------------------------------------- */

  /**
   * Prepare ability scores for all Actor subtypes.
   * @protected
   */
  _prepareDefenses() {
    for ( const defense of Object.entries(this.defenses) ) {
      this._prepareDefense(...defense);
    }
  }

  /**
   * Prepare a single Defense for all Actor subtypes.
   * @param {string} defenseId          ID of a defense being configured
   * @param {MNMActorDefense} defense   Source data of the defense being configured
   */
  _prepareDefense(defenseId, defense) {
    const config = SYSTEM.DEFENSES[defenseId];
    const rank = defense.rank ||= 0;
    const misc = defense.misc ||= 0;
    // TODO: I only need to get  system.abilities[config.ability].total
    const abonus = defense.ability = this.abilities[config.ability].total;
    const auto = defense.auto ||= 0;
    const total = defense.total = rank + misc + abonus + auto;
    defense.armor = SYSTEM.PASSIVE_BASE + total;

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
    for ( const skill of Object.entries(this.skills) ) {
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
    const misc = skill.misc ||= 0;
    // TODO: I only need to get  system.abilities[config.ability].total
    const abonus = skill.ability = this.system.abilities[config.ability].total;
    const auto = skill.auto ||= 0;
    skill.total = rank + misc + abonus + auto;

    skill.spent = rank / SYSTEM.SKILLS_PER_PP;
  }

  /**
   * Derived data preparation workflows used by all Actor subtypes.
   * @override
   */
  prepareDerivedData() {
    this._preparePowerPoints();
  }


  _preparePowerPoints() {
    const adv = this.advancements;

    const pl = adv.level ||= 0;

    adv.available = pl * SYSTEM.POINTS_PER_PL + adv.extrapoints;

    const abilities = adv.abilities = Object.values(this.abilities).reduce((total, value) => {
      return total + value.spent;
    }, 0);

    const defenses = adv.defenses = Object.values(this.defenses).reduce((total, value) => {
      return total + value.spent;
    }, 0);

    const skills = adv.skills = Object.values(this.skills).reduce((total, value) => {
      return total + value.spent;
    }, 0);

    const powers = adv.powers ||= 0;

    // const powers = this.advancements.powers = this.items.reduce((cost, i) => {
    //   if (i.type != "power") return cost;
    //   const c = i.system.power_cost.active_cost || 0;
    //   return powcost + c;
    // });

    const advantages = adv.advantages ||= 0;

    adv.spent = abilities + defenses + skills + powers + advantages;
  }
}
