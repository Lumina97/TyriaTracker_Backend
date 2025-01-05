/**
 * Api error thrown when a request retry fails, or is canceled
 */
export class ApiRetryFailedError extends Error {
	constructor() {
		super('The Api failed to return data after several attempts');
		Object.setPrototypeOf(this, ApiRetryFailedError.prototype);
	}
}
