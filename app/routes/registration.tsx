import { convertFormDataToObject } from 'utils/convert-form-data-to-object';
import type { Route } from './+types/registration';

import { Form, useActionData } from 'react-router';
import { registrationFormSchema } from 'schemas/registration-form-schema.ts';

const getErrorReturn = () => ({
	fieldErrors: {},
	error: {
		title: "We're having a bit of trouble processing your request.",
		bodyText:
			"Don't worry, your information is still here. Please click 'Register your interest' again in a moment.",
	},
	status: 500,
});

export const action = async ({ request }: Route.ActionArgs) => {
	if (request.method !== 'POST') return getErrorReturn();

	try {
		const formData = await request.formData();
		const formObject = convertFormDataToObject(formData);
		const fieldErrors: Record<string, string | undefined> = {};
		const result = registrationFormSchema.safeParse(formObject);

		console.log(formObject, 'formObject');

		if (!result.success) {
			for (const error of result.error.errors) {
				fieldErrors[error.path[0]] = error.message;
			}

			return {
				fieldErrors,
			};
		}
	} catch (error) {
		return getErrorReturn();
	}
};

export const loader = async (data: Route.LoaderArgs) => {
	return data;
};

export default function Registration(data: Route.ComponentProps) {
	const actionData = useActionData<typeof action>();

	console.log(actionData, 'actionData');

	return (
		<>
			<h1>Become an interpreter</h1>

			<Form name="registration" method="POST">
				<fieldset>
					<legend>Your details</legend>

					<div>
						<label htmlFor="name">Full name</label>
						<input id="name" type="text" name="name" />
					</div>

					<div>
						<label htmlFor="email">Email</label>
						<input id="email" type="email" name="email" />
					</div>
				</fieldset>

				<fieldset>
					<legend>NRCPD details</legend>

					<div>
						<p>
							If you're NRCPD-registered, please provide your
							registration number here.
						</p>

						<p>
							If not, please choose "Non-NRCPD", tell us who
							you're registered with, and provide a registration
							number..
						</p>
					</div>

					<div>
						<input
							id="non-nrcpd"
							type="checkbox"
							name="nonNrcpd"
							value="yes"
						/>
						<label htmlFor="non-nrcpd">Non-NRCPD</label>
					</div>

					<div>
						<label htmlFor="registration-organisation">
							Registration organisation
						</label>
						<input
							id="registration-organisation"
							type="text"
							name="registrationOrganisation"
						/>
					</div>

					<div>
						<label htmlFor="registration-number">
							Registration number
						</label>
						<input
							id="registration-number"
							type="text"
							name="registrationNumber"
						/>
					</div>
				</fieldset>

				<fieldset>
					<legend>Password</legend>

					<div>
						<label htmlFor="password">
							Create a great password
						</label>
						<input id="password" type="password" name="password" />
					</div>
				</fieldset>

				<fieldset>
					<legend>Notification settings</legend>

					<div>
						<p>Email me about new job listings:</p>
					</div>

					<div>
						<input
							id="job-post-emails"
							type="checkbox"
							name="jobPostEmails"
							value="yes"
						/>
						<label htmlFor="job-post-emails">
							As soon as a job goes live
						</label>
					</div>

					<div>
						<input
							id="job-summary-emails"
							type="checkbox"
							name="jobSummaryEmails"
							value="yes"
						/>
						<label htmlFor="job-summary-emails">
							A daily summary
						</label>
					</div>
				</fieldset>

				<button type="submit">Join</button>
			</Form>
		</>
	);
}
