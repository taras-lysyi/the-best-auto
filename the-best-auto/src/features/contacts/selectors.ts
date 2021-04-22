import { createSelector } from 'reselect'
import { RootState } from 'configureStore'

const getContacts = (state: RootState) => state.contacts

export const selectContactsInitialized = createSelector([getContacts], contacts => contacts.initialized)

export const selectContactsData = createSelector([getContacts], contacts => contacts.data)
