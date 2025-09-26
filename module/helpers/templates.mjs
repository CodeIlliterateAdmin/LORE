/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */

// Register helpers at load time
Handlebars.registerHelper("multiply", (a, b) => Number(a) * Number(b));

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
