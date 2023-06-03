import { submitFormData } from '../services/submitFormData/submitFormData'
import { FormSchema } from '../types/formSchema'
import { formReducer } from './formSlice'

describe('formSlice.test', () => {
	test('test submitFormData service pending', () => {
		const state: DeepPartial<FormSchema> = {
			status: 'init',
			errorMessage: undefined,
		}

		expect(formReducer(state as FormSchema, submitFormData.pending)).toEqual({
			status: 'loading',
			errorMessage: undefined,
		})
	})

	test('test submitFormData fullfiled', () => {
		const state: DeepPartial<FormSchema> = {
			status: 'init',
			errorMessage: undefined,
		}

		expect(formReducer(state as FormSchema, submitFormData.fulfilled)).toEqual({
			status: 'success',
		})
	})
})
