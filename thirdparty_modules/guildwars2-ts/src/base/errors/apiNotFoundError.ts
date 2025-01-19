/**
 * Api error thrown when a request fails to obtain any data.
 */
export class ApiNotFoundError extends Error {
	constructor() {
		super('The Api did not return any data with the provided arguments');
		Object.setPrototypeOf(this, ApiNotFoundError.prototype);
	}
}
