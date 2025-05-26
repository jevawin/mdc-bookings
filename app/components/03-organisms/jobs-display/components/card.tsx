import type { TJob } from '~/global-types.ts';
import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';
import type { TButtonVariant } from '~/components/02-molecules/button/button.tsx';

import { Card } from '~/components/02-molecules/card/card.tsx';

type TJobsDisplayType = 'applied' | 'approved' | 'open';

type TJobsDisplayCardsButtonMap = {
	text: string;
	icon: TIconName;
	varaint: TButtonVariant;
};

type TGetButtonData = {
	[k in TJobsDisplayType]: TJobsDisplayCardsButtonMap;
};

type TJobsDisplayCard = {
	job: TJob;
	type: TJobsDisplayType;
	isPast?: boolean;
	cardClicked?: string;
	onCardClick?: (record: string) => void;
};

const getButtonData = (isPast: boolean): TGetButtonData => ({
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
});

export const JobsDisplayCard: React.FC<TJobsDisplayCard> = ({
	job,
	type,
	isPast = false,
	cardClicked,
	onCardClick,
}) => {
	const buttonData = getButtonData(isPast);
	const button = buttonData[type];
	const isApproved = type === 'approved';

	const handleOnClick = () => {
		if (onCardClick) {
			onCardClick(job.record);
		}
	};

	return (
		<Card.Root id={job.id}>
			<Card.Content>
				<Card.Header title="Job number" bodyText={job.id}>
					{isApproved ? (
						<Card.AddToCalendarButton
							isDisabled={isPast}
							event={{
								title: `MDC Interpreting: ${job.id}`,
								description: job.description,
								location: job.location,
								start: job.dateTimeStart,
								end: job.dateTimeEnd,
								organizer: {
									name: 'Manchester Deaf Centre',
									email: 'bookings@manchesterdeafcentre.com',
								},
							}}
						/>
					) : (
						<Card.Button
							text={button.text}
							icon={button.icon}
							variant={button.varaint}
							isLoading={cardClicked === job.record}
							onClick={handleOnClick}
						/>
					)}
				</Card.Header>

				<Card.DescriptionList
					items={[
						{
							title: 'Service',
							description: job.service,
						},
						{
							title: 'Specialism',
							description: job.specialism,
						},
						{
							title: 'Date',
							description: job.displayDate,
						},
						{
							title: 'Time',
							description: job.displayTime,
						},
						{
							title: 'Location',
							description: job.location,
						},
					]}
				/>

				<Card.Description
					title="Description"
					bodyText={job.description}
				/>
			</Card.Content>
		</Card.Root>
	);
};
