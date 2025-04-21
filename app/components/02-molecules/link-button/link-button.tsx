import styles from './link-button.module.css';
import { Icon, type TIconName } from '~/components/01-atoms/icon/icon';
import { Text } from '~/components/01-atoms/text/text';

export type TLinkButton = {
	text: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	icon?: TIconName;
	icon_size?: number;
	styleOnly?: boolean;
};

export const LinkButton: React.FC<TLinkButton> = ({
	text,
	onClick,
	icon,
	icon_size,
	styleOnly = false,
}) => {
	const Tag = styleOnly ? 'span' : 'button';
	return (
		<Tag onClick={onClick} className={styles.base}>
			<Text
				size="100"
				weight="300"
				tag="span"
				className={styles.linkButtonText}
			>
				{text}
			</Text>
			{icon ? (
				<Icon
					name={icon}
					size={icon_size || 17}
					className={styles.linkButtonIcon}
				/>
			) : null}
		</Tag>
	);
};
