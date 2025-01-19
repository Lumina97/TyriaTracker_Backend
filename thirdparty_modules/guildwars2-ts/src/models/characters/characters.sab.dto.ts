import { z } from 'zod';

/**
 * /v2/characters/:id/sab definition
 */
export const CharacterSuperAdventureBoxDTO = z.object({
	/** Super Adventure Box zones. */
	zones: z.array(
		z.object({
			/** Unique zone id. */
			id: z.number(),
			/** Mode used when completing this zone. */
			mode: z.enum(['infantile', 'normal', 'tribulation']),
			/** Which world the zone is in. */
			world: z.number(),
			/** Zone number. */
			zone: z.number()
		})
	),
	/** Super Adventure Box unlocks. */
	unlocks: z.array(
		z.object({
			/** Unique unlock id. */
			id: z.number(),
			/** Unlocalized unlock description. */
			name: z.string().optional()
		})
	),
	/** Super Adventure box songs. */
	songs: z.array(
		z.object({
			/** Unique song id. */
			id: z.number(),
			/** Unlocalized song description. */
			name: z.enum(['secret_song', 'gatekeeper_lullaby', 'shatter_serenade'])
		})
	)
});
