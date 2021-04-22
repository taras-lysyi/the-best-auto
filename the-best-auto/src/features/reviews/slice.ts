import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'

export const getSettingsYoutubeReviews = createAsyncThunk('/settings/get', async () => {
  const response = await axios.post(`/settings/get`, {
    settings_key: 'youtube_reviews',
  })
  return response.data.result // id [5]
})

interface InitialStateI {
  status: LoadingStatusT
  settingsYoutubeReviews: string | null
  initialized: boolean
}

const initialState: InitialStateI = {
  status: null,
  settingsYoutubeReviews: null,
  initialized: false,
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSettingsYoutubeReviews.fulfilled, (state, action) => {
      state.initialized = true
      state.settingsYoutubeReviews = action.payload
    })

    builder.addCase(getSettingsYoutubeReviews.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getSettingsYoutubeReviews.rejected, state => {
      state.status = 'failed'
    })
  },
})

export default reviewsSlice.reducer
