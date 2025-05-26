import { Outlet } from 'react-router';

import { AuthenticationHeader } from './components/header.tsx';
import { AuthenticationFooter } from './components/footer.tsx';

import styles from './authentication.module.css';

export type TAuthentication = React.PropsWithChildren;

export default function AuthenticationLayout() {
	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<Outlet />
			</div>
		</div>
	);
}

export const Authentication = {
	Header: AuthenticationHeader,
	Footer: AuthenticationFooter,
};
