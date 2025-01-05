import { z } from 'zod';

/**
 * /v2/account/recipes definition
 * Can be resolved against /v2/recipes
 */
export const AccountRecipesDTO = z.array(
	/** Id of the recipe. */
	z.number()
);
