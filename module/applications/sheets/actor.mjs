/**
 * A common actor sheet class shared by both Hero and Villain types.
 */
export default class MnMActorSheet extends ActorSheet {
  /** @inheritdoc */
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.dragDrop.push({dragSelector: ".actions .action", dropSelector: null});
    return Object.assign(options, {
      width: 760,
      height: 750,
      classes: [SYSTEM.id, "sheet", "actor", this.actorType],
      template: `systems/${SYSTEM.id}/templates/sheets/${this.actorType}.hbs`,
      resizable: false,
      tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "attributes"}],
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
    const pl = a.system.advancements.level;
    context.abilityScores = this.#formatAbilities(a.system.abilities, pl)

    return context;
  }

  /**
   * Format ability scores for display on the Actor sheet.
   * @param {import("../../models/actor-type.mjs").MNMActorAbility} abilities
   * @param {number} pl
   * @return {object[]}
   */
  #formatAbilities(abilities, pl) {
    return Object.values(SYSTEM.ABILITIES).map(cfg => {
      /**
       * @type {Object<string, {
       *  id: string
       * }}
       */
      const ability = foundry.utils.deepClone(cfg);
      const aboveMinRank = abilities[ability.id].total > -6;

      ability.rank = abilities[ability.id].rank;
      ability.rankdisplay = aboveMinRank ? ability.rank : "-";

      ability.total = abilities[ability.id].total;
      ability.canIncrease = abilities[ability.id].rank < pl * 2;
      ability.canDecrease = abilities[ability.id].rank > 0 && aboveMinRank;

      return ability;
    });
  };

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".ability > .ability-rank").on("click", event => this._toggleEditHP(event, true));
    html.find(".ability > .ability-rank > input").on("blur", event => this._toggleEditHP(event, false));
  }

  /**
   * Toggle editing hit points.
   * @param {PointerEvent} event  The triggering event.
   * @param {boolean} edit        Whether to toggle to the edit state.
   * @protected
   */
  _toggleEditHP(event, edit) {
    const target = event.currentTarget.closest(".ability-rank");
    const label = target.querySelector(":scope > .label");
    const input = target.querySelector(":scope > input");
    label.hidden = edit;
    input.hidden = !edit;
    if ( edit ) input.focus();
  }
}
