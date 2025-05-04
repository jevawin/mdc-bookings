import { z } from 'zod';

export type TSupabaseUserSchema = z.infer<typeof supabaseUserSchema>;

export const supabaseUserSchema = z.object({
	id: z.string().uuid(),
	aud: z.string(),
	role: z.string(),
	email: z.string().email(),
	email_confirmed_at: z.string().datetime().nullish(),
	phone: z.string(),
	confirmation_sent_at: z.string().datetime(),
	confirmed_at: z.string().datetime().nullish(),
	last_sign_in_at: z.string().nullish(),
	app_metadata: z.object({
		provider: z.string(),
		providers: z.array(z.string()),
	}),
	user_metadata: z.object({
		email: z.string().email(),
		email_verified: z.boolean(),
		phone_verified: z.boolean(),
		sub: z.string().uuid(),
	}),
	identities: z.array(z.record(z.unknown())),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
	is_anonymous: z.boolean(),
});

export type TSupabaseSessionSchema = z.infer<typeof supabaseSessionSchema>;

export const supabaseSessionSchema = z.object({
	access_token: z.string(),
	token_type: z.literal('bearer'),
	expires_in: z.number(),
	expires_at: z.number(),
	refresh_token: z.string(),
	user: supabaseUserSchema,
});

export type TSupabaseDataSchema = z.infer<typeof supabaseDataSchema>;

export const supabaseDataSchema = z.object({
	user: supabaseUserSchema,
	session: supabaseSessionSchema,
});

export type TSupabaseRootSchema = z.infer<typeof supabaseRootSchema>;

export const supabaseRootSchema = z.object({
	data: supabaseDataSchema,
	error: z.string().nullish(),
});

export type TSupabaseVerifySuccessSchema = z.infer<
	typeof supabaseVerifySuccessSchema
>;

export const supabaseVerifySuccessSchema = z.object({
	access_token: z.string(),
	token_type: z.literal('bearer'),
	expires_in: z.number(),
	expires_at: z.number(),
	refresh_token: z.string(),
	user: supabaseUserSchema,
});
