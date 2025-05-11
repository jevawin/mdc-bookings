import { Outlet } from 'react-router';

import styles from './registration.module.css';

export default function RegistrationLayout() {
	return (
		<main id="main" className={styles.main}>
			<Outlet />
		</main>
	);
}
