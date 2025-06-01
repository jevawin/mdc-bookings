import { z } from 'zod';

export const resetPasswordFormSchema = z.object({
	email: z.string().email({ message: 'Enter a valid email address' }),
});
