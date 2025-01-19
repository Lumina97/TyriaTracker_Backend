import { z } from 'zod';

/**
 * Specialization details.
 */
const Specialization = z.object({
	/** Specialization id. Can be resolved against /v2/specializations. */
	id: z.number(),
	/** Trait ids. Can be resolved against /v2/traits. */
	traits: z.array(z.number())
});

/**
 * /v2/characters/:id/specializations definition
 */
export const CharacterSpecializationsDTO = z.object({
	/** Contains PvE, PvP, and WvW specialization objects currently equipped. */
	specializations: z.object({
		/** PvE specializations currently equipped. */
		pve: z.array(Specialization),
		/** PvP specializations currently equipped. */
		pvp: z.array(Specialization),
		/** WvW specializations currently equipped. */
		wvw: z.array(Specialization)
	})
});
