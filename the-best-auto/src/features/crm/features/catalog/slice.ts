import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'

export interface ProductResponseFeature {
  feature_id: number
  feature_value_id: number
  feature_value: string
  feature_param: null
}

export interface ProductResponse {
  item_id: null | number
  user_id: number
  date_active: null
  time_active: null
  title: string
  images: string // "18, 19, 2, 48 ,"
  category_id: null | number
  brand_id: null | number
  product_code: string
  vin: string
  mileage: number
  ml: 0 | 1
  year: number
  price: number
  offer_price: null | number
  available: 0 | 1
  sort: 0 | 1
  description: string | []
  note: string | []
  popular: 0 | 1
  new: 0 | 1
  sale: 0 | 1
  sold: 0 | 1
  active: 0 | 1
  feature: ProductResponseFeature[]
  variant: []
  rating: number
  review_count: number
  user: {
    user_id: number
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    city: string | null
    delivery: null | string
    gender: number
    phone_verify: number
  }
}

export interface FormFeaturesI {
  featureId: number
  featureValueId: number
}
export interface FormDataI {
  itemId: null | number
  dateActive: null
  timeActive: null
  title: string
  images: string[]
  categoryId: null | number
  brandId: null | number
  productCode: string
  vin: string
  mileage: number
  ml: 0 | 1
  year: string
  price: number
  offerPrice: null | number
  available: 0 | 1
  description: string
  note: string
  popular: 0 | 1
  new: 0 | 1
  sale: 0 | 1
  sold: 0 | 1
  active: 0 | 1
  features: FormFeaturesI[]
  variant: []
}

export const addCRM = createAsyncThunk('/product/addCRM', async (product: FormDataI) => {
  const response = await axios.post(
    `/product/addCRM`,
    JSON.stringify({
      product,
    }),
  )
  return response.data.result
})

export const editCRM = createAsyncThunk('/product/editCRM', async (product: FormDataI) => {
  const response = await axios.post(
    `/product/editCRM`,
    JSON.stringify({
      product,
    }),
  )
  return response.data.result
})
export const itemsCRM = createAsyncThunk('/catalog/itemsCRM', async (itemIds: string[]) => {
  const response = await axios.post(
    `/catalog/itemsCRM`,
    JSON.stringify({
      itemIds: itemIds,
    }),
  )
  return response.data.result
})
interface InitialStateI {
  status: LoadingStatusT
  productData: {
    status: LoadingStatusT
    initialized: boolean
    data: ProductResponse | null
  }
  initialized: boolean
  formData: FormDataI
}

const initialState: InitialStateI = {
  status: null,
  initialized: false,
  productData: {
    initialized: false,
    status: null,
    data: null,
  },
  formData: {
    itemId: null,
    dateActive: null,
    timeActive: null,
    title: '',
    images: [],
    categoryId: null,
    brandId: null,
    productCode: '',
    vin: '',
    mileage: 0,
    ml: 0,
    year: '',
    price: 0,
    offerPrice: null,
    available: 0,
    description: '',
    note: '',
    popular: 0,
    new: 0,
    sale: 0,
    sold: 0,
    active: 0,
    features: [],
    variant: [],
  },
}
const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setProductDataIsInitialized: state => {
      state.productData.initialized = true
    },
    resetProductData: state => {
      state.productData.initialized = false
      state.productData.status = null
      state.productData.data = null
    },
    setFormDataIsInitialized: (state, action: PayloadAction<{ value: boolean }>) => {
      state.initialized = action.payload.value
    },
  },
  extraReducers: builder => {
    builder.addCase(addCRM.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(addCRM.fulfilled, state => {
      state.status = 'success'
    })

    builder.addCase(addCRM.rejected, state => {
      state.status = 'failed'
    })

    builder.addCase(itemsCRM.pending, state => {
      state.productData.status = 'loading'
    })
    builder.addCase(itemsCRM.fulfilled, (state, action: PayloadAction<ProductResponse[]>) => {
      state.productData.data = action.payload[0]
      state.productData.initialized = true
      state.productData.status = 'success'
    })

    builder.addCase(itemsCRM.rejected, state => {
      state.productData.status = 'failed'
    })
  },
})
export const { setFormDataIsInitialized, setProductDataIsInitialized, resetProductData } = formDataSlice.actions

export default formDataSlice.reducer
