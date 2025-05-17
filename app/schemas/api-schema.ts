import { z } from 'zod';

export const applyApiSchema = z.object({
	record: z.string(),
});
