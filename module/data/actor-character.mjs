import LOREActorBase from "./base-actor.mjs";

export default class LORECharacter extends LOREActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.resources = new fields.SchemaField({
      rank: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over attribute names and create a new SchemaField for each.
    schema.attributes = new fields.SchemaField(Object.keys(CONFIG.LORE.attributes).reduce((obj, attribute) => {
      obj[attribute] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
          type: new fields.StringField({
              required: true,
              initial: "physical",
              choices: ["physical", "mental"]
          })
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through attribute scores, and add their modifiers to our sheet output.
    for (const key in this.attributes) {
      // Calculate the modifier
        const val = this.attributes[key].value * 1;

      this.attributes[key].mod = val;
      this.attributes[key].bonus = Math.max(val - 1, 0);
      // Handle attribute label localization.
      this.attributes[key].label = game.i18n.localize(CONFIG.LORE.attributes[key]) ?? key;

      const fixedType = CONFIG.LORE.attributeTypes?.[key];
      if(fixedType && this.attributes[key].type != fixedType) {
          this.attributes[key].type = fixedType;
      }
    }
  }

  getRollData() {
    const data = {};

    // Copy the attribute scores to the top level, so that rolls can use
    // formulas like `@mig.mod + 4`.
    if (this.attributes) {
      for (let [k,v] of Object.entries(this.attributes)) {
        data[k] = foundry.utils.deepClone(v);
      }

      // Optional helpers for targeting types in roll formulas or scripts.
        data._attributesByType = {
            physical: Object.fromEntries(Object.entries(this.attributes).filter(([_, a]) => a.type === "physical")),
            mental: Object.fromEntries(Object.entries(this.attributes).filter(([_, a]) => a.type === "mental"))
        };
    }

    data.rank = this.resources.rank.value;

    return data
  }
}