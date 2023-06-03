import { configureStore } from '@reduxjs/toolkit'
import { $api } from 'shared/api/api'
import type { ReducersMapObject } from '@reduxjs/toolkit'
import type { StateSchema, ThunkExtraArg } from './StateSchema'
import { formReducer } from 'features/Form'

export function createReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		form: formReducer,
	}

	const extraArg: ThunkExtraArg = {
		api: $api,
	}

	const store = configureStore({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}),
	})

	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
