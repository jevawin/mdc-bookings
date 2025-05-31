import { z } from 'zod';

export const passwordResetFormSchema = z.object({
	email: z.string().email({ message: 'Enter a valid email address' }),
});
