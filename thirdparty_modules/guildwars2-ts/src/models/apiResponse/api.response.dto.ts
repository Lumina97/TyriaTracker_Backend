import type { ApiRatelimitsDTO } from './api.rateLimits.dto';

/**
 * Generic Api response type
 */
export class ApiResponseDTO<T> {
	/**
	 * Api response object
	 */
	readonly data: T;

	/**
	 * Api request ratelimits
	 */
	readonly rateLimits?: ApiRatelimitsDTO;
}
