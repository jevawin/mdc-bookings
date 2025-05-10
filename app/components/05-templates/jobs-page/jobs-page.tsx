import type { TButtonVariant } from '~/components/02-molecules/button/button.tsx';
import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';
import type { TJobCard } from '~/components/02-molecules/job-card/job-card.tsx';
import type { TMenu } from '~/components/02-molecules/menu/menu.tsx';

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
	menu: TMenu;
};

export const JobsPage: React.FC<TJobsPage> = ({
	type,
	userName,
	jobs,
	lastUpdated,
	menu,
}) => {
	const isApproved = type === 'approved';
	const isOpen = type === 'open';
	const cta: TJobsPageCta = {
		icon: isOpen ? 'pencil' : 'cross',
		text: isOpen ? 'Apply' : 'Revoke',
		variant: isOpen ? 'apply' : 'revoke',
	};

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
						className={styles.userName}
					>
						<Icon
							name="user"
							size={19}
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
					<Menu items={menu.items} />

					<div className={styles.lastUpdated}>
						<Button
							size="small"
							variant="secondary"
							onClick={() => location.reload()}
						>
							<ButtonContent.Icon name="refresh" size={14} />
							<ButtonContent.Text>Refresh</ButtonContent.Text>
						</Button>

						<Text
							size="100"
							weight="100"
							tag="p"
							className={styles.updatedTime}
						>
							Last updated: {lastUpdated}.&nbsp;
						</Text>
					</div>

					<ul className={styles.jobs}>
						{jobs.map((job) => (
							<li key={job.id}>
								<JobCard
									id={job.id}
									service={job.service}
									specialism={job.specialism}
									dateTime={job.dateTime}
									location={job.location}
									description={job.description}
									cta={!isApproved ? cta : undefined}
								/>
							</li>
						))}
					</ul>
				</Container>
			</main>
		</>
	);
};
