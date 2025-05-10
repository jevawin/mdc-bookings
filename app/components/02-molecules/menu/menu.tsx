import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';

import { NavLink } from 'react-router';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './menu.module.css';

export type TMenuItem = {
	icon: TIconName;
	icon_size?: number;
	label: string;
	href: string;
};

export type TMenu = { items: TMenuItem[] };

export const Menu: React.FC<TMenu> = ({ items }) => (
	<nav className={styles.base} data-e2e-id="menu">
		<ul className={styles.list}>
			{items.map((item) => (
				<li className={styles.listItem} key={item.label}>
					<NavLink to={item.href} className={styles.link}>
						<Icon
							name={item.icon}
							size={item.icon_size || 28}
							className={styles.linkIcon}
						/>
						<Text
							size="100"
							weight="300"
							tag="span"
							className={styles.linkLabel}
						>
							{item.label}
						</Text>
					</NavLink>
				</li>
			))}
		</ul>
	</nav>
);
