import type { Env, Prettify } from '~/global-types.ts';
import type { TSupabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';
import type {
	TSupabaseSessionSchema,
	TSupabaseUserSchema,
	TSupabaseVerifySuccessSchema,
} from '~/schemas/supabase-user-schema.ts';

import { supabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';
import {
	supabaseUserSchema,
	supabaseVerifySuccessSchema,
} from '~/schemas/supabase-user-schema.ts';
import { parseSupabaseError } from '~/utils/supabase-utils';

type TSupabaseError = {
	code: string;
	msg: string;
};

type TSupabaseErrorResponse = {
	success: false;
	error?: TSupabaseErrorSchema | TSupabaseError;
};

type TSupabaseUserSuccessResponse = {
	success: true;
	data: TSupabaseUserSchema;
};

type TSupabaseVerifySuccessResponse = {
	success: true;
	data: TSupabaseVerifySuccessSchema;
};

type TCreateNewUser = Prettify<
	TSupabaseUserSuccessResponse | TSupabaseErrorResponse
>;

const getHeaders = (env: Env) => ({
	'apikey': env.SUPABASE_API_KEY,
	'Content-Type': 'application/json',
});

const parseSupabaseUserResponse = (data: unknown): TCreateNewUser => {
	const parsed = supabaseUserSchema.safeParse(data);

	if (parsed.success) {
		return { success: true, data: parsed.data };
	}

	const error = supabaseErrorSchema.safeParse(data);

	if (error.success) {
		return { success: false, error: error.data };
	}

	return { success: false };
};

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
			return parseSupabaseError(response);
		}

		const data = await response.json();
		const parsed = parseSupabaseUserResponse(data);

		if (!parsed.success && !parsed.error) {
			return {
				success: false,
				error: {
					code: 'invalid_response',
					msg: 'Received an unexpected response from Supabase.',
				},
			};
		}

		return parsed;
	} catch (error) {
		console.error('createNewUser - Unexpected error:', error);

		return {
			success: false,
			error: {
				code: 'network_error',
				msg: 'Could not connect to Supabase.',
			},
		};
	}
};

const parseSupabaseVerifyResponse = (data: unknown): TVerifySignUp => {
	const parsed = supabaseVerifySuccessSchema.safeParse(data);

	if (parsed.success) {
		console.log(parsed.success, 'parseSupabaseVerifyResponse - success');

		return { success: true, data: parsed.data };
	}

	const error = supabaseErrorSchema.safeParse(data);

	if (error.success) {
		console.log(error.success, 'parseSupabaseVerifyResponse - success');

		return { success: false, error: error.data };
	}

	return { success: false };
};

type TVerifySignUp = Prettify<
	TSupabaseVerifySuccessResponse | TSupabaseErrorResponse
>;

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
			return parseSupabaseError(response);
		}

		const data = await response.json();
		const parsed = parseSupabaseVerifyResponse(data);

		return parsed;
	} catch (error) {
		console.error('verifySignUp - Unexpected error:', error);

		return { success: false };
	}
};

type TLogInBody = {
	email: string;
	password: string;
};

type TSupabaseLogInSuccessResponse = {
	success: true;
	data: TSupabaseSessionSchema;
};

type TLogInWithEmailPassword = Prettify<
	TSupabaseLogInSuccessResponse | TSupabaseErrorResponse
>;

export const logInWithEmailPassword = async (
	body: TLogInBody,
	env: Env,
): Promise<TLogInWithEmailPassword> => {
	try {
		const { email, password } = body;
		const url = `${env.SUPABASE_URL}/auth/v1/token?grant_type=password`;
		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(env),
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const result = await response.json();

			console.log(result, 'error');

			return parseSupabaseError(result);
		}

		const result = (await response.json()) satisfies TSupabaseSessionSchema;

		return { success: true, data: result };
	} catch (error) {
		console.error('logInWithEmailPassword - Unexpected error:', error);

		return { success: false };
	}
};

export const logOut = async (
	env: Env,
	token: string,
): Promise<{ success: boolean }> => {
	try {
		const url = `${env.SUPABASE_URL}/auth/v1/logout`;
		const headers = {
			...getHeaders(env),
			Authorization: `Bearer ${token}`,
		};
		const response = await fetch(url, {
			method: 'POST',
			headers,
		});

		if (!response.ok) {
			const error = await response.json();
			console.error(error);
			return { success: false };
		}

		return { success: true };
	} catch (error) {
		console.error('logOut - Unexpected error:', error);

		return { success: false };
	}
};

type TGetUser = {
	success: boolean;
	data?: TSupabaseUserSchema;
};

export const getUser = async (env: Env, token: string): Promise<TGetUser> => {
	try {
		const url = `${env.SUPABASE_URL}/auth/v1/user`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				apikey: env.SUPABASE_API_KEY,
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			return { success: false };
		}

		const result = (await response.json()) satisfies TSupabaseUserSchema;

		return { success: true, data: result };
	} catch (error) {
		console.error('getUser - Unexpected error:', error);

		return { success: false };
	}
};
