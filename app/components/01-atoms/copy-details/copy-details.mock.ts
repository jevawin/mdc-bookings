import type { TCopyDetails } from './copy-details.tsx';

export type TMockCopyDetails = {
	address1: string;
	city: string;
	postcode: string;
};

export const mockCopyDetailsData: TCopyDetails<TMockCopyDetails> = {
	id: '1',
	label: 'Copy Address',
	details: {
		address1: '123 Main St',
		city: 'Anytown',
		postcode: '12345',
	},
	onCopy: (data) => {
		console.log('Copied data:', data);
	},
};
