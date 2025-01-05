import { z } from 'zod';

/**
 * /v2/characters/backstory definition
 */
export const CharacterBackstoryDTO = z.object({
	/** Character backstory selections. Can be resolved against /v2/backstory/answers. */
	backstory: z.array(z.string())
});
