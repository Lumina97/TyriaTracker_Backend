/**
 * Api error thrown when a request is timed out.
 */
export class ApiTimeoutError extends Error {
	constructor() {
		super('The Api request timed out');
		Object.setPrototypeOf(this, ApiTimeoutError.prototype);
	}
}
