import { Icon } from '../../01-atoms/icon/icon.tsx';
import { Text } from '../../01-atoms/text/text.tsx';
import { Callout } from '../callout/callout.tsx';
import { TextInput, type TTextInput } from '../text-input/text-input.tsx';
import styles from './text-inputs-group.module.css';

export type TTextInputsGroup = {
	items: TTextInput[];
	label?: string;
	description?: string;
	isRequired?: boolean;
	dataSharing?: boolean;
};

export const TextInputsGroup: React.FC<TTextInputsGroup> = ({
	items,
	label,
	description,
	isRequired = false,
	dataSharing = false,
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
					{dataSharing ? (
						<Callout className={styles.callout} color="brand">
							<Icon
								name="user-circle-star"
								color="brand"
								size={30}
							/>
							<Text size="100" weight="200">
								We'll share this with your interpreter.
							</Text>
						</Callout>
					) : null}
				</div>
				<fieldset className={styles.inputsContainer}>
					{items.map((item) => {
						return (
							<TextInput
								key={item.id}
								id={item.id}
								label={item.label}
								name={item.id}
								isRequired={
									item.isRequired !== null
										? item.isRequired
										: isRequired
								}
							/>
						);
					})}
				</fieldset>
			</div>
		</>
	);
};
