import type { StoryObj, Meta } from '@storybook/react-vite';
import type { TSegment } from './segment.tsx';

import { Segment as SegmentComponent } from './segment.tsx';

const meta: Meta<TSegment> = {
	title: '04-layouts/Segment',
	component: SegmentComponent.Root,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		containerSize: {
			description: 'Controls the maximum width of the container',
			options: ['max', 'min'],
			control: 'inline-radio',
			table: {
				defaultValue: {
					summary: 'max',
				},
			},
		},
	},
};

export default meta;
type Story = StoryObj<TSegment>;

export const Segment: Story = {
	args: {
		containerSize: 'max',
	},
	render: (args) => (
		<SegmentComponent.Root id="segment">
			<SegmentComponent.Container containerSize={args.containerSize}>
				<div className="containerInner">Hello world</div>
			</SegmentComponent.Container>
		</SegmentComponent.Root>
	),
};
