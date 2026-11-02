import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import authReducer from 'features/auth/slice'
import catalogReducer from 'features/catalog/slice'
import filterReducer from 'features/catalog/features/filter/slice'
import categoryReducer from 'features/catalog/features/categories/slice'
import productReducer from 'features/product/slice'
import formDataReducer from 'features/crm/features/catalog/slice'
import reviewsReducer from 'features/reviews/slice'
import teamReducer from 'features/team/slice'
import contactsReducer from 'features/contacts/slice'

const rootReducer = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,
  filter: filterReducer,
  category: categoryReducer,
  product: productReducer,
  formData: formDataReducer,
  reviews: reviewsReducer,
  team: teamReducer,
  contacts: contactsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>
