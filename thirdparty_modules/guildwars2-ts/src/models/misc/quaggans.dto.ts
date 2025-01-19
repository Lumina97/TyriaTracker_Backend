import { z } from 'zod';

/**
 * /v2/quaggans definition
 */
export const QuaggansDTO = z.array(
	z.object({
		/** The quaggan identifier. */
		id: z.string(),
		/** The URL to the quaggan image. */
		url: z.string()
	})
);
