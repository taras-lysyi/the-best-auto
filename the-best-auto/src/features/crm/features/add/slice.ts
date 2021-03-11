import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'
interface AddFeaturesI {
  featureId: number
  featureValueId: number
}
interface AddFormDataI {
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
  feature: AddFeaturesI[]
  variant: []
}

export const addCRM = createAsyncThunk('/catalog/byCategoryIds', async (data: AddFormDataI) => {
  const response = await axios.post(
    `/product/addCRM`,
    JSON.stringify({
      data,
    }),
  )
  return response.data.result
})

interface InitialStateI {
  status: LoadingStatusT
  initialized: boolean
  addData: AddFormDataI
  item_id: null | number
}

const initialState: InitialStateI = {
  status: null,
  initialized: false,
  addData: {
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
    feature: [],
    variant: [],
  },
  item_id: null,
}
const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<{ value: number }>) => {
      state.addData.categoryId = action.payload.value
    },
    setFormDataIsInitialized: (state, action: PayloadAction<{ value: boolean }>) => {
      state.initialized = action.payload.value
    },
  },
  extraReducers: builder => {
    builder.addCase(addCRM.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(addCRM.fulfilled, (state, action: PayloadAction<{ item_id: number }>) => {
      state.status = 'success'
    })

    builder.addCase(addCRM.rejected, state => {
      state.status = 'failed'
    })
  },
})
export const { setCategory, setFormDataIsInitialized } = formDataSlice.actions

export default formDataSlice.reducer
