import { z } from 'zod';

/**
 * /v2/guild/:id/upgrades definition
 * The endpoint will return an array of numbers resolved against /v2/guild/upgrades.
 */
export const GuildUpgradesDTO = z.array(
	/** The id of the upgrade. */
	z.number()
);
