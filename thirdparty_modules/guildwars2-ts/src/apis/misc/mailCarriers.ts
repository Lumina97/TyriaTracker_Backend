import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { MailCarriersDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/mailcarriers Api
 */
export class MailCarriersApi extends ApiBase {
	/**
	 * Returns information about the mail carriers that are in the game.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the mail carriers that are in the game.
	 *
	 * @param ids - List of mail carrier ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof MailCarriersDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof MailCarriersDTO>(
				endpoints.mailCarriers.byId,
				{ ids },
				MailCarriersDTO
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.mailCarriers.all, {}, numberArrayType);
	}
}
