import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'

interface GetCategoriesResponseI {
  category_id: number
  parent_id: null | number
  link: string // onroad
  name: string // 'Авто в дорози в украину
  name_once: string | null
  active: number
  main: number // 1
  second: number // 0
  sort: number // 4
}

export const getCategories = createAsyncThunk('/category/all', async () => {
  const response = await axios.post('/category/all')
  return response.data.result
})

interface InitialStateI {
  selectedCategoryId: number[] | []
  selectedCategoryLink: string | null
  initialized: boolean
  status: LoadingStatusT
  categoriesData: GetCategoriesResponseI[]
}

const initialState: InitialStateI = {
  selectedCategoryId: [],
  selectedCategoryLink: null,
  initialized: false,
  status: null,
  categoriesData: [],
}
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setInitializeCategories: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload
    },
    setSelectedCategory: (
      state,
      action: PayloadAction<{ selectedCategoryId: number[]; selectedCategoryLink: string }>,
    ) => {
      state.selectedCategoryId = action.payload.selectedCategoryId
      state.selectedCategoryLink = action.payload.selectedCategoryLink
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategories.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categoriesData = action.payload
      state.status = 'success'
    })
    builder.addCase(getCategories.rejected, state => {
      state.status = 'failed'
    })
  },
})

export const { setInitializeCategories, setSelectedCategory } = categorySlice.actions

export default categorySlice.reducer
