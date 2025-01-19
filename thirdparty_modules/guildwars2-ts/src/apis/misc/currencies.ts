import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { CurrenciesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/currencies Api
 */
export class CurrenciesApi extends ApiBase {
	/**
	 * Returns a list of the currencies contained in the account wallet.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns a list of the currencies contained in the account wallet.
	 *
	 * @param ids - Currency ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof CurrenciesDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof CurrenciesDTO>(endpoints.currencies.byId, { ids }, CurrenciesDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.currencies.all, {}, numberArrayType);
	}
}
