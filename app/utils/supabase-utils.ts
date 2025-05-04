import type { TSupabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';
import { supabaseErrorSchema } from '~/schemas/supabase-error-schema.ts';

type TFoo = {
	code: string;
	msg: string;
};

type TSupabaseErrorResponse = {
	success: false;
	error: TSupabaseErrorSchema | TFoo;
};

export const parseSupabaseError = async (
	response: Response,
): Promise<TSupabaseErrorResponse> => {
	try {
		const result = await response.json();
		const parsed = supabaseErrorSchema.safeParse(result);

		if (parsed.success) {
			return { success: false, error: parsed.data };
		}
	} catch (error) {
		console.error('Failed to parse Supabase error response:', error);
	}

	return {
		success: false,
		error: {
			code: 'unknown_error',
			msg: 'An unexpected error occurred.',
		},
	};
};
