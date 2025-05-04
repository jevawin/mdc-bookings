import { Text } from '~/components/01-atoms/text/text';
import styles from './header.module.css';
import { NavLink } from 'react-router';
import { Icon } from '~/components/01-atoms/icon/icon';

export type THeader = {
	userName: string;
};

export const Header: React.FC<THeader> = ({ userName }) => {
	return (
		<div className={styles.base} data-e2e-id="header">
			<div className={styles.headerInner}>
				<Text tag="h2" weight="200" size="400" className={styles.title}>
					<img
						src="/assets/logo.svg"
						alt="MDC logo"
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
					<Icon name="user" size={19} className={styles.userIcon} />
					{userName}
				</Text>
				<nav className={styles.nav}>
					<ul className={styles.list}>
						<li className={styles.listItem}>
							<NavLink to="/jobs" className={styles.navLink}>
								<Text tag="span" size="200" weight="200">
									Jobs
								</Text>
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to="/account" className={styles.navLink}>
								<Text tag="span" size="200" weight="200">
									Account
								</Text>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};
