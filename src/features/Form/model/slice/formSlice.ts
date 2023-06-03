import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormSchema } from '../types/formSchema'
import { submitFormData } from '../services/submitFormData/submitFormData'

const initialState: FormSchema = {
	status: 'init',
	errorMessage: undefined
}

export const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(submitFormData.pending, (state) => {
				state.errorMessage = undefined
				state.status = 'loading'
			})
			.addCase(submitFormData.fulfilled, (state) => {
				state.status = 'success'
			})
			.addCase(submitFormData.rejected, (state, action) => {
				state.status = 'error'
				state.errorMessage = action.payload
			})
	},
})

export const { actions: formActions } = formSlice
export const { reducer: formReducer } = formSlice
