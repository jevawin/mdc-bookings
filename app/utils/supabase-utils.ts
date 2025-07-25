import type { TSupabaseErrorSchema } from '~/.server/schemas/supabase-error-schema.ts';

import { supabaseErrorSchema } from '~/.server/schemas/supabase-error-schema.ts';

type TGenericError = {
	code: string;
	msg: string;
};

type TSupabaseErrorResponse = {
	success: false;
	error: TSupabaseErrorSchema | TGenericError;
};

export const parseSupabaseError = (data: unknown): TSupabaseErrorResponse => {
	try {
		const parsed = supabaseErrorSchema.safeParse(data);

		if (parsed.success) {
			return { success: false, error: parsed.data };
		}
	} catch (error) {
		console.error('Failed to parse Supabase error response:', error);

		return {
			success: false,
			error: {
				code: 'unknown_error',
				msg: 'An unexpected error occurred.',
			},
		};
	}

	return {
		success: false,
		error: {
			code: 'unknown_error',
			msg: 'An unexpected error occurred.',
		},
	};
};
