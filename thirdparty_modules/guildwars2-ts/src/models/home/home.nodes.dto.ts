import { z } from 'zod';

/**
 * /v2/home/nodes definition
 */
export const HomeNodesDTO = z.array(
	z.object({
		/** Id of the node. */
		id: z.string()
	})
);
