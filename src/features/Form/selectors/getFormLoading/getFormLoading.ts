import { StateSchema } from 'app/providers/StoreProvider'

export const getFormLoading = (state: StateSchema) => state?.form.status === 'loading'