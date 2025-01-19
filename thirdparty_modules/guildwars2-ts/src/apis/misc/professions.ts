import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { ProfessionsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/professions Api
 */
export class ProfessionsApi extends ApiBase {
	/**
	 * Returns information about professions that are in the game.
	 */
	async get(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about professions that are in the game.
	 *
	 * @param ids - List of profession ids, or "all"
	 */
	async get(ids: string[] | 'all'): Promise<z.infer<typeof ProfessionsDTO>>;
	async get(ids?: string[] | 'all') {
		if (ids)
			return await this.buildRequest<typeof ProfessionsDTO>(endpoints.professions.byId, { ids }, ProfessionsDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.professions.all, {}, stringArrayType);
	}
}
