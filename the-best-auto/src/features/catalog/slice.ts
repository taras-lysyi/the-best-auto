import axios, { AxiosResponse } from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'
import { FeaturesValueResponseI } from './features/filter/slice'

interface CategoryIdsBodyDataI {
  categoryIds: []
  page: number
  filters: object
  order: string
}

interface Product {
  item_id: number
  user_id: number
  brand_id: number
  category_id: number
  product_code: string | null
  vin: string | null
  title: string
  price: number
  offer_price: number | null
  data_active: null | number | string
  time_active: null | number | string
  mileage: number
  ml: number
  year: number
  active: number
  sort: number
  available: number
  popular: number
  new: number
  sale: number
  sold: number
  images: string
  feature: FeaturesValueResponseI[]
  description: [] | string
  rating: number
  review_count: number
}

interface Slider {
  min: number
  max: number
  start: number
  end: number
}

interface ByCategoryIdsResponseI {
  items: Product[]
  itemsByCat: Product[]
  limit: number
  price: Slider
  mileage: Slider
  offset: number
  total: number
  sql: null
}

export const getByCategoryIds = createAsyncThunk('/catalog/byCategoryIds', async (data: CategoryIdsBodyDataI) => {
  const { categoryIds, page, filters, order } = data
  const response = await axios.post(
    `/catalog/byCategoryIds`,
    JSON.stringify({
      categoryIds,
      page,
      filters,
      order,
    }),
  )
  return response.data.result
})

interface InitialStateI {
  initialized: boolean
  status: LoadingStatusT
  catalogData: ByCategoryIdsResponseI | null
}

const initialState: InitialStateI = {
  initialized: false,
  status: null,
  catalogData: null,
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setInitializeCatalog: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload
    },
  },
  extraReducers: builder => {
    // BYCATEGORYIDS
    builder.addCase(getByCategoryIds.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getByCategoryIds.fulfilled, (state, action: PayloadAction<ByCategoryIdsResponseI>) => {
      state.catalogData = action.payload
      state.status = 'success'
    })
    builder.addCase(getByCategoryIds.rejected, state => {
      state.status = 'failed'
    })
  },
})

export const { setInitializeCatalog } = catalogSlice.actions

export default catalogSlice.reducer
