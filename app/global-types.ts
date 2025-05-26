import type { TIconName } from './components/01-atoms/icon/icon.tsx';

export type Env = {
	AIRTABLE_API_KEY: string;
	AIRTABLE_URL: string;
	AIRTABLE_BASE_ID: string;
	SUPABASE_API_KEY: string;
	SUPABASE_URL: string;
	VALUE_FROM_CLOUDFLARE: string;
};

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

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

export type TAddToCalendarItem = {
	name: string;
	icon: TIconName;
	url: string;
};

export type TJob = {
	id: string;
	record: string;
	service: string;
	specialism: string;
	dateTimeStart: Date;
	dateTimeEnd: string | null;
	displayDate: string;
	displayTime: string;
	location: string;
	description: string;
	isPast: boolean;
	calendarItems: TAddToCalendarItem[];
};
