import type { ZodIssue } from 'zod';
import type { TFormFieldErrors, TValidateFormData } from '~/global-types.ts';

import { camelToKebabCase, pluraliseText } from './string-utils.ts';

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

	const fieldErrorsCount = Object.keys(fieldErrors ?? {}).length;
	const hasMultipleErrors = fieldErrorsCount > 1;
	const pluralCount = pluraliseText(fieldErrorsCount, 'field');
	const verb = hasMultipleErrors ? 'are' : 'is';

	return {
		error: {
			title: 'There is a problem',
			bodyText: `Failed to submit because ${pluralCount} ${verb} invalid:`,
		},
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
