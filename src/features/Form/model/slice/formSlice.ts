import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormSchema } from '../types/formSchema'
import { submitFormData } from '../services/submitFormData/submitFormData'

const initialState: FormSchema = {
	firstName: '',
	lastName: '',
	email: '',
	productType: undefined,
	featureOne: undefined,
	featureTwo: undefined,
	comment: '',
	status: 'init',
	errorMessage: undefined
}

export const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		setFirstName: (state, action: PayloadAction<string>) => {
			state.firstName = action.payload
		},
		setLastName: (state, action: PayloadAction<string>) => {
			state.lastName = action.payload
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		},
		setProductType: (state, action: PayloadAction<object>) => {
			state.productType = action.payload
		},
		setFeatureOne: (state, action: PayloadAction<object>) => {
			state.featureOne = action.payload
		},
		setFeatureTwo: (state, action: PayloadAction<object>) => {
			state.featureTwo = action.payload
		},
		setComment: (state, action: PayloadAction<string>) => {
			state.comment = action.payload
		},
	},
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
