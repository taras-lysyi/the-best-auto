import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'

export interface BrandsResponseI {
  active: number
  brand_id: number
  link: string // bmw
  name: string // BMW
}

export const getBrands = createAsyncThunk('/brands/all', async () => {
  const response = await axios.post('/brands/all')
  return response.data.result
})

export interface FeaturesResponseI {
  feature_id: number
  feature_name: string // Колір
  sort: number
}

export const getFeatures = createAsyncThunk('/features/all', async () => {
  const response = await axios.post('/features/all')
  return response.data.result
})

export interface FeaturesValueResponseI {
  feature_id: number
  feature_value_id: number
  feature_value: string
  feature_param: null
}

export const getFeaturesValue = createAsyncThunk('/features/value', async () => {
  const response = await axios.post('/features/value')
  return response.data.result
})

interface InitialStateI {
  initialized: boolean
  brands: {
    status: LoadingStatusT
    brandItems: BrandsResponseI[]
  }
  features: {
    status: LoadingStatusT
    featuresItems: FeaturesResponseI[]
  }
  featuresValue: {
    status: LoadingStatusT
    featuresValueItems: FeaturesValueResponseI[]
  }
}

const initialState: InitialStateI = {
  initialized: false,
  brands: {
    status: null,
    brandItems: [],
  },
  features: {
    status: null,
    featuresItems: [],
  },
  featuresValue: {
    status: null,
    featuresValueItems: [],
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setInitializeFilter: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload
    },
  },
  extraReducers: builder => {
    // BRANDS
    builder.addCase(getBrands.pending, state => {
      state.brands.status = 'loading'
    })
    builder.addCase(getBrands.fulfilled, (state, action: PayloadAction<BrandsResponseI[]>) => {
      state.brands.brandItems = action.payload
      state.brands.status = 'success'
    })
    builder.addCase(getBrands.rejected, state => {
      state.brands.status = 'failed'
    })
    // FEATURES
    builder.addCase(getFeatures.pending, state => {
      state.features.status = 'loading'
    })
    builder.addCase(getFeatures.fulfilled, (state, action: PayloadAction<FeaturesResponseI[]>) => {
      state.features.featuresItems = action.payload
      state.features.status = 'success'
    })
    builder.addCase(getFeatures.rejected, state => {
      state.features.status = 'failed'
    })
    // FEATURES VALUES
    builder.addCase(getFeaturesValue.pending, state => {
      state.featuresValue.status = 'loading'
    })
    builder.addCase(getFeaturesValue.fulfilled, (state, action: PayloadAction<FeaturesValueResponseI[]>) => {
      state.featuresValue.featuresValueItems = action.payload
      state.featuresValue.status = 'success'
    })
    builder.addCase(getFeaturesValue.rejected, state => {
      state.featuresValue.status = 'failed'
    })
  },
})

export const { setInitializeFilter } = filterSlice.actions

export default filterSlice.reducer
