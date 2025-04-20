import { Text } from '~/components/01-atoms/text/text';
import styles from '../job-card.module.css';

type TJobFieldGroup = {
	header: string;
	content: string;
};

export const JobFieldGroup: React.FC<TJobFieldGroup> = ({
	header,
	content,
}) => {
	return (
		<div className={styles.dataFieldGroup}>
			<Text size="100" weight="300" tag="h2" className={styles.data}>
				{header}
			</Text>
			<Text size="100" weight="100" tag="p" className={styles.data}>
				{content}
			</Text>
		</div>
	);
};
