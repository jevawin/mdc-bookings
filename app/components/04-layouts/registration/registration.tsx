import { Outlet } from 'react-router';

import styles from './registration.module.css';

export default function RegistrationLayout() {
	return (
		<div
			className={styles.container}
			data-e2e-id="registration-form-template"
		>
			<div className={styles.inner}>
				<Outlet />
			</div>
		</div>
	);
}
