import { Outlet } from 'react-router';

import { AuthenticationHeader } from './components/header.tsx';
import { AuthenticationFooter } from './components/footer.tsx';
import { Container } from '../container/container.tsx';

import styles from './authentication.module.css';

export type TAuthentication = React.PropsWithChildren;

export default function AuthenticationLayout(): React.ReactNode {
	return (
		<div className={styles.container}>
			<Container>
				<div className={styles.inner}>
					<Outlet />
				</div>
			</Container>
		</div>
	);
}

export const Authentication = {
	Header: AuthenticationHeader,
	Footer: AuthenticationFooter,
};
