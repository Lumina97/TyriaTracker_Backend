/**
 * Available language options
 */
export enum ApiLanguage {
	English = 'en',
	French = 'fr',
	German = 'de',
	Spanish = 'es',
	Chinese = 'zh'
}

/**
 * Parameters passed into the endpoint, to make a specific request
 */
export type UrlParams = Record<string, string | number | string[] | number[]>;

/**
 * Parameters required by the Api for any call
 */
export interface ApiParams {
	token?: string;
	language?: ApiLanguage;
	rateLimitRetry?: boolean;
}
