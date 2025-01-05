import { AxiosError, AxiosHeaders, type AxiosResponse, type RawAxiosRequestConfig } from 'axios';
import type { z } from 'zod';
import type { Endpoint } from '../apis/endpoints';
import { ApiLanguage, type ApiParams, type UrlParams } from './apiParams';
import {
	ApiGenericError,
	ApiNotFoundError,
	ApiPermissionsError,
	ApiRetryFailedError,
	ApiTimeoutError,
	ApiTokenError
} from './errors';
import { logger } from './logger';
import { enqueueRequest } from './requestBase';

/**
 * Base Api object. Implements anything needed for the requests to all endpoints
 */
export class ApiBase {
	private readonly _baseUrl: string = 'https://api.guildwars2.com';
	private readonly _apiToken?: string;
	private readonly _language: ApiLanguage;
	private readonly _rateLimitRetry: boolean;
	private readonly _rateLimitRetryAttempts: number;
	private readonly _logOutput: boolean;

	constructor(apiParams?: ApiParams) {
		// Set core Api parameters
		this._apiToken = apiParams?.token;
		this._language = apiParams?.language ?? ApiLanguage.English;
		this._rateLimitRetry = apiParams?.rateLimitRetry ?? true;
		this._logOutput = apiParams?.logOutput ?? true;
	}

	/**
	 * Parameters for the api response, at top level
	 */
	protected getParams(): ApiParams {
		return {
			token: this._apiToken,
			language: this._language,
			rateLimitRetry: this._rateLimitRetry,
			logOutput: this._logOutput
		};
	}

	/**
	 * Generic request builder. Adds a finalized request to the concurrency queue
	 *
	 * @param endpoint - API Endpoint
	 * @param apiParams - Query string
	 * @param responseType - Type of the response
	 * @param attempts - Previously failed retry count
	 */
	protected async buildRequest<T extends z.ZodType>(
		endpoint: Endpoint,
		apiParams: UrlParams,
		responseType: T,
		attempts?: number
	): Promise<z.infer<T>> {
		// Check authentication. Most endpoints will not work without it
		const { tokenRequired } = endpoint;

		// Build params for the specific endpoint
		const url = this._getApiUrl(endpoint, apiParams);
		const headers = new AxiosHeaders();
		headers['Accept-Language'] = this._language;
		if (tokenRequired) {
			if (!this._apiToken) throw new ApiTokenError();
			headers.Authorization = `Bearer ${this._apiToken}`;
		}

		const options: RawAxiosRequestConfig = {
			url,
			method: 'GET',
			headers
		};

		// Make a request based on provided data
		try {
			// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
			if (this._logOutput) logger.info(`Requesting ${options.url!}`);
			const response = await enqueueRequest<AxiosResponse<T>>(options);
			const { data } = response;

			// Validate the response
			const parse = (responseType as z.ZodType<T>).safeParse(data);
			if (!parse.success) {
				logger.warn(
					'The requested data failed to parse, when using the known schema. Data is still returned, but may be incorrectly typed. Please submit the following log to the developers:'
				);
				logger.warn(parse.error.errors);
			}
			// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
			if (this._logOutput) logger.info(`[200] Successful request to ${options.url!}`);
			return data;
		} catch (error: unknown) {
			return await this.retryRequest<T>(endpoint, options, responseType, apiParams, attempts ?? 0, error);
		}
	}

	/**
	 * Retries failed requests
	 *
	 * @param endpoint - Endpoint to which a request was originally made
	 * @param prevOptions - Axios request options
	 * @param responseType - Originally requested schema
	 * @param apiParams - Query string
	 * @param rateLimitAttempt - Current rate-limit retry counter
	 * @param prevError - Error that caused a retry
	 */
	protected async retryRequest<T extends z.ZodType>(
		endpoint: Endpoint,
		prevOptions: RawAxiosRequestConfig,
		responseType: T,
		apiParams: UrlParams,
		rateLimitAttempt: number,
		prevError?: unknown
	): Promise<T> {
		if (prevError instanceof AxiosError && prevError.response) {
			const { status } = prevError.response;
			switch (true) {
				case status === 401: {
					logger.warn(
						// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
						`[401] Failed request to ${prevOptions.url!}. Failed to authorize with the provided token.`
					);
					throw new ApiTokenError();
				}
				case status === 403: {
					// Axios doesn't know what type this can be, but the api always returns the same object
					const requiredScope: string =
						prevError.response.data.text.slice(0, 1).toUpperCase() + prevError.response.data.text.slice(1);
					// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
					logger.warn(`[403] Failed request to ${prevOptions.url!}. ${requiredScope}.`);
					throw new ApiPermissionsError(requiredScope);
				}
				case status === 404: {
					// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
					logger.warn(`[404] Failed request to ${prevOptions.url!}. No data was returned.`);
					throw new ApiNotFoundError();
				}
				case status === 429: {
					if (!this._rateLimitRetry) {
						logger.warn('[429] Rate-limit has been reached, but retries were turned off. Stopping here.');
						throw new ApiRetryFailedError();
					}
					if (rateLimitAttempt < 3) {
						logger.warn(
							// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
							`[429] Rate-limit has been reached. Request to ${prevOptions.url!} will be repeated in 30 seconds.`
						);
						await new Promise<void>(resolve => setTimeout(() => resolve(), 30000));
						return await this.buildRequest<T>(endpoint, apiParams, responseType, ++rateLimitAttempt);
					}
					// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
					logger.error(`[429] Rate-limit retries failed. Aborting request to ${prevOptions.url!}`);
					throw new ApiRetryFailedError();
				}
				case status === 504: {
					// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
					logger.warn(`[504] Request to ${prevOptions.url!} timed out.`);
					throw new ApiTimeoutError();
				}
				default:
					// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
					logger.warn(`[???] Request to ${prevOptions.url!} failed. ${(prevError as Error).message}`);
					throw new ApiGenericError();
			}
		}
		// TODO: Determine what actually happens. Probably something stupid in the request itself
		throw new ApiGenericError();
	}

	/**
	 * Builds final Api url from the endpoint and provided parameters
	 *
	 * @param endpoint - Api endpoint
	 * @param urlParams - Parameters
	 */
	private _getApiUrl(endpoint: Endpoint, urlParams: UrlParams) {
		// Build the endpoint base
		const { path } = endpoint;
		const regex = /\$\(([^)]+)?\)/g;
		let fullUrl = `${this._baseUrl}/${path}`;

		// Build any arguments needed for the endpoint
		// biome-ignore lint/suspicious/noImplicitAnyLet: <building the loop otherwise is annoying. Will fix later>
		let match;
		// biome-ignore lint/suspicious/noAssignInExpressions: <less code this way>
		while ((match = regex.exec(fullUrl))) {
			const [key, param] = match;
			if (!param) continue;
			const value = encodeURI(String(urlParams[param]));
			fullUrl = fullUrl.replace(key, value);
			regex.lastIndex = 0;
		}
		return fullUrl;
	}
}
