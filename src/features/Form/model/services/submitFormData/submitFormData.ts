import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import type { SubmitFormData } from '../../types/formSchema'


export const submitFormData = createAsyncThunk<object, SubmitFormData, ThunkConfig<string>>(
	'form/submitFormData',
	async (formData, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI

		try {
			const response = await extra.api.post<object>('/order', formData)
			if (!response.data) {
				throw new Error('Что-то пошло не так :(')
			}

			return response.data
		} catch (error) {
			return rejectWithValue('Ошибка при отправке формы')
		}
	}
)