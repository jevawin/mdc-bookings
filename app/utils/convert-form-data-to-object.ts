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
