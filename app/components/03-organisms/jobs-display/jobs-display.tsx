import type { TJob } from '~/global-types.ts';

import styles from './jobs-display.module.css';
import { Segment } from '~/components/04-layouts/segment/segment.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Card } from '~/components/02-molecules/card/card.tsx';

export type TJobsDisplay = {
	id: string;
	title: string;
	jobs: TJob[];
};

export const JobsDisplay: React.FC<TJobsDisplay> = ({ id, title, jobs }) => {
	const titleId = `${id}-title`;

	return (
		<Segment.Root
			id={id}
			className={styles.base}
			data-e2e-id="jobs-display"
		>
			<Segment.Container>
				<Text id={titleId} tag="h2" size="300" weight="300">
					{title}
				</Text>

				<ul>
					{jobs.map((job) => (
						<li key={job.id}>
							<Card.Root id={job.id}>
								<Card.Header
									title="Job number"
									bodyText={job.id}
								/>
							</Card.Root>
						</li>
					))}
				</ul>
			</Segment.Container>
		</Segment.Root>
	);
};
