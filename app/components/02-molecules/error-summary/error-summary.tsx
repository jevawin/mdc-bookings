import { clsx } from 'clsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './error-summary.module.css';

export type TErrorSummary = {
	title: string;
	bodyText: string;
	errorSummaryRef?: React.RefObject<HTMLDivElement | null>;
};

type TErrorSummaryProps = {
	className?: string;
} & TErrorSummary;

export const ErrorSummary: React.FC<TErrorSummaryProps> = ({
	title,
	bodyText,
	errorSummaryRef,
	className,
}) => {
	const titleId = 'error-summary-heading';

	return (
		<div
			ref={errorSummaryRef}
			role="group"
			aria-labelledby={titleId}
			tabIndex={-1}
			className={clsx(styles.summary, className)}
			data-e2e-id="error-summary"
		>
			<div className={styles.content}>
				<Text
					tag="h2"
					size="300"
					weight="300"
					id={titleId}
					className={styles.title}
				>
					{title}
				</Text>

				<Text
					tag="p"
					size="100"
					weight="100"
					className={styles.bodyText}
				>
					{bodyText}
				</Text>
			</div>

			<Icon name="warning" size={28} />
		</div>
	);
};
