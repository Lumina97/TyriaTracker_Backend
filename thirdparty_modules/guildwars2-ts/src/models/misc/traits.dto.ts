import { z } from 'zod';
import {
	AttributeAdjust,
	Buff,
	ComboField,
	Damage,
	Distance,
	Finisher,
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
} from './skills.dto';

const BuffConversion = z.object({
	type: z.literal('BuffConversion'),
	/** The attribute that is used to calculate the attribute gain. */
	source: z.string(),
	/** How much of the source attribute is added to target. */
	percent: z.number(),
	/** The attribute that gets added to. */
	target: z.string()
});

const Facts = z
	.object({
		/** An arbitrary localized string describing the fact.*/
		text: z.string().optional(),
		/** A URL to the icon shown with the fact. Not included with all facts.*/
		icon: z.string().optional()
	})
	.and(
		z.discriminatedUnion('type', [
			AttributeAdjust,
			Buff,
			BuffConversion,
			ComboField,
			Finisher,
			Damage,
			Distance,
			NoData,
			NumberType,
			Percent,
			PrefixedBuff,
			Radius,
			Range,
			Recharge,
			StunBreak,
			Time,
			Unblockable,
			/** Life force cost specifically is missing a type field. */
			z.object({
				type: z.undefined(),
				/** Cost per cast. Life Force ONLY. */
				percent: z.number().optional()
			})
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

const Skills = z.object({
	/** The ID of the skill. */
	id: z.number(),
	/** The name of the skill. */
	name: z.string(),
	/** The description of the skill. */
	description: z.string(),
	/** The URL for the icon of the skill. */
	icon: z.string(),
	/** A list of tooltip facts associated with the skill. */
	facts: z.array(Facts).optional(),
	/** A list of additions or changes to tooltip facts where there is interplay between traits. */
	traited_facts: z.array(TraitedFacts).optional()
});

/**
 * /v2/traits definition
 */
export const TraitsDTO = z.array(
	z.object({
		/** The trait id. */
		id: z.number(),
		/** The trait name. */
		name: z.string(),
		/** The trait's icon URL. */
		icon: z.string(),
		/** The trait description. */
		description: z.string().optional(),
		/** The trait order. */
		order: z.number().optional(),
		/** The id of the specialization this trait belongs to. */
		specialization: z.number(),
		/** The trait's tier (Adept, Master, Grandmaster) as a value from 1-3.
		 * Elite specializations also contain a tier 0 minor trait, describing which weapon the elite specialization gains access to. */
		tier: z.number(),
		/** Either Major or Minor depending on the trait's slot.
		 * Minor traits are the ones given immediately when choosing a specialization. */
		slot: z.enum(['Major', 'Minor']),
		/** A list of tooltip facts associated with the trait itself. */
		facts: z.array(Facts).optional(),
		/** A list of additions or changes to tooltip facts where there is interplay between traits. */
		traited_facts: z.array(TraitedFacts).optional(),
		/** A list of skills which may be triggered by the trait. */
		skills: z.array(Skills).optional()
	})
);
