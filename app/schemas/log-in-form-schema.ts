import { z } from 'zod';

export const logInFormSchema = z.object({
	email: z.string().email({ message: 'Enter a valid email address' }),
	password: z.string().min(1, { message: 'Enter a valid password' }),
});
