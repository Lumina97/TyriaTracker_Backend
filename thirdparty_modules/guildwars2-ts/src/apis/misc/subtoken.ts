import { ApiBase } from '../../base/apiBase';
import { logger } from '../../base/logger';
import { SubtokenDTO } from '../../models';
import { endpoints } from '../endpoints';
import type { ApiPermissions, EndpointUrls } from '../v2apiUtils';

/**
 * /v2/createsubtoken Api
 */
export class SubtokenApi extends ApiBase {
	/**
	 * Creates a subtoken, or an Api key with limited permissions.
	 *
	 * @param expire - Expiration date. Either valid date format, or ISO-8601
	 * @param permissions - Api token permissions
	 * @param urls - Specific /v2/ api urls to allow access to
	 */
	async get(expire: string, permissions: ApiPermissions[], urls?: EndpointUrls[]) {
		try {
			expire = new Date(expire).toISOString();
		} catch (e: unknown) {
			if (e instanceof RangeError) {
				logger.error('Date must be of valid, or of ISO-8601 format.');
				throw new RangeError();
			}
		}

		if (urls) {
			return await this.buildRequest<typeof SubtokenDTO>(
				endpoints.createSubtoken.url,
				{
					expire,
					permissions,
					urls
				},
				SubtokenDTO
			);
		}
		return await this.buildRequest<typeof SubtokenDTO>(
			endpoints.createSubtoken.noUrl,
			{
				expire,
				permissions
			},
			SubtokenDTO
		);
	}
}
