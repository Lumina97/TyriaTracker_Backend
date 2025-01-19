/**
 * Api token error. Thrown when the token is missing or incorrect
 */
export class ApiTokenError extends Error {
	constructor() {
		super('Api token was required, but was either missing or incorrect');
		Object.setPrototypeOf(this, ApiTokenError.prototype);
	}
}
