import { z } from 'zod';

export const ItemAttributesGeneric = z.object({
	/** Agony Resistance. */
	AgonyResistance: z.number().optional(),
	/** Boon Duration. */
	BoonDuration: z.number().optional(),
	/** Condition Damage. */
	ConditionDamage: z.number().optional(),
	/** Condition Duration. */
	ConditionDuration: z.number().optional(),
	/** Critical Damage. */
	CritDamage: z.number().optional(),
	/** Healing Power. */
	Healing: z.number().optional(),
	/** Power. */
	Power: z.number().optional(),
	/** Precision. */
	Precision: z.number().optional(),
	/** Toughness. */
	Toughness: z.number().optional(),
	/** Vitality. */
	Vitality: z.number().optional()
});

/**
 * /v2/account/bank definition
 */
export const AccountBankDTO = z.array(
	z.union([
		z
			.object({
				/** The item's ID. */
				id: z.number(),
				/** The amount of items in the item stack. */
				count: z.number(),
				/** The amount of charges remaining on the item. */
				charges: z.number().optional(),
				/** The skin applied to the item, if it is different from its original. Can be resolved against /v2/skins. */
				skin: z.number().optional(),
				/** The IDs of the dyes applied to the item. Can be resolved against /v2/colors. */
				dyes: z.array(z.number()).optional(),
				/** The item IDs of the runes or sigils applied to the item. */
				upgrades: z.array(z.number()).optional(),
				/** The slot occupied by the upgrade at the corresponding position in upgrades. */
				upgrade_slot_indices: z.array(z.number()).optional(),
				/** An array of item IDs for each infusion applied to the item. */
				infusions: z.array(z.number()).optional(),
				/** The stats of the item. */
				stats: z
					.object({
						/** The ID of the item's stats. Can be resolved against /v2/itemstats. */
						id: z.number(),
						/** The list of stats provided by this item. Can be empty object. */
						attributes: ItemAttributesGeneric
					})
					.optional()
			})
			.and(
				z.discriminatedUnion('binding', [
					z.object({
						/** The current binding of the item. Bound to the character */
						binding: z.literal('Character'),
						/** Which character it is bound to. */
						bound_to: z.string()
					}),
					z.object({
						/** The current binding of the item. Bound to the account.  */
						binding: z.literal('Account'),
						/** This will never appear. */
						bound_to: z.undefined()
					}),
					z.object({
						/** If the item has no binding, this will never appear. */
						binding: z.undefined(),
						/** This will never appear. */
						bound_to: z.undefined()
					})
				])
			),
		/** Bank slots can be null. */
		z.null()
	])
);
