import { createSelector } from 'reselect'
import { RootState } from 'configureStore'
import { BrandsResponseI, FeaturesResponseI, FeaturesValueResponseI } from './slice'
import { selectAllItemsInCat } from 'features/catalog/selectors'

const getFilters = (state: RootState) => state.filter

export const selectFilterIsInitialized = createSelector([getFilters], filter => filter.initialized)
export const selectFeatures = createSelector([getFilters], filter => filter.features)

const getFiltersBody = (state: RootState) => state.filter.filtersBody

export const selectFiltersBody = createSelector([getFiltersBody], filtersBody => {
  return filtersBody
})

export const selectBrandsBody = createSelector([getFiltersBody], filtersBody => {
  return filtersBody.brand
})

export const selectPopular = createSelector([getFiltersBody], filtersBody => {
  return filtersBody.popular
})

export const selectIsNew = createSelector([getFiltersBody], filtersBody => {
  return filtersBody.isnew
})

export const selectSale = createSelector([getFiltersBody], filtersBody => {
  return filtersBody.sale
})

export const selectPriceBody = createSelector([getFiltersBody], filtersBody => {
  return filtersBody.price
})

export const selectMileageBody = createSelector([getFiltersBody], filtersBody => {
  return filtersBody.mileage
})

export const selectFiltersBodyBrands = createSelector([getFiltersBody], filtersBody => {
  return filtersBody.brand
})

const getFeaturesFilterBody = (state: RootState) => state.filter.featuresFilterBody

export const selectFeaturesFilterBody = createSelector([getFeaturesFilterBody], featuresFilterBody => {
  let filteredFilterFeaturesBody: { [id: number]: string[] | string } = {}
  Object.keys(featuresFilterBody)
    .filter(key => {
      return featuresFilterBody[Number(key)].length !== 0
    })
    .forEach(key => {
      return (filteredFilterFeaturesBody[Number(key)] = featuresFilterBody[Number(key)])
    })
  return filteredFilterFeaturesBody
})

const getBrands = (state: RootState) => state.filter.brands

export const selectBrands = createSelector([getBrands], brands => {
  return brands.brandItems
})

export const selectBrandsStatus = createSelector([getBrands], brands => {
  return brands.status
})

interface MatchBrandsWithItemsInCatI {
  brand: BrandsResponseI
  lengthInItemsByCat: number
}

export const selectMatchBrandsWithItemsInCat = createSelector(
  [getBrands, selectAllItemsInCat],
  (brands, allItemsInCat) => {
    let matchBrandsWithItemsInCat: MatchBrandsWithItemsInCatI[] = []

    brands.brandItems.forEach(brand => {
      let lengthItemsInCategory = 0
      allItemsInCat.forEach(catalogItem => {
        return brand.brand_id === catalogItem.brand_id ? lengthItemsInCategory++ : null
      })
      matchBrandsWithItemsInCat = [
        ...matchBrandsWithItemsInCat,
        {
          brand: brand,
          lengthInItemsByCat: lengthItemsInCategory,
        },
      ]
    })
    return matchBrandsWithItemsInCat
      .filter(item => item.lengthInItemsByCat !== 0)
      .sort((a, b) => b.lengthInItemsByCat - a.lengthInItemsByCat)
  },
)

const getFeaturesStatus = (state: RootState) => state.filter.features.status

export const selectFeaturesStatus = createSelector([getFeaturesStatus], status => status)

const getFeaturesValueStatus = (state: RootState) => state.filter.featuresValue.status
export const selectFeaturesValueStatus = createSelector([getFeaturesValueStatus], status => status)

const getFeaturesItems = (state: RootState) => state.filter.features.featuresItems
const getFeaturesValueItems = (state: RootState) => state.filter.featuresValue.featuresValueItems

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

interface SortedFeaturesWithValuesLengthI {
  feature: FeaturesResponseI
  featuresValueItems: FeatureValueItemsWithLengthI[]
}

interface FeatureValueItemsWithLengthI {
  featureValueItem: FeaturesValueResponseI
  lengthInItemsByCat: number
}

export const selectSortedFeaturesWithLengthValues = createSelector(
  [getFeaturesItems, getFeaturesValueItems, selectAllItemsInCat],
  (featuresItems, featuresValueItems, allItemsInCat) => {
    let sortedFeaturesWithValues: SortedFeaturesWithValuesLengthI[] = []
    let featureValueItemsWithLength: FeatureValueItemsWithLengthI[] = []
    featuresValueItems.forEach(featureValueItem => {
      featureValueItemsWithLength = [
        ...featureValueItemsWithLength,
        {
          featureValueItem: featureValueItem,
          lengthInItemsByCat: allItemsInCat.filter(obj =>
            obj.feature.some(feature => feature.feature_value === featureValueItem.feature_value),
          ).length,
        },
      ]
    })
    featuresItems.forEach(featureItem => {
      sortedFeaturesWithValues = [
        ...sortedFeaturesWithValues,
        {
          feature: featureItem,
          featuresValueItems: featureValueItemsWithLength
            .filter(itemWithLength => {
              return itemWithLength.featureValueItem.feature_id === featureItem.feature_id
            })
            .sort((a, b) => b.lengthInItemsByCat - a.lengthInItemsByCat)
            .filter(itemWithLength => {
              return itemWithLength.lengthInItemsByCat !== 0
            }),
        },
      ]
    })
    return sortedFeaturesWithValues
  },
)
