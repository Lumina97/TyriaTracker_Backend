import { z } from 'zod';

export const EquipmentStatsGeneric = z.object({
	/** Item stat id. Can be resolved against /v2/itemstats. */
	id: z.number(),
	/** Summary of the stats on the item. Only available if the item has selectable stats. */
	attributes: z.object({
		/** Power. */
		Power: z.number().optional(),
		/** Precision. */
		Precision: z.number().optional(),
		/** Toughness. */
		Toughness: z.number().optional(),
		/** Vitality. */
		Vitality: z.number().optional(),
		/** Condition Damage. */
		ConditionDamage: z.number().optional(),
		/** Condition Duration. */
		ConditionDuration: z.number().optional(),
		/** Healing Power. */
		Healing: z.number().optional(),
		/** Boon Duration. */
		BoonDuration: z.number().optional()
	})
});

export const EquipmentGeneric = z
	.object({
		/** Item id. Can be resolved against /v2/items. */
		id: z.number(),
		/** Equipment slot, in which the item is slotted. */
		slot: z
			.enum([
				'HelmAquatic',
				'Backpack',
				'Coat',
				'Boots',
				'Gloves',
				'Helm',
				'Leggings',
				'Shoulders',
				'Accessory1',
				'Accessory2',
				'Ring1',
				'Ring2',
				'Amulet',
				'Relic',
				'WeaponAquaticA',
				'WeaponAquaticB',
				'WeaponA1',
				'WeaponA2',
				'WeaponB1',
				'WeaponB2',
				'Sickle',
				'Axe',
				'Pick',
				'PowerCore',
				'FishingLure',
				'FishingBait',
				'FishingRod',
				'SensoryArray'
			])
			.optional(),
		/** Infusions Ids. Can be resolved against /v2/items. */
		infusions: z.array(z.number()).optional(),
		/** Upgrade Ids. Can be resolved against /v2/items. */
		upgrades: z.array(z.number()).optional(),
		/** Skin id. Can be resolved against /v2/skins. */
		skin: z.number().optional(),
		/** Equipment stats, if the item offers a selection of prefixes. */
		stats: EquipmentStatsGeneric.optional(),
		/** Where item is stored. */
		location: z.enum(['Equipped', 'Armory', 'EquippedFromLegendaryArmory', 'LegendaryArmory']).optional(),
		/** Tabs where this item is used in. */
		tabs: z.array(z.number()).optional(),
		/** Amount of charges remaining. */
		charges: z.number().optional(),
		/** Dyes selected for the equipment piece. Defaults to null. Can be resolved against /v2/colors. */
		dyes: z.array(z.union([z.number(), z.null()])).optional()
	})
	.and(
		z.discriminatedUnion('binding', [
			z.object({
				/** Equipment binding. */
				binding: z.literal('Character'),
				/** Name of the character to which the item is bound. */
				bound_to: z.string()
			}),
			z.object({
				/** Equipment binding. */
				binding: z.literal('Account'),
				/** Undefined, when binding is "Account" */
				bound_to: z.undefined()
			}),
			z.object({
				/** Not bound. */
				binding: z.undefined(),
				/** Undefined, since not bound. */
				bound_to: z.undefined()
			})
		])
	);

/**
 * /v2/characters/:id/equipment definition
 */
export const CharacterEquipmentDTO = z.object({
	/** Character equipment. */
	equipment: z.array(EquipmentGeneric)
});
