import { z } from 'zod';

/**
 * /v2/account/pvp/heroes definition
 * Can be resolved against /v2/pvp/heroes
 */
export const AccountPvpHeroesDTO = z.array(
	/** Id of the hero.*/
	z.number()
);
