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

export const deleteCRM = createAsyncThunk('/product/deleteCRM', async ({ itemId }: { itemId: string | number }) => {
  const response = await axios.post(
    `/product/deleteCRM`,
    JSON.stringify({
      itemId,
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
interface UploadDataI {
  files: FileList
  itemId: number | string
}

export const upload = createAsyncThunk('/product/upload', async (data: UploadDataI) => {
  const body = new FormData()
  for (let file of data.files) {
    body.append('file[]', file)
  }
  body.set('itemId', String(data.itemId))
  const response = await axios.post(`/product/upload`, body)
  return response.data.result // ['4.jpg']
})

interface UploadDataCarFaxI {
  files: FileList
  itemId: string
}

export const uploadCarFax = createAsyncThunk('/product/uploadCarFax', async (data: UploadDataCarFaxI) => {
  const body = new FormData()
  body.append('file', data.files[0])
  body.set('itemId', data.itemId)
  const response = await axios.post(`/product/uploadCarFax`, body)
  return response.data.result // ['4.jpg']
})

export const getFiles = createAsyncThunk('/product/getFiles', async (itemId: number | string) => {
  const response = await axios.post(`/product/getFiles`, JSON.stringify({ itemId }))
  return response.data.result // [3.jpg, 4.jpg ]
})
interface RemoveFilesI {
  itemId: number | string
  name: string
}

export const removeFiles = createAsyncThunk('/product/removeFiles', async (data: RemoveFilesI) => {
  const response = await axios.post(`/product/removeFiles`, JSON.stringify({ itemId: data.itemId, name: data.name }))
  return response.data.result // [3.jpg, 4.jpg ]
})

export const getCarFax = createAsyncThunk('/product/getCarFax', async (itemId: number | string) => {
  const response = await axios.post(`/product/getCarFax`, JSON.stringify({ itemId }))
  return response.data.status
})

export const removeCarFax = createAsyncThunk('/product/removeCarFax', async (itemId: number | string) => {
  const response = await axios.post(`/product/removeCarFax`, JSON.stringify({ itemId }))
  return response.data.status
})

interface InitialStateI {
  status: LoadingStatusT
  productData: {
    status: LoadingStatusT
    initialized: boolean
    data: ProductResponse | null
    files: {
      status: LoadingStatusT
      data: string[]
    }
    carFax: {
      available: boolean | null
      status: LoadingStatusT
    }
    images: string[]
  }
  initialized: boolean
}

const initialState: InitialStateI = {
  status: null,
  initialized: false,
  productData: {
    initialized: false,
    status: null,
    data: null,
    files: {
      status: null,
      data: [],
    },
    carFax: {
      available: null,
      status: null,
    },
    images: [],
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
      state.productData.files.status = null
      state.productData.files.data = []
      state.productData.images = []
    },
    setFormDataIsInitialized: (state, action: PayloadAction<{ value: boolean }>) => {
      state.initialized = action.payload.value
    },
    setProductImage: (state, action: PayloadAction<string[]>) => {
      let imgs = []
      for (let img of action.payload) {
        imgs.push(img.split('.')[0])
      }
      state.productData.images = [...state.productData.images, ...imgs]
    },
    removeProductImage: (state, action: PayloadAction<string>) => {
      state.productData.images = state.productData.images.filter(item => {
        return item !== action.payload
      })
    },
    setFirst: (state, action: PayloadAction<string>) => {
      const filtered = state.productData.images.filter(item => {
        return item !== action.payload
      })
      filtered.unshift(action.payload)
      state.productData.images = filtered
    },
    resetProductImages: state => {
      state.productData.images = []
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
      state.productData.images = action.payload[0].images !== null ? action.payload[0].images.split(',') : []
      state.productData.initialized = true
      state.productData.status = 'success'
    })

    builder.addCase(itemsCRM.rejected, state => {
      state.productData.status = 'failed'
    })

    builder.addCase(getFiles.pending, state => {
      state.productData.files.status = 'loading'
    })
    builder.addCase(getFiles.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.productData.files.data = action.payload
      state.productData.files.status = 'success'
    })
    builder.addCase(getFiles.rejected, state => {
      state.productData.files.status = 'failed'
    })

    builder.addCase(getCarFax.pending, state => {
      state.productData.carFax.status = 'loading'
    })
    builder.addCase(getCarFax.fulfilled, (state, action: PayloadAction<boolean>) => {
      state.productData.carFax.status = 'success'
      state.productData.carFax.available = action.payload
    })
    builder.addCase(getCarFax.rejected, state => {
      state.productData.carFax.status = 'failed'
    })
  },
})
export const {
  setFormDataIsInitialized,
  setProductDataIsInitialized,
  resetProductData,
  setProductImage,
  setFirst,
  removeProductImage,
  resetProductImages,
} = formDataSlice.actions

export default formDataSlice.reducer
