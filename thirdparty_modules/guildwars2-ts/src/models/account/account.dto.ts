import { z } from 'zod';

/**
 * /v2/account definition
 */
export const AccountDTO = z.object({
	/** Account id. */
	id: z.string(),
	/** Account age. */
	age: z.number(),
	/** Account name. */
	name: z.string(),
	/** Current account world. */
	world: z.number(),
	/** Account memberships. */
	guilds: z.array(z.string()),
	/** Account leaderships. */
	guild_leader: z.array(z.string()),
	/** Account creation date. */
	created: z.string(),
	/** Account expansion access status. */
	access: z.array(z.string()),
	/** Account commander tag. */
	commander: z.boolean(),
	/** Account fractal level. */
	fractal_level: z.number(),
	/** Account daily achievement points. */
	daily_ap: z.number(),
	/** Account monthly achievement points. */
	monthly_ap: z.number(),
	/** Account World vs World rank. */
	wvw_rank: z.number(),
	/** Last modification date. */
	last_modified: z.string().optional(),
	/** Account build storage slots. */
	build_storage_slots: z.number().optional()
});
