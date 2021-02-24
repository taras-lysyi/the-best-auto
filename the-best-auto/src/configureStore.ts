import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import catalogReducer from 'features/catalog/slice'
import filterReducer from 'features/catalog/features/filter/slice'
import categoryReducer from 'features/catalog/features/categories/slice'
import productReducer from 'features/product/slice'

const rootReducer = combineReducers({
  catalog: catalogReducer,
  filter: filterReducer,
  category: categoryReducer,
  product: productReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
