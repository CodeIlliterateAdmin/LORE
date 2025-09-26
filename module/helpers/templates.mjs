/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */

// Register helpers at load time
Handlebars.registerHelper("multiply", (a, b) => Number(a) * Number(b));

export function isCritFail(roll) {
    // Gather all die results across all terms
    const diceTerms = roll.dice ?? []; // Roll.terms filtered to Die in v10/11; in v13, roll.dice is available
    const results = diceTerms.flatMap(d => d.results?.map(r => r.result) ?? []);
    if (!results.length) return false;
    const ones = results.filter(v => v === 1).length;
    return ones > results.length / 2;
}

export const preloadHandlebarsTemplates = async function () {
    return foundry.applications.handlebars.loadTemplates([
        // Actor partials.
        'systems/lore/templates/actor/parts/actor-skills.hbs',
        'systems/lore/templates/actor/parts/actor-items.hbs',
        'systems/lore/templates/actor/parts/actor-powers.hbs',
        'systems/lore/templates/actor/parts/actor-effects.hbs',
        // Item partials
        'systems/lore/templates/item/parts/item-effects.hbs',
        'systems/lore/templates/item/parts/item-skills.hbs',
    ]);
};
