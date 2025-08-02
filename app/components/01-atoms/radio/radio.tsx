import type { TIconName } from '../icon/icon.tsx';

import { clsx } from 'clsx';
import { Icon } from '../icon/icon.tsx';
import { Text } from '../text/text.tsx';

import styles from './radio.module.css';

export type TRadio = {
	id: string;
	label: string;
	name: string;
	value: string;
	icon?: TIconName;
	hint?: string;
	checked?: boolean;
	className?: string;
} & Pick<React.ComponentProps<'input'>, 'onChange' | 'defaultChecked'>;

export const Radio: React.FC<TRadio> = ({
	id,
	label,
	name,
	value,
	hint,
	checked,
	defaultChecked,
	icon,
	className,
	onChange,
}) => {
	const hintId = `${id}-hint`;

	return (
		<div className={clsx(styles.field, className)}>
			<input
				id={id}
				type="radio"
				value={value}
				checked={checked}
				name={name}
				defaultChecked={defaultChecked}
				aria-describedby={hint ? hintId : undefined}
				className={styles.input}
				onChange={onChange}
				data-e2e-id="radio"
			/>

			<div className={styles.inner}>
				{icon ? (
					<Icon name={icon} color="brand" className={styles.icon} />
				) : null}

				<div className={styles.content}>
					<label htmlFor={id} className={styles.label}>
						<Text weight="300" color="brand" role="presentation">
							{label}
						</Text>
					</label>

					{hint ? (
						<Text
							id={hintId}
							tag="p"
							weight="200"
							color="foreground"
							className={styles.hint}
						>
							{hint}
						</Text>
					) : null}
				</div>

				<span className={styles.radio} aria-hidden="true">
					<Icon
						className={styles.radioTick}
						name="check-circle"
						color="brand"
						size="100%"
					/>
				</span>
			</div>
		</div>
	);
};
