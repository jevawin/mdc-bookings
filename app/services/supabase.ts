import type { Env, Prettify } from '~/global-types.ts';
import type { TSupabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';
import type {
	TSupabaseSessionSchema,
	TSupabaseUpdateUserSchema,
	TSupabaseUserSchema,
	TSupabaseVerifySuccessSchema,
} from '~/schemas/supabase-user-schema.ts';

import { supabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';
import {
	supabaseUserSchema,
	supabaseVerifySuccessSchema,
} from '~/schemas/supabase-user-schema.ts';
import { parseSupabaseError } from '~/utils/supabase-utils.ts';

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

type TGetHeaders = {
	'apikey': string;
	'Content-Type': string;
};

const getHeaders = (env: Env): TGetHeaders => ({
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

const parseSupabaseVerifyResponse = (data: unknown): TVerifyAuth => {
	const parsed = supabaseVerifySuccessSchema.safeParse(data);

	if (parsed.success) {
		console.log(parsed.success, 'parseSupabaseVerifyResponse - success');

		return { success: true, data: parsed.data };
	}

	if (parsed.error) {
		console.error(parsed.error, 'parseSupabaseVerifyResponse - error');

		return {
			success: false,
			error: {
				code: '123',
				msg: 'parseSupabaseVerifyResponse - failed to parse success chema',
			},
		};
	}

	const error = supabaseErrorSchema.safeParse(data);

	if (error.success) {
		console.log(error.success, 'parseSupabaseVerifyResponse - success');

		return { success: false, error: error.data };
	}

	return {
		success: false,
		error: {
			code: '123',
			msg: 'parseSupabaseVerifyResponse - failed to parse error schema',
		},
	};
};

type TVerifyAuth = Prettify<
	TSupabaseVerifySuccessResponse | TSupabaseErrorResponse
>;

export const verifyAuth = async (
	token_hash: string,
	type: 'email' | 'recovery',
	env: Env,
): Promise<TVerifyAuth> => {
	try {
		const response = await fetch(`${env.SUPABASE_URL}/auth/v1/verify`, {
			method: 'POST',
			headers: getHeaders(env),
			body: JSON.stringify({ token_hash, type }),
		});

		if (!response.ok) {
			const data = await response.json();
			const error = parseSupabaseError(data);

			return error;
		}

		const data = await response.json();
		const parsed = parseSupabaseVerifyResponse(data);

		return parsed;
	} catch (error) {
		console.error('verifyAuth - Unexpected error:', error);

		return {
			success: false,
			error: {
				code: '123',
				msg: 'catch error',
			},
		};
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
			const error = await response.json();

			console.error('logInWithEmailPassword - Supabase error:', error);

			return parseSupabaseError(error);
		}

		const data = (await response.json()) satisfies TSupabaseSessionSchema;

		return { success: true, data };
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
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				...getHeaders(env),
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const error = await response.json();

			console.error('logOut - Supabase error:', error);

			return { success: false };
		}

		return { success: true };
	} catch (error) {
		console.error('logOut - Unexpected error:', error);

		return { success: false };
	}
};

export type TGetUser = {
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
			const error = await response.json();

			console.error('getUser - Supabase error:', error);

			return { success: false };
		}

		const data = (await response.json()) satisfies TSupabaseUserSchema;

		return { success: true, data };
	} catch (error) {
		console.error('getUser - Unexpected error:', error);

		return { success: false };
	}
};

type TUpdateUserBody = {
	email?: string;
	password?: string;
};

type TUpdateUser = {
	success: boolean;
	data?: TSupabaseUpdateUserSchema;
};

export const updateUser = async (
	env: Env,
	token: string,
	body: TUpdateUserBody,
): Promise<TUpdateUser> => {
	try {
		const url = `${env.SUPABASE_URL}/auth/v1/user`;

		console.log(body, 'body');

		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				...getHeaders(env),
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			const error = await response.json();

			console.error('updateUser - Supabase error:', error);

			return { success: false };
		}

		const data =
			(await response.json()) satisfies TSupabaseUpdateUserSchema;

		return { success: true, data };
	} catch (error) {
		console.error('updateUser - Unexpected error:', error);

		return { success: false };
	}
};

type TForgottenPassword = {
	success: boolean;
};

export const forgottenPassword = async (
	env: Env,
	email: string,
): Promise<TForgottenPassword> => {
	try {
		const url = `${env.SUPABASE_URL}/auth/v1/recover`;

		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(env),
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			const error = await response.json();

			console.error('forgottenPassword - Supabase error:', error);

			return { success: false };
		}

		return { success: true };
	} catch (error) {
		console.error('forgottenPassword - Unexpected error:', error);

		return { success: false };
	}
};
