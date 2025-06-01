import clsx from 'clsx';
import { Icon, type TIconName } from '../icon/icon';
import { Text } from '../text/text';
import styles from './radio.module.css';

export type TRadio = {
	icon?: TIconName;
	title?: string;
	description: string;
	name: string;
	value: string;
};

export const Radio: React.FC<TRadio> = ({
	icon,
	title,
	name,
	value,
	description,
	...rest
}) => {
	return (
		<label
			className={clsx(styles.base, title ? styles.withTitle : null)}
			data-e2e-id="radio"
			{...rest}
		>
			<input
				type="radio"
				name={name}
				value={value}
				className={styles.radio}
			/>

			<div className={styles.contentWrapper}>
				{icon ? <Icon name={icon} color="brand" /> : null}
				<div className={styles.textWrapper}>
					{title ? (
						<Text weight="300" color="brand">
							{title}
						</Text>
					) : null}
					<Text weight="200">{description}</Text>
				</div>
			</div>

			<span className={styles.radioCircle}>
				<Icon
					className={styles.radioTick}
					name="check-circle"
					color="brand"
					size={28}
				/>
			</span>
		</label>
	);
};
