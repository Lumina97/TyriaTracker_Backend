import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { FilesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/files Api
 */
export class FilesApi extends ApiBase {
	/**
	 * Returns commonly requested in-game assets that may be used to enhance API-derived applications.
	 */
	async get(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns commonly requested in-game assets that may be used to enhance API-derived applications.
	 *
	 * @param ids - List of file ids, or "all"
	 */
	async get(ids: string[] | 'all'): Promise<z.infer<typeof FilesDTO>>;
	async get(ids?: string[] | 'all') {
		if (ids) return await this.buildRequest<typeof FilesDTO>(endpoints.files.byId, { ids }, FilesDTO);
		return await this.buildRequest<typeof stringArrayType>(endpoints.files.all, {}, stringArrayType);
	}
}
