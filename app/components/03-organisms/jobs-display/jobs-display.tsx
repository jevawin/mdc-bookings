import type { TJob } from '~/global-types.ts';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { Segment } from '~/components/04-layouts/segment/segment.tsx';
import { JobsDisplayCard } from './components/card.tsx';

import styles from './jobs-display.module.css';

export type TJobsDisplay = {
	id: string;
	title: string;
	type: TJobsDisplayType;
	isPast: boolean;
	cards: TJob[];
};

export type TJobsDisplayRoot = {
	id: string;
	children?: React.ReactNode;
};

const JobsDisplayRoot: React.FC<TJobsDisplayRoot> = ({ id, children }) => (
	<Segment.Root
		id={id}
		aria-labelledby={`${id}-title`}
		data-e2e-id="jobs-display"
		className={styles.display}
	>
		{children}
	</Segment.Root>
);

type TJobsDisplayTitle = {
	id: string;
	title: string;
};

const JobsDisplayTitle: React.FC<TJobsDisplayTitle> = ({ id, title }) => (
	<Text id={`${id}-title`} tag="h2" size="300" weight="300">
		{title}
	</Text>
);

type TJobsDisplayType = 'applied' | 'approved' | 'open';

type TJobsDisplayCards = {
	type: TJobsDisplayType;
	isPast: boolean;
	cards: TJob[];
	cardClicked?: string;
	onCardClick?: (record: string) => void;
};

const JobsDisplayCards: React.FC<TJobsDisplayCards> = ({
	type,
	isPast,
	cards,
	cardClicked,
	onCardClick,
}) => (
	<ul className={styles.list}>
		{cards.map((card) => (
			<li key={card.id}>
				<JobsDisplayCard
					job={card}
					type={type}
					isPast={isPast}
					cardClicked={cardClicked}
					onCardClick={onCardClick}
				/>
			</li>
		))}
	</ul>
);

export const JobsDisplay = {
	Root: JobsDisplayRoot,
	Title: JobsDisplayTitle,
	Cards: JobsDisplayCards,
};
