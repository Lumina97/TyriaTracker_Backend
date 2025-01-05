import { ApiBase } from '../../base/apiBase';
import { TokenInfoDTO } from '../../models';
import { endpoints } from '../endpoints';

/**
 * /v2/tokeninfo Api
 */
export class TokenInfoApi extends ApiBase {
	/**
	 * Returns information about the supplied API key.
	 */
	async get() {
		return await this.buildRequest<typeof TokenInfoDTO>(endpoints.tokenInfo, {}, TokenInfoDTO);
	}
}
