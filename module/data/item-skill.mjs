import LOREItemBase from "./base-item.mjs";

export default class LORESkill extends LOREItemBase {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {};

        //schema.description = new fields.StringField({ required: true, blank: true });

        return schema;
    }
}