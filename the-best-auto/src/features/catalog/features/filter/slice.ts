import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'

export interface FiltersBodyDataI {
  brand: number[]
  isnew: 0 | 1
  mileage: {
    min: number
    max: number
    start: number
    end: number
  }
  popular: 0 | 1
  price: {
    min: number
    max: number
    start: number
    end: number
  }
  sale: 0 | 1
}

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
  filtersBody: FiltersBodyDataI
  featuresFilterBody: { [id: number]: string[] | string }
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
  filtersBody: {
    brand: [],
    isnew: 0,
    mileage: {
      min: 0,
      max: 0,
      start: 0,
      end: 0,
    },
    popular: 0,
    price: {
      min: 0,
      max: 0,
      start: 0,
      end: 0,
    },
    sale: 0,
  },
  featuresFilterBody: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setInitializeFilter: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload
    },
    resetFilter: (state, action) => {
      state.initialized = initialState.initialized
      state.filtersBody = initialState.filtersBody
      state.featuresFilterBody = initialState.featuresFilterBody
    },
    setPopular: (state, action: PayloadAction<0 | 1 | string>) => {
      if (typeof action.payload === 'string') {
        state.filtersBody.popular = Number(action.payload) as 0 | 1
      } else {
        action.payload === 0 ? (state.filtersBody.popular = 1) : (state.filtersBody.popular = 0)
      }
    },
    setIsNew: (state, action: PayloadAction<0 | 1 | string>) => {
      if (typeof action.payload === 'string') {
        state.filtersBody.isnew = Number(action.payload) as 0 | 1
      } else {
        action.payload === 0 ? (state.filtersBody.isnew = 1) : (state.filtersBody.popular = 0)
      }
    },
    setSale: (state, action: PayloadAction<0 | 1 | string>) => {
      if (typeof action.payload === 'string') {
        state.filtersBody.sale = Number(action.payload) as 0 | 1
      } else {
        action.payload === 0 ? (state.filtersBody.sale = 1) : (state.filtersBody.sale = 0)
      }
    },
    setBrands: (state, action: PayloadAction<number[] | number>) => {
      debugger
      if (typeof action.payload === 'object') {
        // вызываеться диспач с данными которые приходят из урла
        state.filtersBody.brand = [...(action.payload as number[])]
      } else {
        // вызываеться диспач onchange checkbox
        if (state.filtersBody.brand.indexOf((action.payload as unknown) as number) !== -1) {
          // если элемент есть в массиве
          state.filtersBody.brand = (state.filtersBody.brand as number[]).filter(item => item !== action.payload)
        } else {
          state.filtersBody.brand = [...(state.filtersBody.brand as number[]), (action.payload as unknown) as number]
        }
      }
    },
    setStartEndMileage: (state, action: PayloadAction<number | number[]>) => {
      if (typeof action.payload === 'object') {
        state.filtersBody.mileage.start = action.payload[0]
        state.filtersBody.mileage.end = action.payload[1]
      }
    },
    setStartEndPrice: (state, action: PayloadAction<number | number[]>) => {
      if (typeof action.payload === 'object') {
        state.filtersBody.price.start = action.payload[0]
        state.filtersBody.price.end = action.payload[1]
      }
    },
    setSelectedFeatures: (state, action: PayloadAction<{ featureId: number | string; values: string[] | string }>) => {
      if (typeof action.payload.featureId === 'string') {
        // вызываеться диспач с данными которые приходят из урла
        if (typeof action.payload.values !== 'object') {
          state.featuresFilterBody[Number(action.payload.featureId)] = [action.payload.values]
        } else {
          state.featuresFilterBody[Number(action.payload.featureId)] = action.payload.values
        }
      } else {
        // вызываеться диспач onchange checkbox
        debugger
        if (state.featuresFilterBody[action.payload.featureId].indexOf(action.payload.values as string) !== -1) {
          // если элемент есть в массиве
          state.featuresFilterBody[action.payload.featureId] = (state.featuresFilterBody[
            action.payload.featureId
          ] as string[]).filter(item => item !== action.payload.values)
        } else {
          state.featuresFilterBody[action.payload.featureId] = [
            ...(state.featuresFilterBody[action.payload.featureId] as string[]),
            action.payload.values as string,
          ]
        }
      }
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

export const {
  setInitializeFilter,
  setSelectedFeatures,
  setBrands,
  setIsNew,
  setPopular,
  setSale,
  setStartEndMileage,
  setStartEndPrice,
  resetFilter,
} = filterSlice.actions

export default filterSlice.reducer
