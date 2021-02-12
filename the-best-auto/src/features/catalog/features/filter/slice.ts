import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from 'serverConfig'
import { PayloadAction } from '@reduxjs/toolkit'

export type LoadingStatus = 'loading' | 'success' | 'failed' | null

interface InitialStateI {
  initialized: boolean
  brands: {
    status: LoadingStatus
    brandsItems: GetBrandsI[]
  }
  features: {
    status: LoadingStatus
    featuresItems: GetFeatureI[]
  }
  featuresValue: {
    status: LoadingStatus
    featuresValueItems: GetFeaturesValueI[]
  }
}

export interface GetBrandsI {
  active: number
  brand_id: number
  link: string // bmw
  name: string // BMW
}

export const getBrands = createAsyncThunk('/brands/all', async function getBrands() {
  const response = await instance.post('/brands/all')
  return response.data
})

export interface GetFeatureI {
  feature_id: number
  feature_name: string // Колір
  sort: number
}

export const getFeature = createAsyncThunk('/features/all', async function getFeature() {
  const response = await instance.post('/features/all')
  return response.data
})

export interface GetFeaturesValueI {
  feature_value_id: number
  feature_id: number
  feature_value: string
  feature_param: null
}

export const getFeaturesValue = createAsyncThunk('/features/value', async function getFeaturesValue() {
  const response = await instance.post('/features/value')
  return response.data
})

const initialState: InitialStateI = {
  initialized: false,
  brands: {
    status: null,
    brandsItems: [],
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
    builder.addCase(getBrands.pending, state => {
      state.brands.status = 'loading'
    })
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands.brandsItems = action.payload.result
      state.brands.status = 'success'
    })
    builder.addCase(getBrands.rejected, state => {
      state.brands.status = 'failed'
    })

    builder.addCase(getFeature.pending, state => {
      state.features.status = 'loading'
    })
    builder.addCase(getFeature.fulfilled, (state, action) => {
      state.features.featuresItems = action.payload.result
      state.features.status = 'success'
    })
    builder.addCase(getFeature.rejected, state => {
      state.features.status = 'failed'
    })

    builder.addCase(getFeaturesValue.pending, state => {
      state.featuresValue.status = 'loading'
    })
    builder.addCase(getFeaturesValue.fulfilled, (state, action) => {
      state.featuresValue.featuresValueItems = action.payload.result
      state.featuresValue.status = 'success'
    })
    builder.addCase(getFeaturesValue.rejected, state => {
      state.featuresValue.status = 'failed'
    })
  },
})

export const { setInitializeFilter } = filterSlice.actions

export default filterSlice.reducer
