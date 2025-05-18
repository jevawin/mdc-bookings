import type { TJob } from '~/global-types.ts';
import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';
import type { TButtonVariant } from '~/components/02-molecules/button/button.tsx';

import { Text } from '~/components/01-atoms/text/text.tsx';
import { Card } from '~/components/02-molecules/card/card.tsx';
import { Segment } from '~/components/04-layouts/segment/segment.tsx';

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
	children: React.ReactNode;
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

type TJobsDisplayCardsButtonMap = {
	text: string;
	icon: TIconName;
	varaint: TButtonVariant;
};

type TJobsDisplayCards = {
	type: TJobsDisplayType;
	isPast: boolean;
	cards: TJob[];
	handleClick?: (record: string) => void;
};

const JobsDisplayCards: React.FC<TJobsDisplayCards> = ({
	type,
	isPast,
	cards,
	handleClick,
}) => {
	const buttonMap: Record<TJobsDisplayType, TJobsDisplayCardsButtonMap> = {
		applied: {
			text: 'Revoke',
			icon: 'cross',
			varaint: 'revoke',
		},
		approved: {
			text: 'Add to calendar',
			icon: 'calendar-plus',
			varaint: isPast ? 'inactive' : 'primary',
		},
		open: {
			text: 'Apply',
			icon: 'pencil',
			varaint: 'apply',
		},
	};

	return (
		<ul className={styles.list}>
			{cards.map((card) => (
				<li key={card.id}>
					<Card.Root id={card.id}>
						<Card.Header title="Job number" bodyText={card.id} />

						<Card.Button
							text={buttonMap[type].text}
							icon={buttonMap[type].icon}
							variant={buttonMap[type].varaint}
							onClick={
								handleClick
									? () => handleClick(card.record)
									: undefined
							}
						/>
					</Card.Root>
				</li>
			))}
		</ul>
	);
};

export const JobsDisplay = {
	Root: JobsDisplayRoot,
	Title: JobsDisplayTitle,
	Cards: JobsDisplayCards,
};
