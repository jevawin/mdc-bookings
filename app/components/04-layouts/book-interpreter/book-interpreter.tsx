import { Outlet } from 'react-router';

import { Header } from '~/components/02-molecules/header/header.tsx';
import { Container } from '../container/container.tsx';

// import styles from './book-interpreter.module.css';

export type TBookInterpreter = React.PropsWithChildren;

export default function BookInterpreterLayout(): React.ReactNode {
	return (
		<>
			<Header />

			<main id="main">
				<Container>
					<Outlet />
				</Container>
			</main>
		</>
	);
}
