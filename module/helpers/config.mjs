export const LORE = {};

/**
 * The set of Attribute Scores used within the system.
 * @type {Object}
 */
LORE.attributes = {
  mig: 'LORE.attribute.Mig.long',
  ref: 'LORE.attribute.Ref.long',
  phy: 'LORE.attribute.Phy.long',
  int: 'LORE.attribute.Int.long',
  gri: 'LORE.attribute.Gri.long',
  cha: 'LORE.attribute.Cha.long',
};

LORE.attributeAbbreviations = {
  mig: 'LORE.attribute.Mig.abbr',
  ref: 'LORE.attribute.Ref.abbr',
  phy: 'LORE.attribute.Phy.abbr',
  int: 'LORE.attribute.Int.abbr',
  gri: 'LORE.attribute.Gri.abbr',
  cha: 'LORE.attribute.Cha.abbr',
};

// Fixed attribute types (physical or mental) determined at creation time.
LORE.attributeTypes = {
    mig: 'physical',
    ref: 'physical',
    phy: 'physical',
    int: 'mental',
    gri: 'mental',
    cha: 'mental'
};
