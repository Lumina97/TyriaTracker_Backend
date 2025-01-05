import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { TitlesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

export class TitlesApi extends ApiBase {
	/**
	 * Returns information about the titles that are in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the titles that are in the game.
	 *
	 * @param ids - List of title ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof TitlesDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof TitlesDTO>(endpoints.titles.byId, { ids }, TitlesDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.titles.all, {}, numberArrayType);
	}
}
