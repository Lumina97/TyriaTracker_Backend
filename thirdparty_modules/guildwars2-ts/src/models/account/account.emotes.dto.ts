import { z } from 'zod';

/**
 * /v2/account/emotes definition
 * Can be resolved against /v2/emotes
 */
export const AccountEmotesDTO = z.array(
	/**
	 * Id of the emote.
	 */
	z.string()
);
