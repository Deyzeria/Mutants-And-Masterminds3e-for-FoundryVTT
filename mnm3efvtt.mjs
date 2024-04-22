// Import Configs
import { SYSTEM } from "./module/config/system.mjs";
import * as effects from "./module/config/statuses.mjs";
globalThis.SYSTEM = SYSTEM;

// Import Modules
import * as applications from "./module/applications/_module.mjs";
import * as models from "./module/models/_module.mjs";
import * as documents from "./module/documents/_module.mjs";

Hooks.once("init", async function () {
  console.log(`Initializing Foundry Mutants And Masterminds 3e`);
  globalThis.mnm3efvtt = game.system;
  game.system.CONST = SYSTEM;

  game.system.api = {
    models
  }

  CONFIG.Actor.documentClass = documents.MutantsAndMastermindsActor;
  CONFIG.Actor.dataModels = {
    hero: models.MutantsAndMastermindsHero
  };
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(SYSTEM.id, applications.HeroSheet, {types: ["hero"], makeDefault: true});

  CONFIG.statusEffects = effects.statusEffectsArray;

  applications.HUDChanges.init();
});



Hooks.once("i18nInit", function () {
  const toLocalize = [
    "ABILITIES", "DEFENSES", "SKILLS"
  ];

  for (let c of toLocalize) {
    const conf = foundry.utils.getProperty(SYSTEM, c);
    for (let [k, v] of Object.entries(conf)) {
      if (v.label) v.label = game.i18n.localize(v.label);
      if (v.abbreviation) v.abbreviation = game.i18n.localize(v.abbreviation);
      if (typeof v === "string") conf[k] = game.i18n.localize(v);
    }
  }

  const scaleLocalisation = [
    "DISTANCE", "MASS", "TIME", "VOLUME"
  ]

  for (let c of scaleLocalisation) {
    const conf = foundry.utils.getProperty(SYSTEM, "SCALE." + c);
    for (let [k, v] of Object.entries(conf)) {
      if (v.m_scale) v.m_scale = game.i18n.localize(v.m_scale);
      if (v.im_scale) v.im_scale = game.i18n.localize(v.im_scale);
      if (v.time_scale) v.time_scale = game.i18n.localize(v.time_scale);
    }
  }

  // Pre-localize configuration objects
  preLocalizeConfig();

  // Preload Handlebars Templates
  loadTemplates([
  ]);
});

function preLocalizeConfig() {
  const localizeConfigObject = (obj, keys) => {
    for ( let o of Object.values(obj) ) {
      for ( let k of keys ) {
        o[k] = game.i18n.localize(o[k]);
      }
    }
  }

  // Statuses
  localizeConfigObject(CONFIG.statusEffects, ["label"]);

  // Action Tags
  // localizeConfigObject(SYSTEM.DAMAGE_TYPES, ["label", "abbreviation"]);
  // localizeConfigObject(SYSTEM.ACTION.TAGS, ["label", "tooltip"]);
  // localizeConfigObject(SYSTEM.ACTION.TAG_CATEGORIES, ["label"]);
}
