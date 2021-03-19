import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface UserDataI {
  user_id: number
  name: string
  delivery: null | string
  city: null | string
  email: string
  gender: number
  phone: string
  phone_verify: 0 | 1
  token: string
}
interface UserVerifyI {
  error: string
  server_time: number
  status: boolean
  result: UserDataI
}

export const userVerify = createAsyncThunk('/users/verify', async () => {
  const response = await axios.post(`/users/verify`)
  return response.data
})

export const userRegister = createAsyncThunk(
  '/users/register',
  async ({ email, name, password, phone }: { email: string; name: string; password: string; phone: string }) => {
    const response = await axios.post(
      `/users/register`,
      JSON.stringify({
        email,
        name,
        password,
        phone,
      }),
    )
    return response.data
  },
)
export const loginByEmail = createAsyncThunk(
  '/users/phone/authenticate',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(
      `/users/authenticate`,
      JSON.stringify({
        email,
        password,
      }),
    )
    return response.data
  },
)

interface InitialStateI {
  isAuthorized: boolean | null
  userData: UserDataI | null
}

const initialState: InitialStateI = {
  isAuthorized: null,
  userData: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetUserData: state => {
      state.userData = null
    },
  },
  extraReducers: builder => {
    builder.addCase(userVerify.fulfilled, (state, action: PayloadAction<UserVerifyI>) => {
      if (action.payload.status === true) {
        state.userData = action.payload.result
        localStorage.setItem('user', JSON.stringify(action.payload.result))
      }
      state.isAuthorized = action.payload.status
    })
    builder.addCase(loginByEmail.fulfilled, (state, action: PayloadAction<UserVerifyI>) => {
      if (action.payload.status === true) {
        state.userData = action.payload.result
        localStorage.setItem('user', JSON.stringify(action.payload.result))
      }
      state.isAuthorized = action.payload.status
    })
    builder.addCase(userRegister.fulfilled, (state, action: PayloadAction<UserVerifyI>) => {
      if (action.payload.status === true) {
        state.userData = action.payload.result
        localStorage.setItem('user', JSON.stringify(action.payload.result))
      }
      state.isAuthorized = action.payload.status
    })
  },
})
export const { resetUserData } = authSlice.actions
export default authSlice.reducer
