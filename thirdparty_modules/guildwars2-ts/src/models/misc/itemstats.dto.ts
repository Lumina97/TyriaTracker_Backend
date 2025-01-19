import { z } from 'zod';

const Attributes = z.enum([
	'AgonyResistance',
	'BoonDuration',
	'ConditionDamage',
	'ConditionDuration',
	'CritDamage',
	'Healing',
	'Power',
	'Precision',
	'Toughness',
	'Vitality'
]);

const Attribute = z.object({
	/** The name of the attribute. */
	attribute: Attributes,
	/** The multiplier number for that attribute. */
	multiplier: z.number(),
	/** The value number for that attribute. */
	value: z.number()
});

/**
 * /v2/itemstats definition
 */
export const ItemStatsDTO = z.array(
	z.object({
		/** The itemstat id. */
		id: z.number(),
		/** The name of the set of stats. */
		name: z.string(),
		/** The list of bonus attributes. */
		attributes: z.array(Attribute)
	})
);
