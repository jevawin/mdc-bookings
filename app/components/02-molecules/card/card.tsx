import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';
import {
	Button,
	ButtonContent,
	type TButtonVariant,
} from '../button/button.tsx';

import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './card.module.css';

export type TCard = {
	id: string;
	title: string;
	bodyText?: string;
};

type TCardRoot = {
	id: string;
	children: React.ReactNode;
};

const CardRoot: React.FC<TCardRoot> = ({ id, children }) => (
	<article id={id} className={styles.card} data-e2e-id="card">
		{children}
	</article>
);

type TCardHeader = {
	title: string;
	bodyText?: string;
};

const CardHeader: React.FC<TCardHeader> = ({ title, bodyText }) => (
	<header className={styles.header}>
		<Text tag="h2" size="100" weight="300">
			{title}
		</Text>

		{bodyText ? (
			<Text tag="p" size="100" weight="100">
				{bodyText}
			</Text>
		) : null}
	</header>
);

type TCardButton = {
	text: string;
	icon: TIconName;
	variant: TButtonVariant;
	onClick?: () => void;
};

const CardButton: React.FC<TCardButton> = ({
	text,
	icon,
	variant,
	onClick,
}) => (
	<Button variant={variant} onClick={onClick}>
		<ButtonContent.Icon name={icon} />
		<ButtonContent.Text>{text}</ButtonContent.Text>
	</Button>
);

export const Card = {
	Root: CardRoot,
	Header: CardHeader,
	Button: CardButton,
};
