import type { Env } from '~/global-types.ts';

import { userSchema } from '~/schemas/registration-form-schema.ts';

type TCreateNewUserBody = {
	email: string;
	password: string;
};

type TCreateNewUser = {
	success: boolean;
	userId?: string;
};

export const createNewUser = async (
	body: TCreateNewUserBody,
	env: Env,
): Promise<TCreateNewUser> => {
	try {
		const url = `${env.SUPABASE_URL}/auth/v1/signup`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'apikey': `${env.SUPABASE_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			console.error('Supabase error:', await response.text());

			return {
				success: false,
			};
		}

		const data = await response.json();
		const parsedData = userSchema.safeParse(data);

		return { success: true, userId: parsedData.data?.id };
	} catch (error) {
		console.error('Error sending user to Supabase (raw fetch):', error);

		return {
			success: false,
		};
	}
};
