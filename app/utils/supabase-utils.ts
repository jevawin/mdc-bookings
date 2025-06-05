import type { TSupabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';

import { supabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';

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
			console.error('parseSupabaseError:', parsed.error);

			return { success: false, error: parsed.data };
		}

		return {
			success: false,
			error: {
				code: 'unknown_error',
				msg: 'An unexpected error occurred.',
			},
		};
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
};
