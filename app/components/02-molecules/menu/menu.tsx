import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';

import { NavLink } from 'react-router';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './menu.module.css';

export type TMenuItem = {
	icon: TIconName;
	label: string;
	href: string;
};

export type TMenu = { items: TMenuItem[] };

export const Menu: React.FC<TMenu> = ({ items }) => (
	<nav className={styles.nav} data-e2e-id="menu">
		<ul className={styles.list}>
			{items.map((item) => (
				<li key={item.label} className={styles.item}>
					<NavLink to={item.href} className={styles.link}>
						<Icon
							name={item.icon}
							size={28}
							className={styles.icon}
						/>

						<Text size="100" weight="300" className={styles.label}>
							{item.label}
						</Text>
					</NavLink>
				</li>
			))}
		</ul>
	</nav>
);
