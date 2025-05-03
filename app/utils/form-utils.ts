import type { ZodIssue } from 'zod';
import type { TFormFieldErrors, TValidateFormData } from '~/global-types.ts';

import { camelToKebabCase } from './string-utils.ts';

export const buildFormFieldErrors = (errors: ZodIssue[]): TValidateFormData => {
	const fieldErrors: TFormFieldErrors = {};

	for (const error of errors) {
		const name = String(error.path[0]);
		const errorObj = {
			name,
			id: camelToKebabCase(name),
			message: error.message,
		};

		fieldErrors[name] = errorObj;
	}

	return {
		fieldErrors,
		status: 400,
	};
};

type FormDataObject = {
	[key: string]: undefined | string | string[];
};

export const convertFormDataToObject = (formData: FormData): FormDataObject => {
	const obj: FormDataObject = {};
	formData.forEach((value, key) => {
		if (typeof value !== 'string') return;

		const existingValue = obj[key];

		if (existingValue) {
			if (Array.isArray(existingValue)) {
				existingValue.push(value);
			} else {
				obj[key] = [existingValue, value];
			}
		} else {
			obj[key] = value;
		}
	});
	return obj;
};
