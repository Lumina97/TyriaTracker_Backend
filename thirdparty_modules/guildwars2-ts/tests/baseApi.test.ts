import { describe, expect, it } from '@jest/globals';
import { ApiLanguage, type ApiParams, GW2Api } from '../src';
import type { Endpoint } from '../src/apis/endpoints';
import { ApiBase } from '../src/base/apiBase';
import { ApiTokenError } from '../src/base/errors';

/**
 * Core Api object functionality tests
 */
describe('Core Api functionality', () => {
	describe('Request parameters', () => {
		it('Should check for token presence, if required', async () => {
			const testEndpoint: Endpoint = {
				path: 'v2/test',
				tokenRequired: true
			};
			const api: ApiBase = new ApiBase();
			try {
				// biome-ignore lint/suspicious/noExplicitAny: <Type abuse is needed here to create an instance>
				await (api as any).buildRequest(testEndpoint);
			} catch (e: unknown) {
				expect(e).toBeInstanceOf(ApiTokenError);
			}
		});

		it('Should correctly set the Api token', async () => {
			const testToken = '';
			const api: ApiBase = new ApiBase({ token: testToken });
			// biome-ignore lint/suspicious/noExplicitAny: <Type abuse is needed here to create an instance>
			expect((api as any)._apiToken).toEqual(testToken);
		});

		it('Should correctly set the Api language', async () => {
			const api: ApiBase = new ApiBase({ language: ApiLanguage.German });
			// biome-ignore lint/suspicious/noExplicitAny: <Type abuse is needed here to create an instance>
			expect((api as any)._language).toEqual(ApiLanguage.German);
		});

		it('Should correctly return Api parameters', async () => {
			const params: ApiParams = {
				token: 'token',
				language: ApiLanguage.German,
				rateLimitRetry: true
			};
			const api: GW2Api = new GW2Api(params);
			// biome-ignore lint/suspicious/noExplicitAny: <Type abuse is needed here to create an instance>
			expect((api as any).getParams()).toEqual(params);
		});
	});
});
