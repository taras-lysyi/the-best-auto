import { FeaturesValueResponseI } from '../catalog/features/filter/slice'
import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'

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

export const getProduct = createAsyncThunk('/catalog/items', async (data: string[]) => {
  const response = await axios.post(
    `/catalog/items`,
    JSON.stringify({
      itemIds: data,
    }),
  )
  return response.data.result
})

interface InitialStateI {
  status: LoadingStatusT
  productData: Product[] | []
  initialized: boolean
}

const initialState: InitialStateI = {
  status: null,
  productData: [],
  initialized: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setInitializeProduct: state => {
      state.initialized = true
    },
    resetProduct: state => {
      state.status = null
      state.productData = []
      state.initialized = false
    },
  },
  extraReducers: builder => {
    builder.addCase(getProduct.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.productData = action.payload
      state.status = 'success'
    })
    builder.addCase(getProduct.rejected, state => {
      state.status = 'failed'
    })
  },
})

export const { setInitializeProduct, resetProduct } = productSlice.actions

export default productSlice.reducer
