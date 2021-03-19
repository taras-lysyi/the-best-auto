import { createSelector } from 'reselect'
import { RootState } from 'configureStore'

const getAuth = (state: RootState) => state.auth

export const selectIsAuthorized = createSelector([getAuth], auth => auth.isAuthorized)
export const selectUserData = createSelector([getAuth], auth => auth.userData)
