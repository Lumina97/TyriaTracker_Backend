/**
 * Api error thrown when an unhandled error occurs.
 */
export class ApiGenericError extends Error {
	constructor() {
		super('The Api request failed with an unknown error');
		Object.setPrototypeOf(this, ApiGenericError.prototype);
	}
}
