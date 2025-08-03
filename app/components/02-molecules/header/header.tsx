import { NavLink } from 'react-router';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { MdcLogo } from '~/components/01-atoms/mdc-logo/mdc-logo.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Container } from '~/components/04-layouts/container/container.tsx';

import styles from './header.module.css';

export type THeader = {
	username?: string;
};

export const Header: React.FC<THeader> = ({ username }) => (
	<header className={styles.header}>
		<Container className={styles.container}>
			<MdcLogo size="200" />

			{username ? (
				<Text
					tag="p"
					size="200"
					weight="100"
					className={styles.username}
				>
					<Icon name="user" size={20} />

					{username}
				</Text>
			) : null}

			<nav className={styles.nav} aria-label="Main">
				<ul className={styles.list}>
					<li className={styles.item}>
						<NavLink to="/jobs/open" className={styles.link}>
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

					<li className={styles.item}>
						<NavLink to="/account" className={styles.link}>
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
);
