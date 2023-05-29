import type { AxiosInstance } from 'axios'
import { FormSchema } from 'features/Form'

export type StateSchema = {
	form: FormSchema
}

export type ThunkExtraArg = {
	api: AxiosInstance
}

export type ThunkConfig<T> = {
	rejectValue: T
	extra: ThunkExtraArg
	state: StateSchema
}