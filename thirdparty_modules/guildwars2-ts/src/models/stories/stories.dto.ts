import { z } from 'zod';

/**
 * /v2/stories definition
 */
export const StoriesDTO = z.array(
	z.object({
		/** The id of the story. */
		id: z.number(),
		/**
		 * The id for the story season.
		 * Can be resolved against /v2/stories/seasons.
		 */
		season: z.string(),
		/** The name of the story. */
		name: z.string(),
		/** The description of the story. */
		description: z.string(),
		/** The (in-game, not real-world) date of the story. */
		timeline: z.string(),
		/** The minimum level required for a character to begin this story. */
		level: z.number(),
		/** The order in which this story is displayed in the Story Journal. */
		order: z.number(),
		/** An array of chapter objects providing details about the chapters for this story. */
		chapters: z.array(
			z.object({
				/** The name of the chapter. */
				name: z.string()
			})
		),
		/** When present, provides a list of races that are eligible to participate in this story. */
		races: z.array(z.string()).optional(),
		/** When present, provides a list of additional requirements for a character to participate in this story. */
		flags: z.array(z.string()).optional()
	})
);
