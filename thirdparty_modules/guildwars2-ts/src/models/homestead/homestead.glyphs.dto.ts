import { z } from 'zod';

/**
 * /v2/homestead/glyphs definition
 */
export const HomesteadGlyphsDTO = z.array(
	z.object({
		/** The homestead glyph id. */
		id: z.string(),
		/** The id of the glyph item.
		 * Can be compared to the /v2/items endpoint. */
		item_id: z.number(),
		/** The slot it is attached to. */
		slot: z.enum(['harvesting', 'mining', 'logging'])
	})
);
