import { createSelector } from 'reselect'
import { RootState } from 'configureStore'
const getFormData = (state: RootState) => state.formData

export const selectFormDataIsInitialized = createSelector([getFormData], formData => formData.initialized)

export const selectProductDataIsInitialized = createSelector(
  [getFormData],
  formData => formData.productData.initialized,
)

export const selectProductDataStatus = createSelector([getFormData], formData => formData.productData.status)

export const selectProductData = createSelector([getFormData], formData => {
  const copy = Object.assign({}, formData.productData.data) as any
  copy.feature = {}
  formData.productData.data?.feature.forEach(feature => {
    if (copy.feature[feature.feature_id] === undefined) {
      Object.assign(copy.feature, { [feature.feature_id]: [] })
    }
    copy.feature[feature.feature_id] = [...Object.values(copy.feature[feature.feature_id]), feature.feature_value]
  })
  return copy
})
