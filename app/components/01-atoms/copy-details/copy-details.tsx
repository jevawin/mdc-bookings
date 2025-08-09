import styles from './copy-details.module.css';

export type TCopyDetails<T> = {
	id: string;
	label: string;
	details: T;
	onCopy: (data: T) => void;
};

export const CopyDetails = <T,>({
	id,
	label,
	details,
	onCopy,
}: TCopyDetails<T>): React.ReactNode => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const isChecked = e.target.checked;

		if (isChecked) {
			onCopy(details);
		}
	};

	return (
		<div className={styles.field} data-e2e-id="copy-details">
			<label htmlFor={id}>{label}</label>

			<input id={id} type="checkbox" onChange={handleChange} />
		</div>
	);
};
