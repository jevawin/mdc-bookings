import clsx from 'clsx';
import { Icon, type TIconName } from '../icon/icon';
import { Text } from '../text/text';
import styles from './radio.module.css';

export type TRadio = {
	icon: TIconName;
	title?: string;
	description: string;
	name: string;
};

export const Radio: React.FC<TRadio> = ({
	icon,
	title,
	name,
	description,
	...rest
}) => {
	return (
		<label
			className={clsx(styles.base, title ? styles.withTitle : null)}
			data-e2e-id="radio"
			{...rest}
		>
			<div className={styles.contentWrapper}>
				<Icon name={icon} color="brand" />
				<div className={styles.textWrapper}>
					{title ? (
						<Text weight="300" color="brand">
							{title}
						</Text>
					) : null}
					<Text weight="200">{description}</Text>
				</div>
			</div>

			<input type="radio" name={name} className={styles.radio}></input>
			<span className={styles.radioCircle}>
				<Icon
					className={styles.radioTick}
					name="check-circle-solid"
					color="brand"
					size={27}
				/>
			</span>
		</label>
	);
};
