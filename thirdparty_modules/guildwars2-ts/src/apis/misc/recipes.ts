import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { RecipesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/recipes Api
 */
export class RecipesApi extends ApiBase {
	/**
	 * Returns information about recipes that were discovered by players in the game.
	 * NOTE: The Api sometimes returns incorrect item ids in "output_id" fields
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about recipes that were discovered by players in the game.
	 * NOTE: The Api sometimes returns incorrect item ids in "output_id" fields
	 *
	 * @param ids - List of recipe ids, or "all"
	 */
	async get(ids: number[]): Promise<z.infer<typeof RecipesDTO>>;
	async get(ids?: number[]) {
		if (ids) return await this.buildRequest<typeof RecipesDTO>(endpoints.recipes.byId, { ids }, RecipesDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.recipes.all, {}, numberArrayType);
	}

	/**
	 * Allows searching for recipe.
	 *
	 * @param type - Either "input" or "output"
	 * @param ids - List of item ids
	 */
	async search(type: 'input' | 'output', ids: number[]) {
		return await this.buildRequest<typeof numberArrayType>(
			endpoints.recipes.search,
			{ type, ids },
			numberArrayType
		);
	}
}
