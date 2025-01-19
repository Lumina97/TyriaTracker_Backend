import { z } from 'zod';
import { EquipmentStatsGeneric } from './characters.equipment.dto';

/**
 * Inventory bag contents
 */
const BagInventory = z
	.object({
		/** Item id. Can be resolved against /v2/items */
		id: z.number(),
		/** Amount of the item in the stack. */
		count: z.number(),
		/** Number of charges of the item */
		charges: z.number().optional(),
		/** Infusion ids. Can be resolved against /v2/items. */
		infusions: z.array(z.number()).optional(),
		/** Upgrade ids. Can be resolved against /v2/items. */
		upgrades: z.array(z.number()).optional(),
		/** Indices of the slots where upgrades are installed. */
		upgrade_slot_indices: z.array(z.number()).optional(),
		/** Skin id. Can be resolved against /v2/skins. */
		skin: z.number().optional(),
		/** Stat information of an item, if it has selectable prefixes. */
		stats: EquipmentStatsGeneric.optional(),
		/** Dye ids. Null if not assigned. Can be resolved against /v2/colors */
		dyes: z.array(z.union([z.null(), z.number()])).optional()
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
 * /v2/characters/:id/inventory definition
 */
export const CharacterInventoryDTO = z.object({
	/** Array of bags in the character's inventory. */
	bags: z.array(
		z.union([
			z.object({
				/** Bag id. Can be resolved against /v2/items. */
				id: z.number(),
				/** Number of bag slots in this bag. */
				size: z.number(),
				/** Bag contents structure, or null of there are no items in the bag. */
				inventory: z.array(z.union([z.null(), BagInventory]))
			}),
			/** The bag is missing, but the slot is unlocked */
			z.null()
		])
	)
});
