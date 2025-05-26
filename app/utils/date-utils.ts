export const addDurationToDateTime = (startTime: Date, durarion: string) => {
	// Parse duration like "2h30m"
	const match = durarion.match(/(?:(\d+)h)?(?:(\d+)m)?/);

	if (!match) return null;

	const hours = parseInt(match[1] ?? 0, 10);
	const minutes = parseInt(match[2] ?? 0, 10);

	// Parse base date in UTC
	const date = new Date(startTime);

	date.setUTCHours(date.getUTCHours() + hours);
	date.setUTCMinutes(date.getUTCMinutes() + minutes);

	// Format the final date as "YYYY-MM-DD HH:mm:ss +0000"
	const pad = (n: number) => String(n).padStart(2, '0');

	const year = date.getUTCFullYear();
	const month = pad(date.getUTCMonth() + 1);
	const day = pad(date.getUTCDate());

	const hour = pad(date.getUTCHours());
	const minute = pad(date.getUTCMinutes());
	const second = pad(date.getUTCSeconds());

	return `${year}-${month}-${day} ${hour}:${minute}:${second} +0000`;
};
