import { clsx } from 'clsx';

import styles from './copy-details.module.css';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';

export type TCopyDetails = {
	id: string;
	label: string;
	className?: string;
	onCopy: () => void;
};

export const CopyDetails: React.FC<TCopyDetails> = ({
	id,
	label,
	className,
	onCopy,
}: TCopyDetails): React.ReactNode => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const isChecked = e.target.checked;

		if (isChecked) {
			onCopy();
		}
	};

	return (
		<div
			className={clsx(styles.field, className)}
			data-e2e-id="copy-details"
		>
			<input
				id={id}
				type="checkbox"
				className={styles.input}
				onChange={handleChange}
			/>

			<span aria-hidden="true" className={styles.checkbox}>
				<Icon name="check" size="100%" className={styles.icon} />
			</span>

			<label htmlFor={id}>
				<Text weight="200" role="presentation">
					{label}
				</Text>
			</label>
		</div>
	);
};
