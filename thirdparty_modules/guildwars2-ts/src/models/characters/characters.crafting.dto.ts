import { z } from 'zod';

/**
 * /v2/characters/:id/crafting definition
 */
export const CharacterCraftingDTO = z.object({
	/**
	 * Crafting disciplines of a character
	 */
	crafting: z.array(
		z.object({
			/** An array containing an entry for each crafting discipline the character has unlocked. */
			discipline: z.enum([
				'Armorsmith',
				'Artificer',
				'Chef',
				'Huntsman',
				'Jeweler',
				'Leatherworker',
				'Scribe',
				'Tailor',
				'Weaponsmith'
			]),
			/** The name of the discipline. */
			rating: z.number(),
			/** Describes if the given discipline is currently active or not on the character. */
			active: z.boolean()
		})
	)
});
