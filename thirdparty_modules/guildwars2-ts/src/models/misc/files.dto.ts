import { z } from 'zod';

/**
 * /v2/files definition
 */
export const FilesDTO = z.array(
	z.object({
		/** The file identifier. */
		id: z.string(),
		/** The URL to the image. */
		icon: z.string()
	})
);
