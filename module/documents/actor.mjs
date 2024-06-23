export default class MutantsAndMastermindsActor extends Actor {
  constructor(data, context) {
    super(data, context);
  }

  /**
   * Track the Items which are currently equipped for the Actor.
   * @type {*}
   */
  equipment = this.equipment;

  /**
   * Currently active status effects
   * @type {Set<string>}
   */
  statuses = this.statuses || new Set();

  /* -------------------------------------------- */
  /*  Actor Preparation
  /* -------------------------------------------- */

  /** @override */
  prepareBaseData() {
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  prepareEmbeddedDocuments() {
    super.prepareEmbeddedDocuments();
    this._prepareEffects();
    this.enhanced = {};
  };

  /* -------------------------------------------- */

  /**
   * Prepare current Active Effects.
   * @private
   */
  _prepareEffects() {
    this.statuses = new Set();
    for (const effect of this.effects) {
      for (const status of effect.statuses) this.statuses.add(status);
    }
  }
}
