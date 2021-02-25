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
    status: LoadingStatusT
    catalogData: ByCategoryIdsResponseI
  }
  allItemsInCat: Product[]
  itemsByFilter: Product[]
  price: {
    min: number
    max: number
  }
  mileage: {
    min: number
    max: number
  }
  initializedAllItemsInCat: boolean
}

const initialState: InitialStateI = {
  catalogDataByCategoryIds: {
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
  allItemsInCat: [],
  itemsByFilter: [],
  price: {
    min: 0,
    max: 0,
  },
  mileage: {
    min: 0,
    max: 0,
  },
  initializedAllItemsInCat: false,
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setInitializeAllItemsInCat: (state, action: PayloadAction<boolean>) => {
      state.initializedAllItemsInCat = action.payload
    },
  },
  extraReducers: builder => {
    // BYCATEGORYIDS
    builder.addCase(getByCategoryIds.pending, state => {
      state.catalogDataByCategoryIds.status = 'loading'
    })
    builder.addCase(getByCategoryIds.fulfilled, (state, action: PayloadAction<ByCategoryIdsResponseI>) => {
      state.catalogDataByCategoryIds.catalogData = action.payload
      state.itemsByFilter = action.payload.itemsByCat
      if (state.initializedAllItemsInCat === false) {
        state.allItemsInCat = action.payload.items
        state.price.min = action.payload.price.min
        state.price.max = action.payload.price.max
        state.mileage.min = action.payload.mileage.min
        state.mileage.max = action.payload.mileage.max
        state.initializedAllItemsInCat = true
      }
      state.catalogDataByCategoryIds.status = 'success'
    })

    builder.addCase(getByCategoryIds.rejected, state => {
      state.catalogDataByCategoryIds.status = 'failed'
    })
  },
})

export const { setInitializeAllItemsInCat } = catalogSlice.actions

export default catalogSlice.reducer
