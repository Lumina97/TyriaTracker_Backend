import { ApiBase } from '../../base/apiBase';
import { EmblemDTO } from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/emblem Api
 */
export class EmblemApi extends ApiBase {
	/**
	 * Returns image resources that are needed to render the guild emblems.
	 *
	 * @param type - Background or foreground
	 * @param ids - List of emblem ids, or "all"
	 */
	async get(type: 'foregrounds' | 'backgrounds', ids: number[] | 'all' = 'all') {
		return await this.buildRequest<typeof EmblemDTO>(
			endpoints.emblem,
			{
				type,
				ids
			},
			EmblemDTO
		);
	}
}
