import { Radio, type TRadio } from '~/components/01-atoms/radio/radio.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './radio-inputs-group.module.css';

export type TRadioInputsGroup = {
	items: TRadio[];
	label?: string;
	description?: string;
	isRequired?: boolean;
};

export const RadioInputsGroup: React.FC<TRadioInputsGroup> = ({
	items,
	label,
	description,
	isRequired,
}) => {
	const reqOpt = isRequired ? '(Required)' : '(Optional)';

	return (
		<>
			<div className={styles.base}>
				<div className={styles.textWrapper}>
					{label ? (
						<Text weight="200">
							{label}{' '}
							<Text weight="200" color="brand">
								{reqOpt}
							</Text>
						</Text>
					) : null}
					{description ? (
						<Text weight="100">{description}</Text>
					) : null}
				</div>
				<fieldset className={styles.inputsContainer}>
					{items.map((item) => {
						return <Radio key={item.value} {...item} />;
					})}
				</fieldset>
			</div>
		</>
	);
};
