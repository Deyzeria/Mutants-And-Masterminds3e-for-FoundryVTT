import MutantsAndMastermindsActorType from "./actor-type.mjs";

export default class MutantsAndMastermindsHero extends MutantsAndMastermindsActorType {

  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = {required: true, nullable: false, integer: true};
    const schema = super.defineSchema();

    schema.advancements = new fields.SchemaField({
      level: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      extrapoints: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 })
    });

    schema.heropoints = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });

    schema.details = new fields.SchemaField({
      publicidentity: new fields.BooleanField(),
      hero: new fields.SchemaField({
        name: new fields.StringField(),
        img: new fields.StringField(),
        gender: new fields.StringField(),
        age: new fields.StringField(),
        height: new fields.NumberField({...requiredInteger, initial: 0, min: 0}),
        weight: new fields.NumberField({...requiredInteger, initial: 0, min: 0}),
        eyes: new fields.StringField(),
        hair: new fields.StringField(),
        description: new fields.HTMLField()
      }),
      civilian: new fields.SchemaField({
        name: new fields.StringField(),
        img: new fields.StringField(),
        gender: new fields.StringField(),
        age: new fields.StringField(),
        height: new fields.NumberField({...requiredInteger, initial: 0, min: 0}),
        weight: new fields.NumberField({...requiredInteger, initial: 0, min: 0}),
        eyes: new fields.StringField(),
        hair: new fields.StringField(),
        description: new fields.HTMLField()
      }),
      groupaffiliation: new fields.StringField(),
      baseofoperation: new fields.StringField()
    })

    return schema;
  }

  prepareBaseData() {
    super.prepareBaseData();
  }

  _prepareDetails() {
    this.details.hero.description ||= this.schema.getField("details.hero.description").initialize({});
    this.details.civilian.description ||= this.schema.getField("details.civilian.description").initialize({});
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    this.#preparePowerPoints();
  }

  #preparePowerPoints() {
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
