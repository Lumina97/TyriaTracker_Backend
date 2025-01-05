import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { PetsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/pets Api
 */
export class PetsApi extends ApiBase {
	/**
	 * Returns information about the Ranger pets that are in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the Ranger pets that are in the game.
	 *
	 * @param ids - List of pet ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof PetsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof PetsDTO>(endpoints.pets.byId, { ids }, PetsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.pets.all, {}, numberArrayType);
	}
}
