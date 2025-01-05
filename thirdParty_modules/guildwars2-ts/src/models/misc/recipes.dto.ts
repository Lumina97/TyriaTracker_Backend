import { z } from 'zod';

const WeaponRecipes = z.enum([
	'Axe',
	'Dagger',
	'Focus',
	'Greatsword',
	'Hammer',
	'Harpoon',
	'LongBow',
	'Mace',
	'Pistol',
	'Rifle',
	'Scepter',
	'Shield',
	'ShortBow',
	'Speargun',
	'Staff',
	'Sword',
	'Torch',
	'Trident',
	'Warhorn'
]);

const ArmorRecipes = z.enum(['Boots', 'Coat', 'Gloves', 'Helm', 'Leggings', 'Shoulders']);

const TrinketRecipes = z.enum(['Amulet', 'Earring', 'Ring']);

const FoodRecipes = z.enum(['Dessert', 'Feast', 'IngredientCooking', 'Meal', 'Seasoning', 'Snack', 'Soup', 'Food']);

const CraftingComponentRecipes = z.enum(['Component', 'Inscription', 'Insignia', 'LegendaryComponent']);

const RefinementRecipes = z.enum(['Refinement', 'RefinementEctoplasm', 'RefinementObsidian']);

const GuildRecipes = z.enum(['GuildConsumable', 'GuildDecoration', 'GuildConsumableWvw']);

const OtherRecipes = z.enum(['Backpack', 'Bag', 'Bulk', 'Consumable', 'Dye', 'Food', 'Potion', 'UpgradeComponent']);

/**
 * /v2/recipes definition
 */
export const RecipesDTO = z.array(
	z.object({
		/** The recipe id. */
		id: z.number(),
		/** The recipe type. */
		type: z.union([
			WeaponRecipes,
			ArmorRecipes,
			TrinketRecipes,
			FoodRecipes,
			CraftingComponentRecipes,
			RefinementRecipes,
			GuildRecipes,
			OtherRecipes
		]),
		/** The item id of the produced item. Can be resolved against /v2/items. */
		output_item_id: z.number(),
		/** The amount of items produced. */
		output_item_count: z.number(),
		/** The time in milliseconds it takes to craft the item. */
		time_to_craft_ms: z.number(),
		/** The crafting disciplines that can use the recipe. */
		disciplines: z.array(
			z.enum([
				'Artificer',
				'Armorsmith',
				'Chef',
				'Huntsman',
				'Jeweler',
				'Leatherworker',
				'Tailor',
				'Weaponsmith',
				'Scribe'
			])
		),
		/** The required rating to craft the recipe. */
		min_rating: z.number(),
		/** Flags applying to the recipe. */
		flags: z.array(z.enum(['AutoLearned', 'LearnedFromItem'])),
		/** List of recipe ingredients */
		ingredients: z.array(
			z.object({
				/** Type of ingredient. */
				type: z.enum(['Currency', 'Item']),
				/** The ingredient's id. Can be resolved against /v2/items or /v2/currencies, depending on type */
				id: z.number(),
				/** The quantity of this ingredient. */
				count: z.number()
			})
		),
		/** List of recipe ingredients that come from the guild such as decorations or schematics. */
		guild_ingredients: z
			.array(
				z.object({
					/** The id of the used guild upgrade. Can be resolved against /v2/guild/upgrades. */
					upgrade_id: z.number(),
					/** The quantity of this guild ingredient. */
					count: z.number()
				})
			)
			.optional(),
		/** The id of the produced guild upgrade. Can be resolved against /v2/guild/upgrades. */
		output_upgrade_id: z.number().optional(),
		/** The chat code for the recipe. */
		chat_link: z.string()
	})
);
