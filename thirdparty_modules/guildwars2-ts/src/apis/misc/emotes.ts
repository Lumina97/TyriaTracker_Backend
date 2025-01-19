import type { z } from 'zod';
import { ApiBase } from '../../base/apiBase';
import { EmotesDTO } from '../../models';
import { endpoints } from '../endpoints';
import { stringArrayType } from '../v2apiUtils';

/**
 * /v2/emotes Api
 */
export class EmotesApi extends ApiBase {
	/**
	 * Returns information about unlockable emotes.
	 */
	async get(): Promise<z.infer<typeof stringArrayType>>;
	/**
	 * Returns information about unlockable emotes.
	 *
	 * @param ids - Emote names, or "all"
	 */
	async get(ids: string[] | 'all'): Promise<z.infer<typeof EmotesDTO>>;
	async get(ids?: string[] | 'all') {
		if (ids && Array.isArray(ids)) {
			// For some reason, emote names are case-sensitive, and only some of them are capitalized =_=
			ids = ids.map((id: string) => {
				if (['shiverplus', 'stretch'].includes(id.toLocaleLowerCase()))
					return id[0]?.toLocaleUpperCase() + id.substring(1);
				return id.toLocaleLowerCase();
			});
			return await this.buildRequest<typeof EmotesDTO>(endpoints.emotes.byId, { ids }, EmotesDTO);
		}
		return await this.buildRequest<typeof stringArrayType>(endpoints.emotes.all, {}, stringArrayType);
	}
}
