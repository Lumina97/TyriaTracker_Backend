import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { SpecializationsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/specializations Api
 */
export class SpecializationsApi extends ApiBase {
	/**
	 * Returns information on currently released specializations.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information on currently released specializations.
	 *
	 * @param ids - List of specialization ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof SpecializationsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof SpecializationsDTO>(
				endpoints.specializations.byId,
				{ ids },
				SpecializationsDTO
			);
		return await this.buildRequest<typeof numberArrayType>(endpoints.specializations.all, {}, numberArrayType);
	}
}
