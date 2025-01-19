import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { SkinsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/skins Api
 */
export class SkinsApi extends ApiBase {
	/**
	 * Returns information about skins that were discovered by players in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about skins that were discovered by players in the game.
	 *
	 * @param ids - List of skin ids
	 */
	async get(ids: number[]): Promise<z.infer<typeof SkinsDTO>>;
	async get(ids?: number[]) {
		if (ids) return await this.buildRequest<typeof SkinsDTO>(endpoints.skins.byId, { ids }, SkinsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.skins.all, {}, numberArrayType);
	}
}
