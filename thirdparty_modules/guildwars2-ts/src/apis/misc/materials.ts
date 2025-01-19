import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { MaterialsDTO } from '../../models';
import { endpoints } from '../endpoints';
import { numberArrayType } from '../v2apiUtils';

/**
 * /v2/materials Api.
 */
export class MaterialsApi extends ApiBase {
	/**
	 * Returns information about the categories in material storage.
	 */
	async get(): Promise<z.infer<typeof numberArrayType>>;
	/**
	 * Returns information about the categories in material storage.
	 *
	 * @param ids - List of material ids, or "all"
	 */
	async get(ids: number[] | 'all'): Promise<z.infer<typeof MaterialsDTO>>;
	async get(ids?: number[] | 'all') {
		if (ids) return await this.buildRequest<typeof MaterialsDTO>(endpoints.materials.byId, { ids }, MaterialsDTO);
		return await this.buildRequest<typeof numberArrayType>(endpoints.materials.all, {}, numberArrayType);
	}
}
