/**
 * A common actor sheet class shared by both Hero and Villain types.
 */
export default class MnMActorSheet extends ActorSheet {
  /** @inheritdoc */
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.dragDrop.push({ dragSelector: ".actions .action", dropSelector: null });
    return Object.assign(options, {
      width: 900,
      height: 750,
      classes: [SYSTEM.id, "sheet", "actor", this.actorType],
      template: `systems/${SYSTEM.id}/templates/sheets/${this.actorType}.hbs`,
      resizable: false,
      tabs: [{ navSelector: ".tabs", contentSelector: ".sheet-body", initial: "attributes" }],
      scrollY: []
    });
  }

  /**
   * The type of Actor rendered using this sheet.
   * @type {string}
   */
  static actorType = "hero";

  /* -------------------------------------------- */

  /** @override */
  async getData(options) {

    // Start with some elements from the basic DocumentSheet
    const context = await DocumentSheet.prototype.getData.call(this, options);
    const a = context.actor = context.document;
    const s = context.source = context.data;
    context.score = {};
    context.score.abilityScores = this.#formatAbilities(a.system.abilities);
    context.score.defenseScores = this.#formatDefenses(a.system.defenses);
    context.score.skillsScores = this.#formatSkills(a.system.skills);
    console.debug(context.score.skillsScores);
    context.wounds = a.system.wounds;
    return context;
  }

  /**
   * Format ability scores for display on the Actor sheet.
   * @param {Object} abilities
   * @return {Object[]}
   */
  #formatAbilities(abilities) {
    return Object.values(SYSTEM.ABILITIES).map(cfg => {
      const ability = foundry.utils.deepClone(cfg);
      const specific = abilities[ability.id];
      ability.rank = specific.rank;
      ability.rankDisplay = specific.rank > -6 ? specific.rank : "-";

      ability.misc = specific.misc;
      ability.auto = specific.auto;
      // TODO: Show /rank as smaller letters
      ability.totalDisplay = specific.rank > -6 ? specific.total > -6 ? specific.total : `-/${specific.rank}` : "-";

      return ability;
    });
  };

  /**
   * 
   * @param {Object} defenses
   * @returns  {Object[]}
   */
  #formatDefenses(defenses) {
    return Object.values(SYSTEM.DEFENSES).map(cfg => {
      const defense = foundry.utils.deepClone(cfg);
      const specific = defenses[defense.id];

      defense.total = specific.total;
      defense.ablAbbreviation = SYSTEM.ABILITIES[defense.ability].abbreviation;

      if (defense.id != SYSTEM.DEFENSES.toughness.id) {
        defense.totalDisplay = specific.ability > -6 ? specific.total : "-";
        defense.rank = specific.rank;
        defense.purchase = true;
        defense.immune = specific.immune;
      }
      else {
        defense.totalDisplay = specific.total > -6 ? specific.total : "-";
        defense.purchase = false;
        defense.immune = specific.immune;
      }

      defense.misc = specific.misc;
      defense.auto = specific.auto;
      defense.armor = specific.armor;

      return defense;
    });
  }

  #formatSkills(skills) {
    return Object.values(SYSTEM.SKILLS).map(cfg => {
      const skill = foundry.utils.deepClone(cfg);
      const specific = skills[skill.id];

      if (skill.customize) {
        skill.subtypes = [];

        specific.forEach(element => {
          var unique = {}
          unique = this.populateSkill(element);
          unique.label = element.speciality;

          if (skill.id == "expertise") {
            unique.ability = element.ability;
          }
          else {
            unique.affects = element.affects;
          }

          skill.subtypes.push(unique);
        });
      }
      else {
        Object.assign(skill, this.populateSkill(specific));
      }

      return skill;
    })
  }

  populateSkill(skillData) {
    return {
      rank: skillData.rank,
      misc: skillData.misc,
      auto: skillData.auto,
      ability: skillData.ability,
      totalDisplay: this.hasProficiency(skillData) ? skillData.total : "-",
      mastery: skillData.mastery,
      untrained: skillData.untrained,
    }
  }

  hasProficiency(skillData) {
    if (skillData.untrained) return true;
    if (skillData.rank > 0 || skillData.misc > 0 || skillData.auto > 0) return true;
    //if (this.actor.items.filter(x => x.type == 'advantage').find(x => x.system.id == 'jackofalltrades')) return true;
    return false;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".ability > .ability-rank .rank-label").on("click", event => this._toggleEditRank(event, true));
    html.find(".ability > .ability-rank .rank-input").on("blur", event => this._toggleEditRank(event, false));

    html.find(".skills ")
  }

  /**
   * Toggle editing Rank for Abilities.
   * @param {PointerEvent} event  The triggering event.
   * @param {boolean} edit        Whether to toggle to the edit state.
   * @protected
   */
  _toggleEditRank(event, edit) {
    const target = event.currentTarget.closest(".ability-rank");
    const label = target.querySelector(":scope > .rank-label");
    const input = target.querySelector(":scope > .rank-input");
    label.hidden = edit;
    input.hidden = !edit;
    if (edit) input.focus();
  }
}
