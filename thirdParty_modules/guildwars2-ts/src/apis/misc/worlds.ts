import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { WorldsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/worlds Api
 */
export class WorldsApi extends ApiBase {
	/**
	 * Returns information about the available worlds, or servers.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the available worlds, or servers.
	 *
	 * @param ids - List of realm ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof WorldsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof WorldsDTO>(endpoints.worlds.byId, { ids }, WorldsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.worlds.all, {}, numberArrayType);
	}
}
