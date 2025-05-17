import type { ActionFunctionArgs } from 'react-router';
import { applyApiSchema } from '~/schemas/api-schema';

export const action = async ({ request }: ActionFunctionArgs): Promise<any> => {
	const data = await request.json();
	const parsed = applyApiSchema.safeParse(data);

	return new Response(
		JSON.stringify({
			success: parsed.success,
			record: parsed.data?.record,
		}),
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		},
	);
};
