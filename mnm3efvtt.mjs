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
    for ( let [k, v] of Object.entries(conf) ) {
      if ( v.label ) v.label = game.i18n.localize(v.label);
      if ( v.abbreviation) v.abbreviation = game.i18n.localize(v.abbreviation);
      if ( typeof v === "string" ) conf[k] = game.i18n.localize(v);
    }
  }
  
  // Preload Handlebars Templates
  loadTemplates([
  ]);
});
