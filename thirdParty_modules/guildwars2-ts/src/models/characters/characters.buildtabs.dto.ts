import { z } from 'zod';

const Specialization = z.array(
	z.object({
		/* The specialization id or null if none is selected.
		 * Can be resolved against /v2/specializations. */
		id: z.union([z.number(), z.null()]),
		/* Three trait ids or null in places where none is selected.
		 * Can be resolved against /v2/traits. */
		traits: z.array(z.union([z.number(), z.null()]))
	})
);

const Skills = z.object({
	/** The id of the heal skill or null if none is selected. */
	heal: z.union([z.number(), z.null()]),
	/** Three utility skill ids or null in places where none is selected. */
	utitilies: z.array(z.union([z.number(), z.null()])).optional(),
	/** The id of the elite skill or null if none is selected. */
	elite: z.union([z.number(), z.null()])
});

const Pets = z.object({
	/** Contains the two pet ids the ranger has equipped for terrestrial combat. */
	terrestrial: z.array(z.number()),
	/** Contains the two pet ids the ranger has equipped for aquatic combat. */
	aquatic: z.array(z.number())
});

const Build = z.object({
	/** Name given to the build */
	name: z.string(),
	/** The characters' profession. Can be resolved against /v2/professions. */
	profession: z.string(),
	/** Three objects providing information about the characters selected specializations. */
	specializations: Specialization,
	/* Contains information about the characters selected skills.
	 * Can be resolved against /v2/skills. */
	skills: Skills,
	/* Contains information about the characters selected underwater skills.
	 * Can be resolved against /v2/skills. */
	aquatic_skills: Skills,
	/* Included for revenants only. Two legend ids or null in places where none is selected.
	 * Can be resolved against /v2/legends. */
	legends: z
		.array(z.union([z.string(), z.null()]))
		.length(2)
		.optional(),
	/** Included for revenants only. The structure is the same as the one of legends above. */
	aquatic_legends: z
		.array(z.union([z.string(), z.null()]))
		.length(2)
		.optional(),
	/**
	 * Included for rangers only. Containers information about the characters selected pets.
	 * Can be resolved against /v2/pets.
	 */
	pets: Pets.optional()
});

/**
 * /v2/characters/:id/buildtabs definition
 */
export const CharacterBuildTabsDTO = z.array(
	z.object({
		/** Tab position. */
		tab: z.number(),
		/** Whether this is the tab selected on the character currently. */
		is_active: z.boolean(),
		/** Detailed information about the build. */
		build: Build
	})
);
