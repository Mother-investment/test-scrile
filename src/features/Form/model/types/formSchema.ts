import { Status } from 'shared/types/slice'

export type SubmitFormData = {
	firstName: string
	lastName: string
	email: string
	productType: string
	featureOne: boolean
	featureTwo: boolean
	comment: string
}

export type FormSchema = {
	status: Status
	errorMessage?: string
}
