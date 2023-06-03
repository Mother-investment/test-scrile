import { StateSchema } from 'app/providers/StoreProvider'
import { getFormLoading } from './getFormLoading'

describe('getFormLoading.test', () => {
	test('should return true on loading status', () => {
		const state: DeepPartial<StateSchema> = {
			form: {
				status: 'loading',
			},
		}
		expect(getFormLoading(state as StateSchema)).toEqual(true)
	})

	test('should return false on other status', () => {
		const state: DeepPartial<StateSchema> = {
			form: {
				status: 'init',
			},
		}

		expect(getFormLoading(state as StateSchema)).toEqual(false)
	})
})
