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
  featuresValueItems: FeatureValueItemsWithLengthI[]
}

interface FeatureValueItemsWithLengthI {
  featureValueItem: FeaturesValueResponseI
  lengthInItemsByCat: number
}

export const selectSortedFeaturesWithValues = createSelector(
  [getFeaturesItems, getFeaturesValueItems, selectAllItemsInCat],
  (featuresItems, featuresValueItems, allItemsInCat) => {
    let sortedFeaturesWithValues: SortedFeaturesWithValuesI[] = []
    let featureValueItemsWithLength: FeatureValueItemsWithLengthI[] = []

    featuresItems.forEach(feature => {
      featuresValueItems.forEach(featureValue => {
        let lengthFeatureValueItemsInCategory = 0
        allItemsInCat.forEach(catalogItem => {
          catalogItem.feature.forEach(feature => {
            return feature.feature_value_id === featureValue.feature_value_id
              ? lengthFeatureValueItemsInCategory++
              : null
          })
        })
        featureValueItemsWithLength = [
          ...featureValueItemsWithLength,
          {
            featureValueItem: featureValue,
            lengthInItemsByCat: lengthFeatureValueItemsInCategory
          },
        ]
      })

      sortedFeaturesWithValues = [
        ...sortedFeaturesWithValues,
        {
          feature,
          featuresValueItems: featureValueItemsWithLength.sort((a, b) => b.lengthInItemsByCat - a.lengthInItemsByCat)
            .filter(item => {
              return item.lengthInItemsByCat !== 0
            })
            .sort((a, b) => {
              return (b.lengthInItemsByCat = a.lengthInItemsByCat)
            })
            .filter(item => feature.feature_id === item.featureValueItem.feature_id),
        },
      ]
    })
    return sortedFeaturesWithValues
  },
)
