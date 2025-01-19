import { z } from 'zod';

/**
 * Skill template
 */
const Skill = z.object({
	/** Id of the heal skill. Can be resolved against /v2/skills. */
	heal: z.union([z.null(), z.number()]),
	/** Ids of the utilities, or null if it's not set. Can be resolved against /v2/skills */
	utilities: z.array(z.union([z.null(), z.number()])),
	/** Id of the elite skill. Can be resolved against /v2/skills. */
	elite: z.union([z.null(), z.number()]),
	/** Ids of the legends. Revenant only. Can be resolved against /v2/legends. */
	legends: z.array(z.union([z.null(), z.string()])).optional()
});

/**
 * /v2/characters/:id/skills definition
 */
export const CharacterSkillsDTO = z.object({
	/** PvE, PvP, and WvW skill layout of a character. */
	skills: z.object({
		/** PvE skills. */
		pve: Skill,
		/** PvP skills. */
		pvp: Skill,
		/** WvW skills. */
		wvw: Skill
	})
});
