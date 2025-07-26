import { z } from 'zod';

export const resetPasswordFormSchema = z.object({
	email: z.email({ message: 'Enter a valid email address' }),
});
