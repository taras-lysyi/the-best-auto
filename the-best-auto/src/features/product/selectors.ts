import { createSelector } from 'reselect'
import { RootState } from 'configureStore'

const getProduct = (state: RootState) => state.product

export const selectProductData = createSelector([getProduct], product => {
  return product.productData
})
export const selectProductCarFaxAvailable = createSelector([getProduct], product => {
  return product.carFaxAvailable
})

export const selectProductInitialized = createSelector([getProduct], product => {
  return product.initialized
})

export const selectProductStatus = createSelector([getProduct], product => {
  return product.status
})
