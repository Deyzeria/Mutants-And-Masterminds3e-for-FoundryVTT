import { SYSTEM } from "./module/config/system.mjs";
globalThis.SYSTEM = SYSTEM;

Hooks.once("init", async function () {
  console.log(`Initializing Foundry Mutants And Masterminds 3e`);
  globalThis.mnm3efvtt = game.system;
  game.system.CONST = SYSTEM;


});

Hooks.once("i18nInit", function () {
  const toLocalize = [
    "ABILITIES", "DEFENSES", "SKILLS"
  ];

  for (let c of toLocalize) {
    const conf = foundry.utils.getProperty(SYSTEM, c);
    for ( let [k, v] of Object.entries(conf) ) {
      if ( v.label ) v.label = game.i18n.localize(v.label);
      if ( v.abbreviation) v.abbreviation = game.i18n.localize(v.abbreviation);
      if ( typeof v === "string" ) conf[k] = game.i18n.localize(v);
    }
  }

  const scaleLocalisation = [
    "DISTANCE", "MASS", "TIME", "VOLUME"
  ]

  for (let c of scaleLocalisation) {
    const conf = foundry.utils.getProperty(SYSTEM, c);
    for ( let [k, v] of Object.entries(conf) ) {
      if ( v.m_scale) v.m_scale = game.i18n.localize(v.m_scale);
      if ( v.im_scale) v.im_scale = game.i18n.localize(v.im_scale);
      if ( v.time_scale) v.time_scale = game.i18n.localize(v.time_scale);
    }
  }

  // Preload Handlebars Templates
  loadTemplates([
  ]);
});
