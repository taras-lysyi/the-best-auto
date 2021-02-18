import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'
import { FeaturesValueResponseI, FiltersBodyDataI } from './features/filter/slice'
export interface CategoryIdsBodyDataI {
  categoryIds: number[] | [] | undefined[]
  filters: FiltersBodyDataI & { [id: number]: string[] }
  order: string // popular
  page: number
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
  catalogDataByCategoryIds: {
    initialized: boolean
    status: LoadingStatusT
    catalogData: ByCategoryIdsResponseI
  }
}

const initialState: InitialStateI = {
  catalogDataByCategoryIds: {
    initialized: false,
    status: null,
    catalogData: {
      items: [],
      itemsByCat: [],
      limit: 0,
      mileage: {
        end: 0,
        max: 0,
        min: 0,
        start: 0,
      },
      offset: 0,
      price: {
        end: 0,
        max: 0,
        min: 0,
        start: 0,
      },
      sql: null,
      total: 0,
    },
  },
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setInitializeCatalogDataByCategoryIds: (state, action: PayloadAction<boolean>) => {
      state.catalogDataByCategoryIds.initialized = action.payload
    },
  },
  extraReducers: builder => {
    // BYCATEGORYIDS
    builder.addCase(getByCategoryIds.pending, state => {
      state.catalogDataByCategoryIds.status = 'loading'
    })
    builder.addCase(getByCategoryIds.fulfilled, (state, action: PayloadAction<ByCategoryIdsResponseI>) => {
      state.catalogDataByCategoryIds.catalogData = action.payload
      state.catalogDataByCategoryIds.status = 'success'
    })

    builder.addCase(getByCategoryIds.rejected, state => {
      state.catalogDataByCategoryIds.status = 'failed'
    })
  },
})

export const { setInitializeCatalogDataByCategoryIds } = catalogSlice.actions

export default catalogSlice.reducer
