const getPluralText = (noun: string, count: number): string => {
	if (count === 1) return noun;

	if (noun.endsWith('y')) return `${noun.slice(0, -1)}ies`;

	return `${noun}s`;
};

export const pluraliseText = (
	count: number,
	noun: string,
	withoutCount = false
): string => {
	const pluralText = getPluralText(noun, count);

	return withoutCount ? pluralText : `${count} ${pluralText}`;
};
