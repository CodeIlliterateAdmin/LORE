import LOREItemBase from "./base-item.mjs";

export default class LORESkill extends LOREItemBase {
    static defineSchema() {
        const fields = foundry.data.fields;
        const requiredInteger = { required: true, nullable: false, integer: true };
        const schema = {};

        // Skill rank
        schema.rank = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
            max: new fields.NumberField({ ...requiredInteger, initial: 5 })
        });

        // Which attribute this skill uses (keys like "mig","ref","phy","int","gri","cha")
        schema.attribute = new fields.StringField({
            required: true,
            nullable: false,
            initial: "mig"
        });

        // Optional: dice parts
        schema.roll = new fields.SchemaField({
            diceNum: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
            diceSize: new fields.StringField({ initial: "d6" })
        });

        // Final formula used by item.roll()
        schema.formula = new fields.StringField({ blank: true });

        return schema;
    }

    prepareDerivedData() {
        const diceNum = this.roll?.diceNum ?? 1;
        const diceSize = this.roll?.diceSize ?? "d6";
        const attrKey = this.attribute || "mig";

        // Build "1d20+@<attr>.mod+@rank.value"
        const bonus = `+@${attrKey}.mod+@rank.value`;
        this.formula = `${diceNum}${diceSize}${bonus}`;
    }
}