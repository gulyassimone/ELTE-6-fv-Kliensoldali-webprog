import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (
      state,
      { payload: { user, accessToken } }
    ) => {
      state.user = user
      state.token = accessToken
    },
    unsetCredentials : (state) => {
      state.user = ""
      state.token = ""
    }
  },
})

export const { setCredentials,unsetCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state ? state.auth ? state.auth.user : null : null;