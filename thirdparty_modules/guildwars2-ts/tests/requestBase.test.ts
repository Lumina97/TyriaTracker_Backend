import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { enqueueRequest } from '../src/base/requestBase';

describe('Request base functionality', () => {
	const request = jest.fn();
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// biome-ignore lint/suspicious/noImportAssign: <explanation>
	beforeEach(async () => ((enqueueRequest as any) = request));

	describe('Request queue functionality', () => {
		beforeEach(async () => request.mockClear());

		it('Should be able to make a request', async () => {
			request.mockImplementation(async () => true);
			expect(await enqueueRequest({})).toEqual(true);
		});

		it('Should be able to make several requests in order', async () => {
			request
				.mockImplementationOnce(async () => true)
				.mockImplementationOnce(async () => false)
				.mockImplementationOnce(async () => true);
			const first = await enqueueRequest({});
			const second = await enqueueRequest({});
			const third = await enqueueRequest({});
			expect(first).toEqual(true);
			expect(second).toEqual(false);
			expect(third).toEqual(true);
		});

		it('Should be able to make requests concurrently', async () => {
			request.mockImplementationOnce(async () => true).mockImplementationOnce(async () => false);
			const response = await Promise.all([enqueueRequest({}), enqueueRequest({})]);
			expect(response).toEqual([true, false]);
		});
	});
});
