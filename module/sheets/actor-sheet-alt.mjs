import { LOREActorSheet } from "./actor-sheet.mjs";

// Minimal variant: reuse logic, only swap template path or classes
export class LOREActorSheetAlt extends LOREActorSheet {
    static get defaultOptions() {
        const opts = super.defaultOptions;
        opts.classes = ['lore', 'sheet', 'actor', 'alt'];
        return opts;
    }

    get template() {
        // Point to alt templates, e.g., actor-character-sheet-alt.hbs, actor-npc-sheet-alt.hbs
        return `systems/lore/templates/actor/actor-${this.actor.type}-sheet-alt.hbs`;
    }
}