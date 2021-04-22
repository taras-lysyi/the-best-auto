import { createSelector } from 'reselect'
import { RootState } from 'configureStore'

const getTeam = (state: RootState) => state.team

export const selectTeamInitialized = createSelector([getTeam], team => team.initialized)

export const selectTeamData = createSelector([getTeam], team => team.teamData)
