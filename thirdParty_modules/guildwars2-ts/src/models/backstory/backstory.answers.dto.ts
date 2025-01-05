import { z } from 'zod';

/**
 * /v2/backstory/answers definition
 */
export const BackstoryAnswersDTO = z.array(
	z.object({
		/** The id of the answer. */
		id: z.string(),
		/** The title (or name) of the answer. */
		title: z.string(),
		/** The description of the answer; as displayed in-game when presented as an answer choice
		 * to a question during the Biography portion of character creation. */
		description: z.string(),
		/** The Story Journal entry for the answer; as displayed in-game. */
		journal: z.string(),
		/** The id of the Biography question that this answers; Can be resolved against v2/backstory/questions. */
		question: z.number(),
		/** When present, an array of professions that this answer is available as a choice for. */
		professions: z.array(z.string()).optional(),
		/** When present, an array of races that this answer is available as a choice for. */
		races: z.array(z.string()).optional()
	})
);
