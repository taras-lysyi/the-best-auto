import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'

export const getMapData = createAsyncThunk('/contacts/getCarFax', async (itemId: number | string) => {
  const response = await axios.post(`/product/getCarFax`, JSON.stringify({ itemId }))
  return response.data.status
})

export interface AddMapLocationI {
  city: string
  description: string
  office: 0 | 1
  name: string
  phone: string
  geo: string
}
export const addMapLocation = createAsyncThunk('/contacts/map/addMapLocation', async (data: AddMapLocationI) => {
  const response = await axios.post(`/contacts/map/addMapLocation`, data)
  return response.data
})

export const getMapLocations = createAsyncThunk('/contacts/map/getMapLocations', async () => {
  const response = await axios.get(`/contacts/map/getMapLocations`)
  return response.data.result
})

interface InitialStateI {
  status: LoadingStatusT
  data: AddMapLocationI[] | null
  initialized: boolean
}

const initialState: InitialStateI = {
  status: null,
  data: null,
  initialized: false,
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMapLocations.fulfilled, (state, action) => {
      state.data = action.payload
      state.initialized = true
    })
  },
})

export default contactsSlice.reducer
