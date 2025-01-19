import { z } from 'zod';

/**
 * /v2/backstory/questions definition
 */
export const BackstoryQuestionsDTO = z.array(
	z.object({
		/** The id of the question. */
		id: z.number(),
		/** The title (or name) of the question. */
		title: z.string(),
		/** The description of the question; as displayed in-game when presented as a Biography choice during character creation. */
		description: z.string(),
		/** The order in which this question is displayed in-game while answering your characters' Biography questions during character creation. */
		order: z.number(),
		/** The list of answers for this question; Can be resolved against v2/backstory/answers. */
		answers: z.array(z.string()),
		/** When present, an array of races that this question is presented to. */
		races: z.array(z.string()).optional(),
		/** When present, an array of professions that this question is presented to. */
		professions: z.array(z.string()).optional()
	})
);
