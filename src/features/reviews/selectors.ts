import { createSelector } from 'reselect'
import { RootState } from 'configureStore'

const getReviews = (state: RootState) => state.reviews

export const selectYoutubeReviewsSettingsInitialized = createSelector([getReviews], reviews => reviews.initialized)

export const selectYoutubeReviewsSettings = createSelector([getReviews], reviews => reviews.settingsYoutubeReviews)
