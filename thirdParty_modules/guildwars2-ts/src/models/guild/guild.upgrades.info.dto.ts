import { z } from 'zod';

/**
 * /v2/guild/upgrades definition.
 */
export const GuildUpgradesInfoDTO = z.array(
	z
		.object({
			/** The upgrade id. */
			id: z.number(),
			/** The name of the upgrade. */
			name: z.string(),
			/** The guild upgrade description. */
			description: z.string(),
			/** A URL pointing to an icon for the upgrade. */
			icon: z.string(),
			/** The time it takes to build the upgrade. */
			build_time: z.number(),
			/** The prerequisite level the guild must be at to build the upgrade. */
			required_level: z.number(),
			/** The amount of guild experience that will be awarded upon building the upgrade. */
			experience: z.number(),
			/** An array of upgrade IDs that must be completed before this can be built. */
			prerequisites: z.array(z.number()),
			/** An array of objects describing the upgrade's cost. */
			costs: z.array(
				z.discriminatedUnion('type', [
					z.object({
						/** The type of cost. */
						type: z.literal('Item'),
						/** The id of the item, if applicable, can be resoled against v2/items. */
						item_id: z.number().optional(),
						/** The name of the cost. */
						name: z.string(),
						/** The amount needed. */
						count: z.number()
					}),
					z.object({
						/** The type of cost. */
						type: z.literal('Collectible'),
						/** The id of the item, if applicable, can be resoled against v2/items. */
						item_id: z.number().optional(),
						/** The name of the cost. */
						name: z.string(),
						/** The amount needed. */
						count: z.number()
					}),
					z.object({
						/** The type of cost. */
						type: z.literal('Currency'),
						/** The name of the cost. */
						name: z.string(),
						/** The amount needed. */
						count: z.number()
					}),
					z.object({
						/** The type of cost. */
						type: z.literal('Coins'),
						/** The amount needed. */
						count: z.number()
					})
				])
			)
		})
		.and(
			z.discriminatedUnion('type', [
				z.object({
					/** The upgrade type. */
					type: z.literal('AccumulatingCurrency')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('Boost')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('Claimable')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('Consumable')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('Decoration')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('GuildHall')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('GuildHallExpedition')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('Hub')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('Queue')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('Unlock')
				}),
				z.object({
					/** The upgrade type. */
					type: z.literal('BankBag'),
					/** The maximum item slots of the guild bank tab. */
					bag_max_items: z.number().optional(),
					/** The maximum amount of coins that can be stored in the bank tab. */
					bag_max_coins: z.number().optional()
				})
			])
		)
);
