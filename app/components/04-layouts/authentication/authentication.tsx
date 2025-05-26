import { Outlet } from 'react-router';

import { AuthenticationHeader } from './components/header.tsx';
import { AuthenticationFooter } from './components/footer.tsx';
import { Container } from '../container/container.tsx';

import styles from './authentication.module.css';

export type TAuthentication = React.PropsWithChildren;

export default function AuthenticationLayout() {
	return (
		<div className={styles.container}>
			<Container className={styles.inner}>
				<Outlet />
			</Container>
		</div>
	);
}

export const Authentication = {
	Header: AuthenticationHeader,
	Footer: AuthenticationFooter,
};
