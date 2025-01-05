import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { ColorsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/colors Api
 */
export class ColorsApi extends ApiBase {
	/**
	 * Returns all dye colors in the game, including localized names and their color component information.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns all dye colors in the game, including localized names and their color component information.
	 *
	 * @param ids - Ids of the requested colors, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof ColorsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof ColorsDTO>(endpoints.colors.byId, { ids }, ColorsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.colors.all, {}, numberArrayType);
	}
}
