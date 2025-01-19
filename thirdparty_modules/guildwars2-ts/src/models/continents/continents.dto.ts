import { z } from 'zod';

/**
 * /v2/continent/:id/floors/:id/regions/:id/maps/:id definition
 */
const ContinentsMaps = z.object({
	/** The map name. */
	name: z.string(),
	/** The minimum level of the map. */
	min_level: z.number(),
	/** The maximum level of the map. */
	max_level: z.number(),
	/** The default floor of the map. */
	default_floor: z.number(),
	/** The coordinates of the map label. */
	label_coord: z.array(z.number()).length(2).optional(), // TODO: The API is not telling us something correctly
	/** The dimensions of the map, given as the coordinates of the lower-left (SW) and upper-right (NE) corners. */
	map_rect: z.array(z.array(z.number())),
	/**
	 * The dimensions of the map within the continent coordinate system,
	 * given as top-left (NW) and bottom-right (SE) corner coordinates.
	 */
	continent_rect: z.array(z.array(z.number()).length(2)).length(2),
	/** A list of points of interest (landmarks, waypoints, vistas, etc). */
	points_of_interest: z.record(
		z.string(),
		z.object({
			/** The point of interest id. */
			id: z.number(),
			/** The name of the point of interest. */
			name: z.string().optional(), // TODO: A lot of POIs seemingly dont have a name
			/** Type of the point of interest. */
			type: z.string(),
			/** The floor of this object. */
			floor: z.number(),
			/** The coordinates of this object. */
			coord: z.array(z.number()),
			/** The point of interest chat link. */
			chat_link: z.string(),
			/** PoI icon. Only available for unlock types */
			icon: z.string().optional()
		})
	),
	/** A list of renown hearts. */
	tasks: z.record(
		z.string(),
		z.object({
			/** The renown heart id. */
			id: z.number(),
			/** The objective or name of the heart. */
			objective: z.string(),
			/** The level of the heart. */
			level: z.number(),
			/** The coordinates where it takes place. */
			coord: z.array(z.number()),
			/** A list of coordinates marking the boundary of the heart. */
			bounds: z.array(z.array(z.number())),
			/** The renown heart chat link. */
			chat_link: z.string()
		})
	),
	/** A list of skill challenges. */
	skill_challenges: z.array(
		z.object({
			/**
			 * The hero challenge id, formed of two numbers separated by a dash.
			 * The first number represents the expansion (0 for Core Tyria, 1 for Heart of Thorns and 2 for Path of Fire),
			 * and therefore could be used to change the hero challenge map marker icon.
			 * If the first number and dash prefix is removed from the string,
			 * the second number is no longer unique among other hero challenges.
			 */
			id: z.string().optional(), // TODO: This is literally not returned by the api, anywhere
			/** The coordinates of this hero challenge. */
			coord: z.array(z.number())
		})
	),
	/** A list of areas within the map. */
	sectors: z.record(
		z.string(),
		z.object({
			/** The area id. */
			id: z.number(),
			/** The name of the area. */
			name: z.string().optional(), // TODO: Same as POIs, a lot does not have a name?
			/** The level of the area. */
			level: z.number(),
			/** The coordinates of this area (this is usually the center position). */
			coord: z.array(z.number()),
			/** A list of coordinates marking the boundary of the area. */
			bounds: z.array(z.array(z.number())),
			/** The area chat link. */
			chat_link: z.string()
		})
	),
	/** A list of adventures within the map. */
	adventures: z.array(
		z.object({
			/** The adventure guid (token length 8-4-4-4-12 with a dash between each group of digits). */
			id: z.string(),
			/** The coordinates of the start of the adventure. */
			coord: z.array(z.number()),
			/** The name of the adventure. */
			name: z.string(),
			/** The description of the adventure. */
			description: z.string()
		})
	),
	/** A list of mastery insights within the map. */
	mastery_points: z.array(
		z.object({
			/** The mastery insight id. */
			id: z.number(),
			/** The region of the mastery insight, which determines its color. */
			region: z.string(),
			/** The coordinates of the mastery insight. */
			coord: z.array(z.number())
		})
	)
});
export const ContinentsMapsDTO = z.array(ContinentsMaps);

/**
 * /v2/continent/:id/floors/:id/regions/:id definition
 */
const ContinentsRegions = z.object({
	/** Id of the region. */
	id: z.number(),
	/** Name of the region. */
	name: z.string(),
	/** The coordinates of the region label. */
	label_coord: z.array(z.number()),
	/** The dimensions of the continent, expressed as top-left (NW) and bottom-right (SE) corner coordinates. */
	continent_rect: z.array(z.array(z.number()).length(2)).length(2),
	/** A mapping from the map id to an object. */
	maps: z.record(z.string(), ContinentsMaps)
});
export const ContinentsRegionsDTO = z.array(ContinentsRegions);

/**
 * /v2/continents/:id/floors/:id definition.
 */
const ContinentsFloors = z.object({
	/** Floor id. */
	id: z.number(),
	/** Dimensions of the region texture. */
	texture_dims: z.array(z.number()),
	/**
	 * If present, represents a rectangle of textures.
	 * Each tile coordinate outside this rectangle is not available on the server.
	 */
	clamped_view: z.array(z.array(z.number()).length(2)).length(2).optional(), // TODO: Another instance of data missing
	/** Mapping from the region id to an object. */
	regions: z.record(z.string(), ContinentsRegions)
});
export const ContinentsFloorsDTO = z.array(ContinentsFloors);

/**
 * /v2/continents/:id definition.
 */
const Continents = z.object({
	/** Continent id. */
	id: z.number(),
	/** Continent name. */
	name: z.string(),
	/** Width and height dimensions of the continent. */
	continents_dims: z.array(z.number()).length(2).optional(),
	/** Minimal zoom level for use with this map tile. */
	min_zoom: z.number(),
	/** Maximum zoom level for use with this map tile. */
	max_zoom: z.number(),
	/** List of floor ids available for this continent. */
	floors: z.array(z.number())
});
export const ContinentsDTO = z.array(Continents);
