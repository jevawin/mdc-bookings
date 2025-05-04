export type Env = {
	AIRTABLE_API_KEY: string;
	SUPABASE_API_KEY: string;
	SUPABASE_URL: string;
	VALUE_FROM_CLOUDFLARE: string;
};

export type TFormSubmissionError = {
	title: string;
	bodyText: string;
};

export type TFormError = {
	status: number;
	error?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
};

export type TFieldError = {
	name: string;
	id: string;
	message: string;
};

export type TFormFieldErrors = Record<string, TFieldError>;

export type TValidateFormData = {
	error?: TFormSubmissionError;
	fieldErrors?: TFormFieldErrors;
	status: number;
};
