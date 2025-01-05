import { z } from 'zod';
import { EquipmentGeneric } from './characters.equipment.dto';

/**
 * /v2/characters/:id/equipmenttabs definition
 */
export const CharacterEquipmentTabDTO = z.object({
	/** Equipment tab id. */
	tab: z.number(),
	/** Equipment tab name. */
	name: z.string(),
	/** Whether the equipment tab is active. */
	is_active: z.boolean(),
	/** Array of equipment objects in the equipment tab. */
	equipment: z.array(EquipmentGeneric),
	/** PvP equipment in the equipment tab */
	equipment_pvp: z.object({
		/** Amulet id. Can be resolved against /v2/pvp/amulets. */
		amulet: z.union([z.number(), z.null()]),
		/** Rune id. Can be resolved against /v2/items. */
		rune: z.union([z.number(), z.null()]),
		/**
		 * Sigil ids. Can be resolved against /v2/items.
		 * Provided in the following order:
		 * - Primary Weapon
		 * - Primary Off-hand Weapon
		 * - Secondary Weapon
		 * - Secondary Off-hand Weapon
		 */
		sigils: z.array(z.union([z.number(), z.null()]))
	})
});

export const CharacterEquipmentTabsDTO = z.array(CharacterEquipmentTabDTO);
