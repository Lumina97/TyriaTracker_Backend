import { z } from 'zod';

/**
 * /v2/characters/:id/quests definition
 */
export const CharacterQuestsDTO = z.array(
	/** Id of the quest, selected during story progression. */
	z.number()
);
