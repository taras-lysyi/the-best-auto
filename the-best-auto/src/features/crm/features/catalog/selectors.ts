import { createSelector } from 'reselect'
import { RootState } from 'configureStore'
import { FeaturesValueResponseI, FeaturesResponseI } from 'features/catalog/features/filter/slice'

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

export const selectProductId = createSelector([getFormData], formData => formData.productData.data?.item_id)

export const selectFiles = createSelector([getFormData], formData => formData.productData.files)

export const selectCarFax = createSelector([getFormData], formData => formData.productData.carFax.available)

export const selectImages = createSelector([getFormData], formData => formData.productData.images)

const getFeaturesItems = (state: RootState) => state.formData.features.featuresItems
const getFeaturesValueItems = (state: RootState) => state.formData.featuresValue.featuresValueItems

export const selectFeaturesItems = createSelector([getFeaturesItems], featuresItems => {
  return featuresItems
})

export const selectFeaturesValueItems = createSelector([getFeaturesValueItems], featuresValueItems => {
  return featuresValueItems
})

interface SortedFeaturesWithValuesI {
  feature: FeaturesResponseI
  featuresValueItems: FeaturesValueResponseI[]
}

export const selectSortedFeaturesWithValues = createSelector(
  [getFeaturesItems, getFeaturesValueItems],
  (featuresItems, featureValueItems) => {
    let sortedFeaturesWithValues: SortedFeaturesWithValuesI[] = []
    featuresItems.forEach(feature => {
      sortedFeaturesWithValues = [
        ...sortedFeaturesWithValues,
        {
          feature,
          featuresValueItems: featureValueItems
            .filter(item => feature.feature_id === item.feature_id)
            .sort((a, b) => a.feature_value.localeCompare(b.feature_value)),
        },
      ]
    })
    return sortedFeaturesWithValues
  },
)
