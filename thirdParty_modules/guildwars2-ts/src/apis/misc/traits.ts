import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { TraitsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/traits Api
 */
export class TraitsApi extends ApiBase {
	/**
	 * Returns information about specific traits which are contained within specializations.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about specific traits which are contained within specializations.
	 *
	 * @param ids - List of trait ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof TraitsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof TraitsDTO>(endpoints.traits.byId, { ids }, TraitsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.traits.all, {}, numberArrayType);
	}
}
