import { z } from 'zod';

/**
 * /v2/mapchests definition.
 */
export const MapChestsDTO = z.array(
	/** The map chest id. */
	z.string()
);
