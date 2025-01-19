import { z } from 'zod';

/**
 * /v2/characters/:id/heropoints definition
 *
 */
export const CharacterHeroPointsDTO = z.array(
	/** Hero point id. Can be resolved against "skill_challenges" /v2/continents. */
	z.string()
);
