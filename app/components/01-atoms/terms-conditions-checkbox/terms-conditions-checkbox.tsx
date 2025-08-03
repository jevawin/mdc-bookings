import clsx from 'clsx';
import { List } from '../../03-organisms/list/list.tsx';
import { Icon } from '../icon/icon.tsx';
import { TextLink } from '../text-link/text-link.tsx';
import { Text } from '../text/text.tsx';
import styles from './terms-conditions-checkbox.module.css';

export type TTermsConditionsCheckbox = {
	termsLink: string;
	cancellationLink: string;
	isInvalid?: boolean;
	name: string;
};

export const TermsConditionsCheckbox: React.FC<TTermsConditionsCheckbox> = ({
	termsLink,
	cancellationLink,
	isInvalid,
	name,
}) => {
	const invalidClass = isInvalid ? styles.error : '';

	return (
		<div
			className={clsx(styles.base, invalidClass)}
			data-e2e-id="terms-conditions-checkbox"
		>
			<label
				className={styles.label}
				aria-describedby="terms-hint key-terms"
			>
				<input
					type="checkbox"
					className={styles.checkBox}
					name={name}
				/>
				<Text size="300" color="brand" weight="300">
					Terms and conditions
				</Text>
			</label>
			<div className={styles.hint}>
				{isInvalid ? <Icon name="warning" color="negative" /> : null}
				<Text
					tag="p"
					id="terms-hint"
					color={isInvalid ? 'negative' : undefined}
					weight={isInvalid ? '300' : undefined}
				>
					Please tick to confirm you have read and understand the
					terms and conditions{' '}
					<TextLink
						linkText="at the end of this page"
						to={termsLink}
						color="foreground"
					/>
				</Text>
			</div>
			<div id="key-terms" className={styles.keyTerms}>
				<Text weight="300">Key terms:</Text>
				<List.Root>
					<List.Item>
						<Icon name="check-circle" size="19" />
						<Text weight="200">
							We may provide more than one interpreter. We'll
							confirm this with you if so.
						</Text>
					</List.Item>
					<List.Item>
						<Icon name="check-circle" size="19" />
						<Text weight="200">
							You consent to us sharing your data with
							interpreters.
						</Text>
					</List.Item>
					<List.Item>
						<Icon name="check-circle" size="19" />
						<Text weight="200">
							You agree to pay within 30 days of your appointment.
						</Text>
					</List.Item>
					<List.Item>
						<Icon name="check-circle" size="19" />
						<Text weight="200">
							You agree to our{' '}
							<TextLink
								linkText="cancellation charges"
								to={cancellationLink}
								color="foreground"
							/>
							.
						</Text>
					</List.Item>
				</List.Root>
			</div>
		</div>
	);
};
