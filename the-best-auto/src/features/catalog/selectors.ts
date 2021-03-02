import { createSelector } from 'reselect'
import { RootState } from 'configureStore'

const getCatalog = (state: RootState) => state.catalog

export const selectInitializedAllItemsInCat = createSelector([getCatalog], catalog => catalog.initializedAllItemsInCat)

export const selectCatalogDataStatus = createSelector([getCatalog], catalog => {
  return catalog.catalogDataByCategoryIds.status
})

export const selectAllItemsInCat = createSelector([getCatalog], catalog => {
  return catalog.allItemsInCat
})

export const selectItemsByFilter = createSelector([getCatalog], catalog => {
  return catalog.itemsByFilter
})

export const selectPrice = createSelector([getCatalog], catalog => {
  return catalog.price
})

export const selectMileage = createSelector([getCatalog], catalog => {
  return catalog.mileage
})

export const selectTotalItemsByCat = createSelector([getCatalog], catalog => {
  return catalog.catalogDataByCategoryIds.catalogData.total
})
