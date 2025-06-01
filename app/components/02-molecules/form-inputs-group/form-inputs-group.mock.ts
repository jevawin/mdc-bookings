import type { TFormInputsGroup } from './form-inputs-group.tsx';

export const mockFormInputsGroupData: TFormInputsGroup = {
	label: 'Which service do you require?',
	items: [
		{
			title: 'General',
			name: 'service',
			value: 'general',
			icon: 'apple',
			description:
				'Work meetings, home visits (non-medical), events, job interviews, etc.',
		},
		{
			title: 'Medical',
			name: 'service',
			value: 'medical',
			icon: 'bell',
			description:
				"Hospital or GP appointments, health visits, opticians' appointments.",
		},
		{
			title: 'Specialist',
			name: 'service',
			value: 'specialist',
			icon: 'building',
			description:
				'Legal, mental health, child protection, or assistance with the police.',
		},
	],
};
