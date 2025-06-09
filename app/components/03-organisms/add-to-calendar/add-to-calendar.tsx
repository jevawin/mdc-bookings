import type { TAddToCalendarItem } from '~/global-types.ts';

import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { Icon } from '~/components/01-atoms/icon/icon.tsx';
import { Text } from '~/components/01-atoms/text/text.tsx';
import {
	Button,
	ButtonContent,
} from '~/components/02-molecules/button/button.tsx';

import styles from './add-to-calendar.module.css';

export type TAddToCalendar = {
	items: TAddToCalendarItem[];
	isDisabled?: boolean;
};

type TTAddToCalendarProps = {
	className?: string;
	buttonClassName?: string;
} & TAddToCalendar;

export const AddToCalendar: React.FC<TTAddToCalendarProps> = ({
	items,
	isDisabled = false,
	className,
	buttonClassName,
}) => {
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const linkRefs = useRef<HTMLAnchorElement[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const handleButtonClick = (): void => {
		setIsOpen(!isOpen);
	};

	const handleButtonKeyDown = (
		e: React.KeyboardEvent<HTMLButtonElement>,
	): void => {
		const isEscapeKey = e.key === 'Escape';
		const isArrowDown = e.key === 'ArrowDown';

		if (isEscapeKey && isOpen) {
			e.preventDefault();
			setIsOpen(false);
			return;
		}

		if (isArrowDown && isOpen) {
			e.preventDefault();
			linkRefs.current[0]?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
		const isEscapeKey = e.key === 'Escape';
		const isArrowDown = e.key === 'ArrowDown';
		const isArrowUp = e.key === 'ArrowUp';

		const links = linkRefs.current;
		const activeIndex = links.findIndex(
			(el) => el === document.activeElement,
		);

		if (isEscapeKey) {
			e.preventDefault();
			buttonRef.current?.focus();
			setIsOpen(false);
			return;
		}

		if (isArrowDown && activeIndex < linkRefs.current.length - 1) {
			e.preventDefault();
			linkRefs.current[activeIndex + 1]?.focus();
			return;
		}

		if (isArrowUp && activeIndex > 0) {
			e.preventDefault();
			linkRefs.current[activeIndex - 1]?.focus();
		}
	};

	const handleBodyClick = (e: MouseEvent): void => {
		const button = buttonRef.current;

		if (!button) return;

		const isNotButton = !e.composedPath().includes(button);

		if (isNotButton) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();

		document.body.addEventListener('click', handleBodyClick, {
			signal: controller.signal,
		});

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<div
			className={clsx(styles.atc, className)}
			data-e2e-id="add-to-calendar"
		>
			<Button
				id="atc-button"
				onClick={handleButtonClick}
				onKeyDown={handleButtonKeyDown}
				ref={buttonRef}
				aria-expanded={isOpen}
				aria-haspopup="true"
				className={clsx(styles.button, buttonClassName)}
				variant={isDisabled ? 'inactive' : 'primary'}
			>
				<ButtonContent.Text>Add to calendar</ButtonContent.Text>
				<ButtonContent.Icon name="calendar-plus" />
			</Button>

			<menu
				className={styles.menu}
				hidden={!isOpen}
				onKeyDown={handleKeyDown}
				aria-labelledby="atc-button"
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
				role="menu"
			>
				{items.map((item, i) => (
					<li key={item.name} role="presentation">
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.link}
							role="menuitem"
							ref={(el) => {
								if (el) linkRefs.current[i] = el;
							}}
						>
							<Text size="100" weight="200" role="presentation">
								{item.name}
							</Text>

							<Icon name={item.icon} size={22} />
						</a>
					</li>
				))}
			</menu>
		</div>
	);
};
