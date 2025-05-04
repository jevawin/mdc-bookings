import { JobsPage } from '~/components/05-templates/jobs-page/jobs-page';
import type { Route } from './+types/open';
import { mockJobsPageData } from '~/components/05-templates/jobs-page/jobs-page.mock';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Your mum' },
		{ name: 'description', content: 'Likes a bit of crowd control...' },
	];
}

export function loader({ context }: Route.LoaderArgs) {
	return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Jobs({ loaderData }: Route.ComponentProps) {
	console.log(loaderData, 'loaderData');

	return (
		<JobsPage
			jobs={mockJobsPageData.jobs}
			lastUpdated={mockJobsPageData.lastUpdated}
			userName={mockJobsPageData.userName}
			menu={mockJobsPageData.menu}
		/>
	);
}
