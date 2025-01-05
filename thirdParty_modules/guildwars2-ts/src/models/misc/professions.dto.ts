import { z } from 'zod';

const Weapon = z.enum([
	'Axe',
	'Dagger',
	'Mace',
	'Pistol',
	'Sword',
	'Scepter',
	'Focus',
	'Shield',
	'Torch',
	'Warhorn',
	'Greatsword',
	'Hammer',
	'Longbow',
	'Rifle',
	'Shortbow',
	'Staff',
	'Speargun',
	'Spear',
	'Trident'
]);

/**
 * /v2/professions definition
 */
export const ProfessionsDTO = z.array(
	z.object({
		/** The profession id. */
		id: z.string(),
		/** The name of the profession. */
		name: z.string(),
		/** The profession code for a build template link. */
		code: z.number().optional(),
		/** The icon for the profession. */
		icon: z.string(),
		/** The large icon for the profession. */
		icon_big: z.string(),
		/** The specialization ids. Can be resolved against /v2/specializations. */
		specializations: z.array(z.number()),
		/** List of training details. */
		training: z.array(
			z.object({
				/** The id of the skill or specialization. Can be resolved against /v2/skills and /v2/specializations. */
				id: z.number(),
				/** The category for the training object. */
				category: z.enum(['Skills', 'Specializations', 'EliteSpecializations']),
				/** The name of the skill or specialization indicated by the category and id. */
				name: z.string(),
				/** List of skills and traits training details tracks objects. */
				track: z.array(
					z
						.object({
							/** The cost to train this skill or trait. */
							cost: z.number()
						})
						.and(
							z.discriminatedUnion('type', [
								z.object({
									/** Whether this is a skill or trait. */
									type: z.literal('Trait'),
									/** The trait id. Can be resolved against /v2/traits. */
									trait_id: z.number()
								}),
								z.object({
									/** Whether this is a skill or trait. */
									type: z.literal('Skill'),
									/** The skill id. Can be resolved against /v2/skills. */
									skill_id: z.number()
								})
							])
						)
				)
			})
		),
		// weapons (object) - The weapons available for this profession. The key indicates the weapon type, which is one of the following:
		weapons: z.record(
			Weapon,
			z.object({
				/** Weapon slot flag. */
				flag: z.array(z.enum(['Mainhand', 'Offhand', 'TwoHand', 'Aquatic'])).optional(),
				/** The specializations id of the required specialization to use this weapon.
				 * Can be resolved against /v2/specializations. Only present if a specialization is required. */
				specialization: z.number().optional(),
				/** The list of weapon skills objects. */
				skills: z.array(
					z.object({
						/** The skill id. Can be resolved against /v2/skills. */
						id: z.number(),
						/** The skill bar slot that this weapon skill can be used in. */
						slot: z.union([
							z.enum(['Profession_1', 'Utility', 'Heal', 'Elite']),
							z.custom<`Weapon_${number}`>(val =>
								typeof val === 'string' ? /^Weapon_[1-5]$/.test(val) : false
							)
						]),
						/** The name of the offhand weapon this skill requires to be equipped. This field is usually only present for Thief skills. */
						offhand: z.string().optional(),
						/** The Elementalist attunement that this skill requires. This field is usually only present for Elementalist skills. */
						attunement: z.string().optional(),
						/** The name of the class the skill was stolen from. This only applies to thief stolen skills. */
						source: z.string().optional()
					})
				)
			})
		),
		/** Profession flags. */
		flags: z.array(z.enum(['NoRacialSkills', 'NoWeaponSwap'])),
		/** The first number is a skill palette ID obtained from a build template link, the second number is a skill ID.
		 * Can be resolved against /v2/skills. */
		skills_by_palette: z.array(z.number()).length(2).optional()
	})
);
