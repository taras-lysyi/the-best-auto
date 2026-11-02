import { createSelector } from 'reselect'
import { RootState } from 'configureStore'

const getCategory = (state: RootState) => state.category

export const selectSelectedCategoryId = createSelector([getCategory], category => {
  return category.selectedCategoryId
})

export const selectSelectedCategoryLink = createSelector([getCategory], category => {
  return category.selectedCategoryLink
})

export const selectCategoriesData = createSelector([getCategory], category => {
  return category.categoriesData
})

// export const selectSelectedCategoryLink = createSelector([getCategory], category => {
//   return category.
// })
