import { z } from 'zod';

/**
 * /v2/maps definition
 */
export const MapsDTO = z.array(
	z.object({
		/** The map id. */
		id: z.number(),
		/** The map name. */
		name: z.string(),
		/** The minimal level for this map. */
		min_level: z.number(),
		/** The maximum level for this map. */
		max_level: z.number(),
		/** The default floor for this map. */
		default_floor: z.number(),
		/** The map type. */
		type: z.enum([
			'BlueHome',
			'Center',
			'EdgeOfTheMists',
			'GreenHome',
			'Instance',
			'JumpPuzzle',
			'Public',
			'Pvp',
			'RedHome',
			'Tutorial',
			'Unknown'
		]),
		/** A list of available floors for this map. */
		floors: z.array(z.number()),
		/** The id of the region this map belongs to. */
		region_id: z.number().optional(),
		/** The name of the region this map belongs to. */
		region_name: z.string().optional(),
		/** The id of the continent this map belongs to. */
		continent_id: z.number().optional(),
		/** The name of the continent this map belongs to. */
		continent_name: z.string().optional(),
		/** The dimensions of the map, given as the coordinates of the lower-left (SW) and upper-right (NE) corners. */
		map_rect: z.array(z.array(z.number())),
		/** The dimensions of the map within the continent coordinate system, given as the coordinates of the upper-left (NW) and lower-right (SE) corners. */
		continent_rect: z.array(z.array(z.number()))
	})
);
