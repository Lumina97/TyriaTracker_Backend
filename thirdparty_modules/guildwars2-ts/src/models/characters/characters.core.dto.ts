import { z } from 'zod';

/**
 * /v2/characters/:id/core definition
 */
export const CharacterCoreDTO = z.object({
	/** Character name. */
	name: z.string(),
	/** Character race. */
	race: z.enum(['Asura', 'Charr', 'Human', 'Norn', 'Sylvari']),
	/** Character gender. */
	gender: z.enum(['Male', 'Female']),
	/** Character profession. */
	profession: z.enum([
		'Elementalist',
		'Engineer',
		'Guardian',
		'Mesmer',
		'Necromancer',
		'Ranger',
		'Revenant',
		'Thief',
		'Warrior'
	]),
	/** Character level. */
	level: z.number(),
	/** Character guild. */
	guild: z.union([z.string(), z.null()]),
	/** Character age. */
	age: z.number(),
	/** Character creation date. */
	created: z.string(),
	/** Character deaths. */
	deaths: z.number(),
	/** Character title id. */
	title: z.number().optional()
});
