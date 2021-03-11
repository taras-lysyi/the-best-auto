import { createSelector } from 'reselect'
import { RootState } from 'configureStore'

const getFormData = (state: RootState) => state.formData

export const selectFormDataIsInitialized = createSelector([getFormData], formData => formData.initialized)
