import { z } from 'zod';

/**
 * Detailed information on its appearance when applied on a specific material
 */
const MaterialColorData = z.object({
	/** Color brightness. */
	brightness: z.number(),
	/** Color contrast. */
	contrast: z.number(),
	/** Color hue. */
	hue: z.number(),
	/** Color saturation. */
	saturation: z.number(),
	/** Color lightness. */
	lightness: z.number(),
	/** Color RGB values. */
	rgb: z.array(z.number()).length(3)
});

/**
 * Hue information of a color
 */
const Hue = z.enum(['Gray', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']);

/**
 * Material information of a color
 */
const Material = z.enum(['Vibrant', 'Leather', 'Metal']);

/**
 * Rarity information of a color
 */
const Rarity = z.enum(['Starter', 'Common', 'Uncommon', 'Rare', 'Exclusive']);

/**
 * /v2/colors definition
 */
export const ColorsDTO = z.array(
	z.object({
		/** The color id. */
		id: z.number(),
		/** The color name. */
		name: z.string(),
		/** The base RGB values. */
		base_rgb: z.array(z.number()).length(3),
		/** Detailed information on its appearance when applied on cloth armor. */
		cloth: MaterialColorData,
		/** Detailed information on its appearance when applied on leather armor. */
		leather: MaterialColorData,
		/** Detailed information on its appearance when applied on metal armor. */
		metal: MaterialColorData,
		/** Detailed information on its appearance when applied on fur armor. */
		fur: MaterialColorData.optional(),
		/** ID of the dye item. */
		item: z.number().optional(),
		/** Color categories. */
		categories: z.tuple([Hue, Material, Rarity]).or(z.array(z.undefined()).length(0))
	})
);
