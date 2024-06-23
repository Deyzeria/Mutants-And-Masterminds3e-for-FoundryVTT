import MnMActorSheet from "./actor.mjs";

export default class HeroSheet extends MnMActorSheet {
  async getData(options) {
    const context = await super.getData(options);
    return context;
  };
}
