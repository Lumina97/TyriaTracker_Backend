import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { MountsSkinsDTO, MountsTypesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType, stringArrayType } from '../v2apiUtils';

/**
 * /v2/mounts Api
 */
export class MountsApi extends ApiBase {
	/**
	 * Returns information about mount skins that are available in-game.
	 */
	async getSkins(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about mount skins that are available in-game.
	 *
	 * @param ids - List of mount skin ids, or "all"
	 */
	async getSkins(ids: number[] | 'all'): Promise<z.infer<typeof MountsSkinsDTO>>;
	async getSkins(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof MountsSkinsDTO>(endpoints.mountsSkins.byId, { ids }, MountsSkinsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.mountsSkins.all, {}, numberArrayType);
	}

	/**
	 * Returns information about mount types that are available in-game.
	 */
	async getTypes(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about mount types that are available in-game.
	 *
	 * @param ids - List of mount type ids, or "all"
	 */
	async getTypes(ids: string[] | 'all'): Promise<z.infer<typeof MountsTypesDTO>>;
	async getTypes(ids?: string[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof MountsTypesDTO>(endpoints.mountsTypes.byId, { ids }, MountsTypesDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.mountsTypes.all, {}, stringArrayType);
	}
}
