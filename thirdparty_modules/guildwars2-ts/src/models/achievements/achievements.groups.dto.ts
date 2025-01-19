import { z } from 'zod';

/**
 * /v2/achievements/groups definition
 */
export const AchievementGroupsDTO = z.object({
	/** The group's GUID. */
	id: z.string(),
	/** The group's name. */
	name: z.string(),
	/** The group's description. */
	description: z.string(),
	/**
	 * A number describing where to sort this group among other groups.
	 * Lowest numbers go first, highest numbers go last. */
	order: z.number(),
	/**
	 * An array containing a number of category IDs that this group contains.
	 * Can be resolved against /v2/achievements/categories. */
	categories: z.array(z.number())
});
