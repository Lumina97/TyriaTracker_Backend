import { z } from 'zod';

const WeaponDetails = z.object({
	/** The weapon type. */
	type: z.string(),
	/** The damage type. */
	damage_type: z.enum(['Physical', 'Fire', 'Lightning', 'Ice', 'Choking'])
});

const GatheringToolDetails = z.object({
	/** The tool type. */
	type: z.enum(['Foraging', 'Logging', 'Mining'])
});

const RaceGenderChoice = z.enum([
	'AsuraMale',
	'AsuraFemale',
	'CharrMale',
	'CharrFemale',
	'HumanMale',
	'HumanFemale',
	'NornMale',
	'NornFemale',
	'SylvariMale',
	'SylvariFemale'
]);

const ArmorDetails = z.object({
	/** The armor type (slot). */
	type: z.string(),
	/** The armor weight. */
	weight_class: z.enum(['Clothing', 'Light', 'Medium', 'Heavy']),
	/** An object containing information on default slots and skin overrides.
	 * If the array item is null, this means dye cannot be applied to that
	 * slot, except if otherwise overriden by non-null values in the overrides array. */
	dye_slots: z.object({
		default: z.array(
			z.union([
				z.null(),
				z.object({
					/** The id of the default color. Can be resolved against /v2/colors.*/
					color_id: z.number(),
					/** The type of material. */
					material: z.enum(['cloth', 'leather', 'metal'])
				})
			])
		),
		/** Object of race/gender overrides. */
		overrides: z.record(
			RaceGenderChoice,
			z.object({
				/** The id of the default color. Can be resolved against /v2/colors. */
				color_id: z.number(),
				/** The type of material. */
				material: z.enum(['cloth', 'leather', 'metal'])
			})
		)
	})
});

/**
 * /v2/skins definition
 */
export const SkinsDTO = z.array(
	z.object({
		/** The skin id. */
		id: z.number(),
		/** The name of the skin. */
		name: z.string(),
		/** The skin type, either Armor, Weapon, Back or Gathering. */
		type: z.string(),
		/**
		 * Additional skin flags. Options:
		 * ShowInWardrobe – When displayed in the account wardrobe (set for all skins listed in the API).
		 * NoCost – When applying the skin is free.
		 * HideIfLocked – When the skin is hidden until it is unlocked.
		 * OverrideRarity - When the skin overrides item rarity when applied
		 */
		flags: z.array(z.enum(['ShowInWardrobe', 'NoCost', 'HideIfLocked', 'OverrideRarity'])),
		/** Race restrictions that apply to the skin, e.g. Human will be a listed restriction, if the skin can only be applied to human characters. */
		restrictions: z.array(z.string()),
		/** The full icon URL. */
		icon: z.string(),
		/** The rarity of the skin */
		rarity: z.string(),
		/** Optional skin description. */
		description: z.string().optional(),
		/** Additional skin details if applicable, depending on the skin type */
		details: z.union([ArmorDetails, GatheringToolDetails, WeaponDetails]).optional()
	})
);
