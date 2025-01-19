import { z } from 'zod';

/**
 * /v2/guild/:id definition.
 */
export const GuildDTO = z.object({
	/** The unique guild id. */
	id: z.string(),
	/** The guild name. */
	name: z.string(),
	/** The 2 to 4 letter guild tag. */
	tag: z.string(),
	/** The guild emblem. */
	emblem: z.object({
		/** An array containing information of the background of the guild emblem. */
		background: z.object({
			/** The emblem id. */
			id: z.number(),
			/** Array of emblem color ids. */
			colors: z.array(z.number())
		}),
		/** An array containing information of the foreground of the guild emblem. */
		foreground: z.object({
			/** The emblem id. */
			id: z.number(),
			/** Array of emblem color ids. */
			colors: z.array(z.number())
		}),
		/** An array of manipulations applied to the logo. */
		flags: z.array(
			z.enum([
				'FlipBackgroundHorizontal',
				'FlipBackgroundVertical',
				'FlipForegroundHorizontal',
				'FlipForegroundVertical'
			])
		)
	}),
	/** The current guild level. Only available when the Api token has member or leader privileges. */
	level: z.number().optional(),
	/** The message of the day. Only available when the Api token has member or leader privileges. */
	motd: z.string().optional(),
	/** The current guild influence. Only available when the Api token has member or leader privileges. */
	influence: z.number().optional(),
	/** The current aetherium level. Only available when the Api token has member or leader privileges. */
	aetherium: z.string().optional(),
	/** The current level of guild favor. Only available when the Api token has member or leader privileges. */
	favor: z.number().optional(),
	/** The current member count. Only available when the Api token has member or leader privileges. */
	member_count: z.number().optional(),
	/** The maximum member count. Only available when the Api token has member or leader privileges. */
	member_capacity: z.number().optional()
});
