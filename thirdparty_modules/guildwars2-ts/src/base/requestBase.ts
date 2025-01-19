import axios, { type AxiosRequestConfig } from 'axios';
import Queue from 'promise-queue';
import type { ApiResponseDTO } from '../models';

/**
 * Global request queue
 */
export const queue: Queue = new Queue(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

/**
 * Adds a promise request to the global queue
 *
 * @param options - Axios request options
 */
async function sendRequest<T>(options: AxiosRequestConfig): Promise<ApiResponseDTO<T>> {
	return await new Promise((resolve, reject) => {
		axios
			// biome-ignore lint/style/noNonNullAssertion: <This will always be present>
			.get(options.url!, { ...options })
			.then(resolve)
			.catch(reject);
	});
}

/**
 * Enqueue incoming Axios request
 *
 * @param options - Axios request options
 */
export async function enqueueRequest<T>(options: AxiosRequestConfig): Promise<T> {
	return await queue.add(async () => (await sendRequest(options)) as T);
}
