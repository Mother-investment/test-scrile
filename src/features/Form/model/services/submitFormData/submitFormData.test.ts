import { submitFormData } from './submitFormData'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'


const formData = {
	firstName: 'First Name',
	lastName: 'Last Name',
	email: 'test@gmail.com',
	productType: 'product50',
	featureOne: true,
	featureTwo: false,
	comment: 'My comment...',
}

describe('submitFormData.test', () => {
	test('success submit', async () => {
		const thunk = new TestAsyncThunk(submitFormData)
		thunk.api.post.mockResolvedValue(Promise.resolve({ data: formData }))
		const result = await thunk.callThunk(formData)

		expect(thunk.api.post).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe('fulfilled')
		expect(result.payload).toEqual(formData)
	})

	test('error submit', async () => {
		const thunk = new TestAsyncThunk(submitFormData)
		thunk.api.post.mockResolvedValue(Promise.resolve({ status: 403 }))
		const result = await thunk.callThunk(formData)

		expect(thunk.api.post).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe('rejected')
		expect(result.payload).toBe('Ошибка при отправке формы')
	})
})
