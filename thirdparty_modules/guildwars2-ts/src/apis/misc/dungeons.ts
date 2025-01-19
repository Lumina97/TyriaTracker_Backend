import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { DungeonsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/dungeons Api
 */
export class DungeonsApi extends ApiBase {
	/**
	 * Returns details about each dungeon, and it's associated paths.
	 */
	async get(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns details about each dungeon, and it's associated paths.
	 *
	 * @param ids - List of dungeon ids, or "all"
	 */
	async get(ids: string[] | 'all'): Promise<z.infer<typeof DungeonsDTO>>;
	async get(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof DungeonsDTO>(endpoints.dungeons.byId, { ids }, DungeonsDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.dungeons.all, {}, stringArrayType);
	}
}
