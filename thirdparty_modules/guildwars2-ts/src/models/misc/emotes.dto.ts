import { z } from 'zod';

/**
 * /v2/emotes definition
 */
export const EmotesDTO = z.array(
	z.object({
		/** Id of the emote. */
		id: z.string(),
		/** List of all available commands for the emote. */
		commands: z.array(z.string()),
		/** List of ids of the items. Can be resolved against /v2/items. */
		unlock_items: z.array(z.number())
	})
);
