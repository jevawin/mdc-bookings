import { Icon, type TIconName } from '~/components/01-atoms/icon/icon.tsx';
import type { TButtonVariant } from '../button/button.tsx';

import { Button, ButtonContent } from '../button/button.tsx';

import { Text } from '~/components/01-atoms/text/text.tsx';

import styles from './card.module.css';
import { Loader } from '~/components/01-atoms/loader/loader.tsx';

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

type TCardContent = {
	children: React.ReactNode;
};

const CardContent: React.FC<TCardContent> = ({ children }) => (
	<div className={styles.content}>{children}</div>
);

type TCardHeader = {
	title: string;
	bodyText?: string;
};

const CardHeader: React.FC<TCardHeader> = ({ title, bodyText }) => (
	<header className={styles.header}>
		<Text tag="h2" size="200" weight="300">
			{title}
		</Text>

		{bodyText ? (
			<Text tag="p" size="100" weight="100">
				{bodyText}
			</Text>
		) : null}
	</header>
);

type TCardDescriptionListItem = {
	title: string;
	description: string;
};

type TCardDescriptionList = {
	items: TCardDescriptionListItem[];
};

const CardDescriptionList: React.FC<TCardDescriptionList> = ({ items }) => (
	<dl className={styles.list}>
		{items.map((item) => (
			<div key={item.title} className={styles.item}>
				<dt>
					<Text size="100" weight="200" role="presentation">
						{item.title}
					</Text>
				</dt>

				<dd className={styles.dd}>
					<Text size="100" weight="100">
						{item.description}
					</Text>
				</dd>
			</div>
		))}
	</dl>
);

type TCardButton = {
	text: string;
	icon: TIconName;
	variant: TButtonVariant;
	isLoading?: boolean;
	onClick?: () => void;
};

type TCardDescription = {
	title: string;
	bodyText: string;
};

const CardDescription: React.FC<TCardDescription> = ({ title, bodyText }) => (
	<details className={styles.details}>
		<summary className={styles.summary}>
			<Text size="100" weight="200" role="presentation">
				{title}
			</Text>

			<Icon name="chevron-down" size={28} className={styles.chevron} />
		</summary>

		<Text tag="p" size="100" weight="100" className={styles.summaryContent}>
			{bodyText}
		</Text>
	</details>
);

const CardButton: React.FC<TCardButton> = ({
	text,
	icon,
	variant,
	isLoading = false,
	onClick,
}) => (
	<Button variant={variant} onClick={onClick} className={styles.button}>
		{isLoading ? <Loader /> : <ButtonContent.Icon name={icon} />}

		<ButtonContent.Text>{text}</ButtonContent.Text>
	</Button>
);

export const Card = {
	Root: CardRoot,
	Content: CardContent,
	Header: CardHeader,
	DescriptionList: CardDescriptionList,
	Description: CardDescription,
	Button: CardButton,
};
