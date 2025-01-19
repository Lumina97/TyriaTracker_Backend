import { z } from 'zod';

/**
 * /v2/dailycrafting definition
 */
export const DailyCraftingDTO = z.array(
	/** Name of the daily craftable item. */
	z.string()
);
