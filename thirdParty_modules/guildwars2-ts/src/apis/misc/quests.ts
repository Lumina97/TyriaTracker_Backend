import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { QuestsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/quests Api
 */
export class QuestsApi extends ApiBase {
	/**
	 * Returns information about Story Journal missions within the personal story and Living World.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about Story Journal missions within the personal story and Living World.
	 *
	 * @param ids - List of quest ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof QuestsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof QuestsDTO>(endpoints.quests.byId, { ids }, QuestsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.quests.all, {}, numberArrayType);
	}
}
