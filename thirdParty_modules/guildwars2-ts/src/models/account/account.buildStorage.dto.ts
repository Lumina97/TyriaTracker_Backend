import { z } from 'zod';

/**
 * /v2/account/buildstorage definition
 */
export const AccountBuildStorageDTO = z.array(
	z.object({
		/** Name of the stored build. */
		name: z.string(),
		/** Profession of the stored build. */
		profession: z.string(),
		/** Specializations of the stored build. */
		specializations: z.array(
			z.object({
				/** Id of the specialization. */
				id: z.number(),
				/** Selected traits. */
				traits: z.array(z.union([z.number(), z.null()]))
			})
		),
		/** Selected utility skills. */
		skills: z
			.object({
				/** Id of the heal skill. */
				heal: z.union([z.number(), z.null()]),
				/** Ids of the utility skills. */
				utilities: z.array(z.union([z.number(), z.null()])),
				/** Id of the elite skill. */
				elite: z.union([z.number(), z.null()])
			})
			.optional(),
		/** Selected aquatic utility skills. */
		aquatic_skills: z
			.object({
				/** Id of the heal skill. */
				heal: z.union([z.number(), z.null()]),
				/** Ids of the utility skills. */
				utilities: z.array(z.union([z.number(), z.null()])),
				/** Id of the elite skill. */
				elite: z.union([z.number(), z.null()])
			})
			.optional(),
		/** Selected legends (revenant only). */
		legends: z.array(z.union([z.string(), z.null()])).optional(),
		/** Selected aquatic legends (revenant only). */
		aquatic_legends: z.array(z.union([z.string(), z.null()])).optional()
	})
);
