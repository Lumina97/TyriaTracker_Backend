import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { QuaggansDTO } from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/quaggans Api
 */
export class QuaggansApi extends ApiBase {
	/**
	 * Returns quaggan images.
	 */
	async get(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns quaggan images.
	 *
	 * @param ids - List of quaggan ids, or "all"
	 */
	async get(ids: string[] | 'all'): Promise<z.infer<typeof QuaggansDTO>>;
	async get(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof QuaggansDTO>(endpoints.quaggans.byId, { ids }, QuaggansDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.quaggans.all, {}, stringArrayType);
	}
}
