import type { TButtonVariant } from '~/components/02-molecules/button/button.tsx';
import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';
import type { TJobCard } from '~/components/02-molecules/job-card/job-card.tsx';
import type { TMenuItem } from '~/components/02-molecules/menu/menu.tsx';

import { NavLink } from 'react-router';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';
import { JobCard } from '~/components/02-molecules/job-card/job-card.tsx';
import { Menu } from '~/components/02-molecules/menu/menu.tsx';
import { Container } from '~/components/04-layouts/container/container.tsx';

import styles from './jobs-page.module.css';

const menuItems: TMenuItem[] = [
	{
		icon: 'list',
		label: 'Open',
		href: '/jobs/open',
	},
	{
		icon: 'clipboard-check',
		label: 'Applied',
		href: '/jobs/applied',
	},
	{
		icon: 'calendar-plus',
		label: 'Approved',
		href: '/jobs/approved',
	},
];

type TJobsPageCta = {
	variant?: TButtonVariant;
	icon: TIconName;
	text: string;
};

export type TJobsPage = {
	type: 'applied' | 'approved' | 'open';
	userName: string;
	jobs: TJobCard[];
	lastUpdated: string;
};

export const JobsPage: React.FC<TJobsPage> = ({
	type,
	userName,
	jobs,
	lastUpdated,
}) => {
	const isApproved = type === 'approved';
	const isOpen = type === 'open';
	const currentJobsCTA: TJobsPageCta = {
		icon: isOpen ? 'pencil' : 'cross',
		text: isOpen ? 'Apply' : 'Revoke',
		variant: isOpen ? 'apply' : 'revoke',
	};
	const pastJobs = jobs.filter((job) => job.isPast);
	const currentJobs = jobs.filter((job) => !job.isPast);

	return (
		<>
			<header className={styles.header}>
				<Container className={styles.headerContainer}>
					<Text
						tag="h2"
						weight="200"
						size="400"
						className={styles.title}
					>
						<img
							src="/assets/logo.svg"
							alt=""
							className={styles.logo}
						/>
						MDC
					</Text>

					<Text
						tag="p"
						size="200"
						weight="100"
						className={styles.centerAlignedText}
					>
						<Icon
							name="user"
							size={17}
							className={styles.userIcon}
						/>
						{userName}
					</Text>

					<nav className={styles.nav} aria-label="Main">
						<ul className={styles.list}>
							<li className={styles.listItem}>
								<NavLink to="/jobs" className={styles.navLink}>
									<Text
										tag="span"
										size="200"
										weight="200"
										role="presentation"
									>
										Jobs
									</Text>
								</NavLink>
							</li>

							<li className={styles.listItem}>
								<NavLink
									to="/account"
									className={styles.navLink}
								>
									<Text
										tag="span"
										size="200"
										weight="200"
										role="presentation"
									>
										Account
									</Text>
								</NavLink>
							</li>
						</ul>
					</nav>
				</Container>
			</header>

			<main id="main" className={styles.main}>
				<Container className={styles.mainContainer}>
					<Menu items={menuItems} />

					<div className={styles.lastUpdated}>
						<Button
							size="small"
							variant="secondary"
							onClick={() => location.reload()}
						>
							<ButtonContent.Icon name="refresh" size={14} />
							<ButtonContent.Text>Refresh</ButtonContent.Text>
						</Button>
						<div>
							<Text
								size="100"
								weight="300"
								tag="p"
								className={styles.updatedTime}
							>
								Last updated:
							</Text>
							<Text
								size="100"
								weight="100"
								tag="p"
								className={styles.updatedTime}
							>
								{lastUpdated}
							</Text>
						</div>
					</div>

					<Text
						size="300"
						tag="h3"
						weight="300"
						className={styles.centerAlignedText}
					>
						<Icon name="clock-rotate" size={19} />
						Upcoming jobs:
					</Text>
					{currentJobs.length > 0 ? (
						<ul className={styles.jobs}>
							{currentJobs.map((job) => (
								<li key={job.id}>
									<JobCard
										id={job.id}
										service={job.service}
										specialism={job.specialism}
										dateTime={job.dateTime}
										location={job.location}
										description={job.description}
										cta={
											!isApproved
												? currentJobsCTA
												: {
														icon: 'calendar-plus',
														text: 'Add to calendar',
														variant: 'primary',
													}
										}
									/>
								</li>
							))}
						</ul>
					) : (
						<Text size="200" weight="200" tag="p">
							No upcoming jobs.
						</Text>
					)}
					{isApproved && pastJobs.length > 0 ? (
						<>
							<Text
								size="300"
								tag="h3"
								weight="300"
								className={styles.centerAlignedText}
							>
								<Icon name="calendar-check" size={19} />
								Past jobs:
							</Text>
							<ul className={styles.jobs}>
								{pastJobs.map((job) => (
									<li key={job.id}>
										<JobCard
											id={job.id}
											service={job.service}
											specialism={job.specialism}
											dateTime={job.dateTime}
											location={job.location}
											description={job.description}
											cta={{
												icon: 'calendar-plus',
												text: 'Add to calendar',
												variant: 'inactive',
											}}
										/>
									</li>
								))}
							</ul>
						</>
					) : isApproved && pastJobs.length === 0 ? (
						<>
							<Text
								size="300"
								tag="h3"
								weight="300"
								className={styles.centerAlignedText}
							>
								<Icon name="calendar-check" size={19} />
								Past jobs:
							</Text>
							<Text size="200" weight="200" tag="p">
								No past jobs.
							</Text>
						</>
					) : null}
				</Container>
			</main>
		</>
	);
};
