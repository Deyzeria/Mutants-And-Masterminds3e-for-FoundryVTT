export class MovementConfig extends FormApplication {
  /** @inheritdoc */
  constructor(object = {}, options = {}) {
    object = foundry.utils.mergeObject(game.settings.get(SYSTEM.id, SYSTEM.SETTINGS.MOVEMENT), object, { inplace: false });
    super(object, options);
  }


  /* -------------------------------------------- */

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      title: game.i18n.localize("SETTINGS.mnmMovementScalesName"),
      classes: [SYSTEM.id, "movement-config"],
      id: "movement-config",
      template: `systems/${SYSTEM.id}/templates/settings/movement-settings.hbs`,
      popOut: true,
      width: 240,
      height: "auto"
    });
  }

  /* -------------------------------------------- */


  /** @inheritdoc */
  getData(options = {}) {
    const context = super.getData(options);
    context.config = [];
    const speedvalue = game.settings.get(SYSTEM.id, SYSTEM.SETTINGS.MOVEMENT);

    Object.entries(SYSTEM.MOVEMENTS).forEach(element => {
      context.config.push({label: element[1].label, id: element[0], value: speedvalue[element[0]]});
    });
    console.debug(context);
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _updateObject(event, formData) {
    let vars = foundry.utils.expandObject(formData);
    let settingset = {
      walk: vars.walk.value,
      burrow: vars.burrow.value,
      flight: vars.flight.value,
      swim: vars.swimm.value,
      teleport: vars.teleport.value,
      leap: vars.leap.value
    }
    await game.settings.set(SYSTEM.id, SYSTEM.SETTINGS.MOVEMENT, settingset);
    return SettingsConfig.reloadConfirm({ world: true });
  }
}
