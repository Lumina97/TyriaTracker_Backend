import { z } from 'zod';

/**
 * /v2/characters definition
 */
export const CharactersDTO = z.array(
	/** Character name. */
	z.string()
);
