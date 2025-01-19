import { z } from 'zod';

/**
 * /v2/characters/:id/recipes definition
 */
export const CharacterRecipesDTO = z.object({
	/** Array of recipe ids. Can be resolved against /v2/recipes. */
	recipes: z.array(z.number())
});
