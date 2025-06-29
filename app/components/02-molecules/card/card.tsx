import type { TAddToCalendarItem } from '~/global-types.ts';
import type { TIconName } from '~/components/01-atoms/icon/icon.tsx';
import type { TButtonVariant } from '../button/button.tsx';

import { clsx } from 'clsx';
import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Loader } from '~/components/01-atoms/loader/loader.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import { AddToCalendar } from '~/components/03-organisms/add-to-calendar/add-to-calendar.tsx';
import { Button, ButtonContent } from '../button/button.tsx';

import styles from './card.module.css';
import { TextLink } from '~/components/01-atoms/text-link/text-link.tsx';

export type TCard = {
	id: string;
	title: string;
	bodyText?: string;
};

type TCardRoot = {
	id: string;
	children?: React.ReactNode;
	className?: string;
};

const CardRoot: React.FC<TCardRoot> = ({ id, children, className }) => (
	<article
		id={id}
		className={clsx(styles.card, className)}
		data-e2e-id="card"
	>
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
	children?: React.ReactNode;
};

const CardHeader: React.FC<TCardHeader> = ({ title, bodyText, children }) => (
	<header className={styles.header}>
		<hgroup className={styles.hgroup}>
			<Text tag="h2" size="200" weight="300">
				{title}
			</Text>

			{bodyText ? (
				<Text tag="p" size="100" weight="100">
					{bodyText}
				</Text>
			) : null}
		</hgroup>

		{children}
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

			<Icon name="down-arrow" size={28} className={styles.chevron} />
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

type TCardAddToCalendarButton = {
	items: TAddToCalendarItem[];
	isDisabled?: boolean;
};

const CardAddToCalendarButton: React.FC<TCardAddToCalendarButton> = ({
	items,
	isDisabled = false,
}) => (
	<AddToCalendar
		items={items}
		isDisabled={isDisabled}
		className={styles.button}
		buttonClassName={styles.atc}
	/>
);

type TCardTextLink = {
	href: string;
	label: string;
};

const CardTextLink: React.FC<TCardTextLink> = ({ href, label }) => (
	<TextLink to={href} linkText={label} className={styles.textLink} />
);

export const Card = {
	Root: CardRoot,
	Content: CardContent,
	Header: CardHeader,
	DescriptionList: CardDescriptionList,
	Description: CardDescription,
	Button: CardButton,
	AddToCalendarButton: CardAddToCalendarButton,
	TextLink: CardTextLink,
};
