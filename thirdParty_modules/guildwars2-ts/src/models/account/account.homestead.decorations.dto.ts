import { z } from 'zod';

export const AccountHomesteadDecorationsDTO = z.array(
	z.object({
		/** Deocration id. */
		id: z.number(),
		/** Decoration count. */
		count: z.number()
	})
);
