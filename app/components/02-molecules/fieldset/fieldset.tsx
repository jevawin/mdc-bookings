import { clsx } from 'clsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './fieldset.module.css';

export type TFieldset = React.PropsWithChildren<{
	id: string;
	title: string;
	bodyText?: string;
	fieldsetClassName?: string;
	fieldsClassName?: string;
}>;

export const Fieldset: React.FC<TFieldset> = ({
	id,
	title,
	bodyText,
	fieldsetClassName,
	fieldsClassName,
	children,
}) => {
	const hintId = `${id}-hint`;

	return (
		<fieldset
			className={clsx(styles.fieldset, fieldsetClassName)}
			aria-describedby={bodyText ? hintId : undefined}
			data-e2e-id="fieldset"
		>
			<header className={styles.header}>
				<Text tag="legend" size="300" weight="300">
					{title}
				</Text>

				{bodyText ? (
					<Text tag="p" size="100" id={hintId}>
						{bodyText}
					</Text>
				) : null}
			</header>

			<div className={clsx(styles.fields, fieldsClassName)}>
				{children}
			</div>
		</fieldset>
	);
};
