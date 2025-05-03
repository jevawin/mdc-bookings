import type { Env } from '~/global-types.ts';
import type { TSupabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';
import type {
	TSupabaseUserSchema,
	TSupabaseVerifySuccessSchema,
} from '~/schemas/supabase-user-schema.ts';

import { supabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';
import {
	supabaseUserSchema,
	supabaseVerifySuccessSchema,
} from '~/schemas/supabase-user-schema.ts';

type TSupabaseErrorResponse = {
	success: false;
	error?: TSupabaseErrorSchema;
};

type TSupabaseUserSuccessResponse = {
	success: true;
	data: TSupabaseUserSchema;
};

type TSupabaseVerifySuccessResponse = {
	success: true;
	data: TSupabaseVerifySuccessSchema;
};

const getHeaders = (env: Env) => ({
	'apikey': env.SUPABASE_API_KEY,
	'Content-Type': 'application/json',
});

const parseSupabaseUserResponse = (data: unknown): TCreateNewUser => {
	const parsed = supabaseUserSchema.safeParse(data);

	console.log(data, 'parseSupabaseUserResponse - data');
	console.log(parsed.error, 'parseSupabaseUserResponse - parsed');

	if (parsed.success) {
		return { success: true, data: parsed.data };
	}

	const error = supabaseErrorSchema.safeParse(data);

	if (error.success) {
		return { success: false, error: error.data };
	}

	return { success: false };
};

type TCreateNewUser = TSupabaseUserSuccessResponse | TSupabaseErrorResponse;
type TCreateNewUserBody = {
	email: string;
	password: string;
};

export const createNewUser = async (
	body: TCreateNewUserBody,
	env: Env,
): Promise<TCreateNewUser> => {
	try {
		const response = await fetch(`${env.SUPABASE_URL}/auth/v1/signup`, {
			method: 'POST',
			headers: getHeaders(env),
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			const error = await response.text();

			console.error('createNewUser - Supabase error:', error);

			return { success: false };
		}

		const data = await response.json();
		const parsed = parseSupabaseUserResponse(data);

		return parsed;
	} catch (error) {
		console.error('createNewUser - Unexpected error:', error);

		return { success: false };
	}
};

const parseSupabaseVerifyResponse = (data: unknown): TVerifySignUp => {
	console.log(data, 'parseSupabaseVerifyResponse - data');

	const parsed = supabaseVerifySuccessSchema.safeParse(data);

	console.log(parsed.success, 'parseSupabaseVerifyResponse - success');

	if (parsed.success) {
		return { success: true, data: parsed.data };
	}

	const error = supabaseErrorSchema.safeParse(data);

	console.log(error.success, 'parseSupabaseVerifyResponse - success');

	if (error.success) {
		return { success: false, error: error.data };
	}

	return { success: false };
};

type TVerifySignUp = TSupabaseVerifySuccessResponse | TSupabaseErrorResponse;

export const verifySignUp = async (
	token_hash: string,
	type: string,
	env: Env,
): Promise<TVerifySignUp> => {
	try {
		const response = await fetch(`${env.SUPABASE_URL}/auth/v1/verify`, {
			method: 'POST',
			headers: getHeaders(env),
			body: JSON.stringify({ token_hash, type }),
		});

		if (!response.ok) {
			const error = await response.text();
			console.error('verifySignUp - Supabase error:', error);
			return { success: false };
		}

		const data = await response.json();
		const parsed = parseSupabaseVerifyResponse(data);

		if (parsed.success) {
			console.log('verifySignUp - Success:', parsed.data);
		} else if (parsed.error) {
			console.error('verifySignUp - Supabase error:', parsed.error);
		} else {
			console.error('verifySignUp - Unknown response format:', data);
		}

		return parsed;
	} catch (error) {
		console.error('verifySignUp - Unexpected error:', error);

		return { success: false };
	}
};
