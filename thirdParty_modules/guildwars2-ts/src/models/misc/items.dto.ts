import { z } from 'zod';

const ItemType = z.enum([
	'Armor',
	'Back',
	'Bag',
	'Consumable',
	'Container',
	'CraftingMaterial',
	'Gathering',
	'Gizmo',
	'JadeTechModule',
	'Key',
	'MiniPet',
	'PowerCore',
	'Tool',
	'Trait',
	'Trinket',
	'Trophy',
	'UpgradeComponent',
	'Weapon'
]);

const ItemRarity = z.enum(['Junk', 'Basic', 'Fine', 'Masterwork', 'Rare', 'Exotic', 'Ascended', 'Legendary']);

const ItemFlags = z.enum([
	'AccountBindOnUse',
	'AccountBound',
	'Attuned',
	'BulkConsume',
	'DeleteWarning',
	'HideSuffix',
	'Infused',
	'MonsterOnly',
	'NoMysticForge',
	'NoSalvage',
	'NoSell',
	'NotUpgradeable',
	'NoUnderwater',
	'SoulbindOnAcquire',
	'SoulBindOnUse',
	'Tonic',
	'Unique'
]);

const ItemGameTypes = z.enum(['Activity', 'Dungeon', 'Pve', 'Pvp', 'Wvw', 'PvpLobby']);

const ItemRestrictions = z.enum([
	'Asura',
	'Charr',
	'Female',
	'Human',
	'Norn',
	'Sylvari',
	'Elementalist',
	'Engineer',
	'Guardian',
	'Mesmer',
	'Necromancer',
	'Ranger',
	'Thief',
	'Warrior'
]);

const ItemUpgrade = z.object({
	/** Describes the method of upgrading. */
	upgrade: z.enum(['Attunement', 'Infusion']),
	/** The item ID that results from performing the upgrade. */
	item_id: z.number()
});

const Attribute = z.object({
	/** Attribute this bonus applies to. */
	attribute: z.enum([
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
	]),
	/** The modifier value. */
	modifier: z.number()
});

const InfixUpgrade = z.object({
	/** The itemstat id. Can be resolved against /v2/itemstats.
	 * The usual whitelist restrictions apply, and not all itemstats may be visible. */
	id: z.number(),
	/** List of attribute bonuses. */
	attributes: z.array(Attribute),
	/** Object containing an additional effect.
	 * This is used for Boon Duration, Condition Duration,
	 * or additional attribute bonuses for ascended trinkets or back items. */
	buff: z
		.object({
			/** The skill id of the effect. */
			skill_id: z.number(),
			/** The effect's description. */
			description: z.string().optional()
		})
		.optional()
});

const InfusionSlot = z.object({
	/**
	 * Infusion slot type of infusion upgrades.
	 * The array contains a maximum of one value
	 */
	flags: z.array(z.enum(['Enrichment', 'Infusion'])).max(1),
	/**
	 * The infusion upgrade already in the armor piece.
	 */
	item_id: z.number().optional()
});

const ArmorDetails = z.object({
	/** The armor slot type. */
	type: z.enum(['Boots', 'Coat', 'Gloves', 'Helm', 'HelmAquatic', 'Leggings', 'Shoulders']),
	/** The weight class of the armor piece. */
	weight_class: z.enum(['Heavy', 'Medium', 'Light', 'Clothing']),
	/** The defense value of the armor piece. */
	defense: z.number(),
	/** Infusion slots of the armor piece. */
	infusion_slots: z.array(InfusionSlot),
	/** The value used to calculate attributes. See /v2/itemstats. */
	attribute_adjustments: z.number(),
	/** The infix upgrade. */
	infix_upgrade: InfixUpgrade.optional()
});

const BackItemDetails = z.object({
	/** Infusion slots of the back item. */
	infusion_slots: z.array(InfusionSlot),
	/** The value used to calculate attributes. See /v2/itemstats. */
	attribute_adjustments: z.number().optional(),
	/** The infix upgrade. */
	infix_upgrade: InfixUpgrade.optional(),
	/** The id of the item suffix. */
	suffix_item_id: z.number().optional(),
	/** The secondary id of the item suffix. */
	secondary_suffix_item_id: z.string(),
	/** Selectable stat ids. Can be resolved by /v2/itemstats */
	stat_choices: z.array(z.number()).optional()
});

const BagDetails = z.object({
	/** The number of bag slots. */
	size: z.number(),
	/** Whether the bag is invisible or safe. */
	no_sell_or_sort: z.boolean()
});

const ConsumableType = z.enum([
	'AppearanceChange',
	'Booze',
	'ContractNpc',
	'Currency',
	'Food',
	'Generic',
	'Halloween',
	'Immediate',
	'MountRandomUnlock',
	'RandomUnlock',
	'Transmutation',
	'Unlock',
	'UpgradeRemoval',
	'Utility',
	'TeleportToFriend'
]);

const UnlockType = z.enum([
	'BagSlot',
	'BankTab',
	'Champion',
	'CollectibleCapacity',
	'Content',
	'CraftingRecipe',
	'Dye',
	'GliderSkin',
	'Minipet',
	'Ms',
	'Outfit',
	'RandomUnlock',
	'SharedSlot'
]);

const ConsumableDetails = z.object({
	/** Consumable type. */
	type: ConsumableType,
	/** Effect description for consumables applying an effect. */
	description: z.string().optional(),
	/** Effect duration, in milliseconds. */
	duration_ms: z.number().optional(),
	/** Unlock type for unlock consumables */
	unlock_type: UnlockType.optional(),
	/** The dye id for dye unlocks. */
	color_id: z.number().optional(),
	/** The recipe id for recipe unlocks. */
	recipe_id: z.number().optional(),
	/** Additional recipe ids for recipe unlocks */
	extra_recipe_ids: z.array(z.number()).optional(),
	/** The guild upgrade id for the item. Can be resolved by /v2/guild/upgrades. */
	guild_upgrade_id: z.number().optional(),
	/** The number of stacks of the effect applied by this item. */
	apply_count: z.number().optional(),
	/** The effect type name of the consumable. */
	name: z.string().optional(),
	/** The icon of the effect. */
	icon: z.string().optional(),
	/** A list of skin ids which this item unlocks. Can be resolved by /v2/skins. */
	skins: z.array(z.number()).optional()
});

const ContainerDetails = z.object({
	/** Container type. */
	type: z.enum(['Default', 'GiftBox', 'Immediate', 'OpenUI'])
});

const GatheringDetails = z.object({
	/** Gathering utility type. */
	type: z.enum(['Foraging', 'Logging', 'Mining', 'Bait', 'Lure'])
});

const GizmoDetails = z.object({
	/** Gizmo type. */
	type: z.enum(['Default', 'ContainerKey', 'RentableContractNpc', 'UnlimitedConsumable']),
	/** The id of the guild decoration, which can be deposited. Can be resolved by /v2/guild/upgrades. */
	guild_upgrade_id: z.number().optional(),
	/** Vendor ids of the gizmo. */
	vendor_ids: z.array(z.number()).optional()
});

const MiniatureDetails = z.object({
	/** The miniature this item unlocks. Can be resolved by /v2/minis. */
	minipet_id: z.number()
});

const SalvageKitDetails = z.object({
	/** The tool type. Always the same value. */
	type: z.literal('Salvage'),
	/** Number of charges. */
	charges: z.number()
});

const TrinketDetails = z.object({
	/** The trinket type. */
	type: z.enum(['Accessory', 'Amulet', 'Ring']),
	/** Infusion slots of the trinket. */
	infusion_slots: z.array(InfusionSlot),
	/** The value used to calculate attributes. See /v2/itemstats */
	attribute_adjustments: z.number(),
	/** The infix upgrade. */
	infix_upgrade: InfixUpgrade.optional(),
	/** The id of the item suffix. */
	suffix_item_id: z.number().optional(),
	/** The secondary id of the item suffix. */
	secondary_suffix_item_id: z.string(),
	/** Selectable stat ids. Can be resolved by /v2/itemstats */
	stat_choices: z.array(z.number()).optional()
});

const TrophyAndCraftingDetails = z.undefined();

const UpgradeComponentFlags = z.enum([
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
	'LongBow',
	'Speargun',
	'Staff',
	'Sword',
	'Torch',
	'Trident',
	'Warhorn',
	'HeavyArmor',
	'MediumArmor',
	'LightArmor',
	'Trinket'
]);

const UpgradeComponentDetails = z.object({
	/** The upgrade component type. */
	type: z.enum(['Default', 'Gem', 'Rune', 'Sigil']),
	/** The items that can be upgraded with the upgrade component. */
	flags: z.array(UpgradeComponentFlags),
	/** Applicable infusion slot for infusion upgrades. */
	infusion_upgrade_flags: z.array(z.enum(['Enrichment', 'Infusion'])),
	/** The suffix appended to the item name when the component is applied. */
	suffix: z.string().optional(),
	/** The infix upgrade object. */
	infix_upgrade: InfixUpgrade,
	/** The bonuses from runes. */
	bonuses: z.array(z.string()).optional()
});

const WeaponType = z.enum([
	'Axe',
	'Dagger',
	'Mace',
	'Pistol',
	'Scepter',
	'Sword',
	'Focus',
	'Shield',
	'Torch',
	'Warhorn',
	'Greatsword',
	'Hammer',
	'LongBow',
	'Rifle',
	'ShortBow',
	'Staff',
	'Harpoon',
	'Speargun',
	'Trident',
	'LargeBundle',
	'SmallBundle',
	'Toy',
	'ToyTwoHanded'
]);

const WeaponDetails = z.object({
	/** The weapon type. */
	type: WeaponType,
	/** The damage type. */
	damage_type: z.enum(['Fire', 'Ice', 'Lightning', 'Physical', 'Choking']),
	/** Minimum weapon power. */
	min_power: z.number(),
	/** Maximum weapon power; */
	max_power: z.number(),
	/** The defense value of the weapon. */
	defense: z.number(),
	/** Infusion slots of the trinket. */
	infusion_slots: z.array(InfusionSlot),
	/** The value used to calculate attributes. See /v2/itemstats. */
	attribute_adjustments: z.number(),
	/** The infix upgrade. */
	infix_upgrade: InfixUpgrade.optional(),
	/** The id of the item suffix. */
	suffix_item_id: z.number().optional(),
	/** The secondary id of the item suffix. */
	secondary_suffix_item_id: z.string(),
	/** Selectable stat ids. Can be resolved by /v2/itemstats */
	stat_choices: z.array(z.number()).optional()
});

/**
 * /v2/items definition
 */
export const ItemsDTO = z.array(
	z.object({
		/** The item id. */
		id: z.number(),
		/** The chat link. */
		chat_link: z.string(),
		/** The item name. */
		name: z.string(),
		/** The full icon url. */
		icon: z.string().optional(),
		/** The item description. */
		description: z.string().optional(),
		/** The item type. */
		type: ItemType,
		/** The item rarity. */
		rarity: ItemRarity,
		/** The required level. */
		level: z.number(),
		/** The value in coins when selling to a vendor.
		 * Note: Can be non-zero even when the item has the NoSell flag. */
		vendor_value: z.number(),
		/** The default skin id. */
		default_skin: z.number().optional(),
		/** Flags applying to the item. */
		flags: z.array(ItemFlags),
		/** The game types in which the item is usable.
		 * At least one game type is specified. */
		game_types: z.array(ItemGameTypes),
		/** Restrictions applied to the item. */
		restrictions: z.array(ItemRestrictions),
		/** Lists what items this item can be upgraded into, and the method of upgrading. */
		upgrades_into: z.array(ItemUpgrade).optional(),
		/** Lists what items this item can be upgraded from, and the method of upgrading. */
		upgrades_from: z.array(ItemUpgrade).optional(),
		/** Additional item details, if applicable. */
		details: z.union([
			ArmorDetails,
			BackItemDetails,
			BagDetails,
			ConsumableDetails,
			ContainerDetails,
			GatheringDetails,
			GizmoDetails,
			MiniatureDetails,
			SalvageKitDetails,
			TrinketDetails,
			TrophyAndCraftingDetails,
			UpgradeComponentDetails,
			WeaponDetails
		])
	})
);
