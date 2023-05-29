import { Status } from 'shared/types/slice'

export type SubmitFormData = {
	firstName?: string
	lastName?: string
	email?: string
	productType?: object
	featureOne?: object
	featureTwo?: object
	comment?: string

}

export type FormSchema = SubmitFormData & {
	status: Status
	errorMessage?: string
}
