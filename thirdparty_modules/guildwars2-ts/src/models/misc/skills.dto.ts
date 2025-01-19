import { z } from 'zod';

export const AttributeAdjust = z.object({
	type: z.literal('AttributeAdjust'),
	/** The amount target gets adjusted, based on a level 80 character at base stats. */
	value: z.number(),
	/** The attribute this fact adjusts. Note that a value of Healing indicates the fact is a heal skill, and Ferocity is encoded at CritDamage. */
	target: z.string()
});

export const Buff = z.object({
	type: z.literal('Buff'),
	/** The boon, condition, or effect referred to by the fact. */
	status: z.string(),
	/** The description of the status effect. */
	description: z.string().optional(),
	/** The number of stacks applied. */
	apply_count: z.number().optional(),
	/** The duration of the effect in seconds. Note that some facts of this type are just used to display
	 * the buff icon with text; in this case, duration is usually 0, or omitted entirely. */
	duration: z.number().optional()
});

export const ComboField = z.object({
	type: z.literal('ComboField'),
	/** The type of field. */
	field_type: z.enum(['Air', 'Dark', 'Fire', 'Ice', 'Light', 'Lightning', 'Poison', 'Smoke', 'Ethereal', 'Water'])
});

export const Finisher = z.object({
	type: z.literal('ComboFinisher'),
	/** The type of finisher. */
	finisher_type: z.enum(['Blast', 'Leap', 'Projectile', 'Whirl']),
	/** The percent chance that the finisher will trigger. */
	percent: z.number()
});

export const Damage = z.object({
	type: z.literal('Damage'),
	/** The amount of times the damage hits. */
	hit_count: z.number(),
	/** Indicates the damage multiplier value of that skill. */
	dmg_multiplier: z.number()
});

export const Distance = z.object({
	type: z.literal('Distance'),
	/** The distance value. */
	distance: z.number()
});

const Duration = z.object({
	type: z.literal('Duration'),
	/** The duration in seconds. */
	duration: z.number()
});

const Heal = z.object({
	type: z.literal('Heal'),
	/** The number of times the heal skill is applied. */
	hit_count: z.number()
});

const HealingAdjust = z.object({
	type: z.literal('HealingAdjust'),
	/** The number of times the heal value is applied. */
	hit_count: z.number()
});

export const NoData = z.object({
	/** This fact is usually used to display the Combat Only fact, but it can be used elsewhere. */
	type: z.literal('NoData')
});

export const NumberType = z.object({
	type: z.literal('Number'),
	/** The number value as referenced by text. */
	value: z.number()
});

export const Percent = z.object({
	type: z.literal('Percent'),
	/** The percentage value as referenced by text. */
	percent: z.number()
});

export const PrefixedBuff = z.object({
	type: z.literal('PrefixedBuff'),
	/** The boon, condition, or effect referred to by the fact. */
	status: z.string().optional(),
	/** The description of the status effect. */
	description: z.string().optional(),
	/** The number of stacks applied. */
	apply_count: z.number(),
	/** The duration of the effect in seconds. Note that some facts of this type are just used to display
	 * the buff icon with text; in this case, duration is usually 0, or omitted entirely. */
	duration: z.number(),
	/** Buff prefix. */
	prefix: z.object({
		text: z.string(),
		icon: z.string(),
		status: z.string().optional(),
		description: z.string().optional()
	})
});

export const Radius = z.object({
	type: z.literal('Radius'),
	/** The radius value. */
	distance: z.number()
});

export const Range = z.object({
	type: z.literal('Range'),
	/** The range of the trait/skill. */
	value: z.number()
});

export const Recharge = z.object({
	type: z.literal('Recharge'),
	/** The recharge time in seconds. */
	value: z.number()
});

export const StunBreak = z.object({
	type: z.literal('StunBreak'),
	/** If present, always true. */
	value: z.literal(true)
});

export const Time = z.object({
	type: z.literal('Time'),
	/** The time value in seconds. */
	duration: z.number()
});

export const Unblockable = z.object({
	type: z.literal('Unblockable'),
	/** If present, always true. */
	value: z.literal(true)
});

const Facts = z
	.object({
		/** An arbitrary localized string describing the fact. */
		text: z.string(),
		/** A URL to the icon shown with the fact. Not included with all facts. */
		icon: z.string().optional()
	})
	.and(
		z.discriminatedUnion('type', [
			AttributeAdjust,
			Buff,
			ComboField,
			Finisher,
			Damage,
			Distance,
			Duration,
			Heal,
			HealingAdjust,
			NoData,
			NumberType,
			Percent,
			PrefixedBuff,
			Radius,
			Range,
			Recharge,
			StunBreak,
			Time,
			Unblockable
		])
	);

const TraitedFacts = Facts.and(
	z.object({
		/** Specifies which trait has to be selected in order for this fact to take effect. */
		requires_trait: z.number(),
		/** This specifies the array index of the facts object it will override, if the trait specified in requires_trait is selected.
		 * If this field is omitted, then the fact contained within this object is to be appended to the existing facts array. */
		overrides: z.number().optional()
	})
);

/**
 * /v2/skills definition
 *
 * NOTE: This is mess, and there are a ton of optional fields.
 * A lot of optional types are impossible to define conditionally.
 * You're on your own.
 * Refer to this page for details: https://wiki.guildwars2.com/wiki/API:2/skills
 */
export const SkillsDTO = z.array(
	z.object({
		/** The skill id. */
		id: z.number(),
		/** The skill name. */
		name: z.string(),
		/** The skill description. */
		description: z.string(),
		/** A URL to an icon of the skill. */
		icon: z.string(),
		/** The chat link. */
		chat_link: z.string(),
		/** The skill type. */
		type: z.enum([
			'Bundle',
			'Elite',
			'Heal',
			'Monster',
			'Pet',
			'Profession',
			'Toolbelt',
			'Transform',
			'Utility',
			'Weapon'
		]),
		/** Indicates what weapon the skill is on. Can also be None if not applicable. */
		weapon_type: z.string().or(z.literal('None')),
		/** An array of strings indicating which profession(s) can use this skill. */
		professions: z.array(z.string()),
		/** A string indicating where this skill fits into. */
		// optional
		slot: z.union([
			z.custom<`Downed_${number}`>(val => (typeof val === 'string' ? /^Downed_[1-4]$/.test(val) : false)),
			z.custom<`Profession_${number}`>(val => (typeof val === 'string' ? /^Profession_[1-5]$/.test(val) : false)),
			z.custom<`Weapon_${number}`>(val => (typeof val === 'string' ? /^Weapon_[1-5]$/.test(val) : false)),
			z.literal('Elite'),
			z.literal('Pet'),
			z.literal('Utility')
		]),
		/** An array of skill fact objects describing the skill's effect. */
		facts: z.array(Facts).optional(),
		/** An array of skill fact objects that may apply to the skill, dependent on the player's trait choices. */
		traited_facts: z.array(TraitedFacts).optional(),
		/** An array of categories the skill falls under. Mostly used for organizational purposes. */
		categories: z.array(z.string()).optional(),
		/** Used for Elementalist weapon skills, indicates what attunement this skill falls under. */
		attunement: z.enum(['Fire', 'Water', 'Air', 'Earth']).optional(),
		/** Used for Revenant, Warrior, and Druid skills to indicate their energy cost. */
		cost: z.number().optional(),
		/** Indicates what off-hand must be equipped for this dual-wield skill to appear. */
		dual_wield: z.string().optional(),
		/** Used for skills that "flip over" into a new skill in the same slot to indicate what skill they flip to, such as Engineer toolkits or Herald facets. */
		flip_skill: z.number().optional(),
		/** Indicates the Initiative cost for thief skills. */
		initiative: z.number().optional(),
		/** Indicates the next skill in the chain, if applicable. */
		next_chain: z.number().optional(),
		/** Indicates the previous skill in the chain, if applicable. */
		prev_chain: z.number().optional(),
		/** Used to indicate that the skill will transform the player, replacing their skills with the skills listed in the array. */
		transform_skills: z.array(z.unknown()).optional(),
		/** Used to indicate that the skill will replace the player's skills with the skills listed in the array. */
		bundle_skills: z.array(z.unknown()).optional(),
		/** Used for Engineer utility skills to indicate their associated toolbelt skill. */
		toolbelt_skill: z.number().optional(),
		/** Used to indicate usage limitations, more than one value can be set. */
		flags: z.array(z.enum(['GroundTargeted', 'NoUnderwater']))
	})
);
