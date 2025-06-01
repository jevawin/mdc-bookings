import { z } from 'zod';

export const newPasswordFormSchema = z.object({
	password: z.string().min(8, { message: 'Enter a strong password' }),
});
