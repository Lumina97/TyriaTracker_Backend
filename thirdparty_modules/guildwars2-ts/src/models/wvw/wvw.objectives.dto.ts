import { z } from 'zod';

/**
 * /v2/wvw/objectives definition
 */
export const WvWObjectivesDTO = z.array(
	z.object({
		/** The objective id. */
		id: z.string(),
		/** The name of the objective. */
		name: z.string(),
		/** The type of the objective. */
		type: z.enum(['Camp', 'Castle', 'Keep', 'Mercenary', 'Tower', 'Ruins', 'Resource', 'Generic', 'Spawn']),
		/** The map sector the objective can be found in. Refer to /v2/continents. */
		sector_id: z.number(),
		/** The ID of the map that this objective can be found on. */
		map_id: z.number(),
		/** The map that this objective can be found on. */
		map_type: z.enum(['GreenHome', 'BlueHome', 'RedHome', 'Center', 'EdgeOfTheMist']),
		/** An array of three numbers representing the X, Y and Z coordinates of the objectives marker on the map. */
		coord: z.array(z.number()).length(3),
		/** An array of two numbers representing the X and Y coordinates of the sector centroid. */
		label_coord: z.array(z.number()).length(2),
		/** The icon link. */
		marker: z.string(),
		/** The chat code for the observed objective. */
		chat_link: z.string(),
		/** The upgrade id. Can be resolved against /v2/wvw/upgrades. */
		upgrade_id: z.number().optional()
	})
);
