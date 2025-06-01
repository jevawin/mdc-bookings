import { Text } from '~/components/01-atoms/text/text.tsx';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';

import styles from './refresh-status.module.css';

export type TRefreshStatus = {
	dateTime: string;
	displayDateTime: string;
};

export const RefreshStatus: React.FC<TRefreshStatus> = ({
	dateTime,
	displayDateTime,
}) => (
	<div className={styles.refresh}>
		<div className={styles.content}>
			<Text tag="h2" size="100" weight="200">
				Last updated
			</Text>

			<time dateTime={dateTime}>
				<Text size="100" weight="100" role="presentation">
					{displayDateTime}
				</Text>
			</time>
		</div>

		<Button
			size="small"
			variant="secondary"
			onClick={() => location.reload()}
		>
			<ButtonContent.Icon name="refresh" />
			<ButtonContent.Text>Refresh</ButtonContent.Text>
		</Button>
	</div>
);
