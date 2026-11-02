import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingStatusT } from 'shared/types'

export interface TeamI {
  memberImage: FileList
  memberName: string
  memberPosition: string
}

interface TeamResponseI {
  member_id: number
  member_name: string
  member_position: string
}

export const addTeamMember = createAsyncThunk('/team/add', async (member: TeamI) => {
  const body = new FormData()
  body.append('file', member.memberImage[0])
  body.set('member_name', String(member.memberName))
  body.set('member_position', String(member.memberPosition))
  const response = await axios.post(`/team/add`, body)
  return response.data.result
})

export const getTeamMembers = createAsyncThunk('/team/get', async () => {
  const response = await axios.get(`/team/get`)
  return response.data.result
})

export const deleteTeamMember = createAsyncThunk('/team/delete', async (member_id: number) => {
  const response = await axios.post(`/team/delete`, {
    member_id,
  })
  return response.data.result // id [5]
})

interface InitialStateI {
  status: LoadingStatusT
  teamData: TeamResponseI[] | null
  addTeamMember: {
    status: LoadingStatusT
  }
  initialized: boolean
}

const initialState: InitialStateI = {
  status: null,
  teamData: null,
  addTeamMember: {
    status: null,
  },
  initialized: false,
}

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addTeamMember.pending, state => {
      state.addTeamMember.status = 'loading'
    })
    builder.addCase(addTeamMember.fulfilled, (state, action) => {
      state.addTeamMember.status = 'success'
      state.teamData = [...(state.teamData as TeamResponseI[]), action.payload]
    })
    builder.addCase(addTeamMember.rejected, state => {
      state.addTeamMember.status = 'failed'
    })

    builder.addCase(getTeamMembers.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getTeamMembers.fulfilled, (state, action) => {
      state.teamData = action.payload
      state.initialized = true
      state.status = 'success'
    })
    builder.addCase(getTeamMembers.rejected, state => {
      state.status = 'failed'
    })

    builder.addCase(deleteTeamMember.fulfilled, (state, action: PayloadAction<string[]>) => {
      if (state.teamData !== null) {
        state.teamData = state.teamData.filter(item => {
          return item.member_id !== Number(action.payload[0])
        })
      }
    })
  },
})

export default teamSlice.reducer
