import { z } from 'zod';

/**
 * /v2/achievements/categories/:ids definition
 */
export const AchievementCategoriesDTO = z.array(
	z.object({
		/** Category id.. */
		id: z.number(),
		/** Category name.. */
		name: z.string(),
		/** Category description. */
		description: z.string(),
		/** A number describing where to sort this category among other the other
		 * categories in its group. Lowest numbers go first, highest numbers go last. */
		order: z.number(),
		/** A URL to an image for the icon of the category. */
		icon: z.string(),
		/** Achievement ids in this category.
		 * Can be resolved against /v2/achievements. */
		achievements: z.array(z.number())
	})
);
