import { z } from 'zod';

const GuildLogJoinedDTO = z.object({
	/** The type of log entry. */
	type: z.literal('joined'),
	/** The account name of the guild member who generated this log entry. */
	user: z.string()
});

const GuildLogInvitedDTO = z.object({
	/** The type of log entry. */
	type: z.literal('invited'),
	/** The account name of the guild member who generated this log entry. */
	user: z.string(),
	/** Account name of the guild member which invited the player. */
	invited_by: z.string()
});

const GuildLogKickDTO = z.object({
	/** The type of log entry. */
	type: z.literal('kick'),
	/** The account name of the guild member who generated this log entry. */
	user: z.string(),
	/** Account name of the guild member which kicked the player. */
	kicked_by: z.string()
});

const GuildLogRankChangeDTO = z.object({
	/** The type of log entry. */
	type: z.literal('rank_change'),
	/** The account name of the guild member who generated this log entry. */
	user: z.string(),
	/** Old rank name. */
	old_rank: z.string(),
	/** New rank name. */
	new_rank: z.string(),
	/** Account name of the guild member which changed the player rank. */
	changed_by: z.string().optional()
});

const GuildLogStashDTO = z.object({
	/** The type of log entry. */
	type: z.literal('stash'),
	/** Stash operation type. */
	operation: z.enum(['deposit', 'withdraw', 'move']),
	/** The item ID that was deposited into the treasury. */
	item_id: z.number(),
	/** How many of the specified item was deposited. */
	count: z.number(),
	/** How many coins (in copper) were deposited. */
	coins: z.number()
});

const GuildLogMotdDTO = z.object({
	/** The type of log entry. */
	type: z.literal('motd'),
	/** The account name of the guild member who generated this log entry. */
	user: z.string(),
	/** The new message of the day. */
	motd: z.string()
});

const GuildLogUpgradeDTO = z.object({
	/** The type of log entry. */
	type: z.literal('upgrade'),
	/** The type of interaction had. */
	action: z.enum(['queued', 'cancelled', 'completed', 'sped_up']),
	/** If upgrade was completed, indicates how many upgrades were added. */
	count: z.number().optional(),
	/** The id of the completed upgrade. */
	upgrade_id: z.number(),
	/** May be added if the upgrade was created through a scribe station by a scribe. */
	recipe_id: z.number().optional()
});

/**
 * /v2/guild/:id/log definition
 */
export const GuildLogDTO = z.array(
	z
		.object({
			/** An ID to uniquely identify the log entry within the scope of the guild. Not globally unique. */
			id: z.number(),
			/** ISO-8601 standard timestamp for when the log entry was created. */
			time: z.string()
		})
		.and(
			z.discriminatedUnion('type', [
				GuildLogJoinedDTO,
				GuildLogInvitedDTO,
				GuildLogKickDTO,
				GuildLogRankChangeDTO,
				GuildLogStashDTO,
				GuildLogMotdDTO,
				GuildLogUpgradeDTO
			])
		)
);
