/**
 * Token permission error. Thrown when the token is correct,
 * but does not have permissions required for the request.
 */
export class ApiPermissionsError extends Error {
	constructor(scope: string) {
		super(`The Api token does not have sufficient permissions for this request. ${scope}`);
		Object.setPrototypeOf(this, ApiPermissionsError.prototype);
	}
}
