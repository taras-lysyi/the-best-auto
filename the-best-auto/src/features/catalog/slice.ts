import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { instance } from 'serverConfig'
import { PayloadAction } from '@reduxjs/toolkit'

export type LoadingStatus = 'loading' | 'success' | 'failed' | null

interface InitialStateI {
  filter: {
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

interface GetFeatureI {
  feature_id: number
  feature_name: string // Колір
  sort: number
}

export const getFeature = createAsyncThunk('/features/all', async function getFeature() {
  const response = await instance.post('/features/all')
  return response.data
})

interface GetFeaturesValueI {
  feature_value_id: number
  feature_id: number
  feature_value: string
  feauture_param: null
}

export const getFeaturesValue = createAsyncThunk('/features/value', async function getFeaturesValue() {
  const response = await instance.post('/features/value')
  return response.data
})

const initialState: InitialStateI = {
  filter: {
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
  },
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setInitializeFilter: (state, action: PayloadAction<boolean>) => {
      state.filter.initialized = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getBrands.pending, state => {
      state.filter.brands.status = 'loading'
    })
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.filter.brands.brandsItems = action.payload.result
      state.filter.brands.status = 'success'
    })
    builder.addCase(getBrands.rejected, state => {
      state.filter.brands.status = 'failed'
    })

    builder.addCase(getFeature.pending, state => {
      state.filter.features.status = 'loading'
    })
    builder.addCase(getFeature.fulfilled, (state, action) => {
      state.filter.features.featuresItems = action.payload.result
      state.filter.features.status = 'success'
    })
    builder.addCase(getFeature.rejected, state => {
      state.filter.features.status = 'failed'
    })

    builder.addCase(getFeaturesValue.pending, state => {
      state.filter.featuresValue.status = 'loading'
    })
    builder.addCase(getFeaturesValue.fulfilled, (state, action) => {
      state.filter.featuresValue.featuresValueItems = action.payload.result
      state.filter.featuresValue.status = 'success'
    })
    builder.addCase(getFeaturesValue.rejected, state => {
      state.filter.featuresValue.status = 'failed'
    })
  },
})

export const { setInitializeFilter } = catalogSlice.actions

export default catalogSlice.reducer
