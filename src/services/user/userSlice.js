import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  currentUser: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

// Fetch current user
export const getCurrentUser = createAsyncThunk(
  'user/getCurrent',
  async (userId, thunkAPI) => {
    try {
      return await userService.getCurrentUser(userId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// follow user
export const followUser = createAsyncThunk(
  'user/follow',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.followUser(userId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// unfollow user
export const unfollowUser = createAsyncThunk(
  'user/unfollow',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await userService.unfollowUser(userId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// edit user profile
export const editProfile = createAsyncThunk(
  'user/edit',
  async (profileData, thunkAPI) => {
    try {
      return await userService.editProfile(profileData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentUser = action.payload
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(followUser.fulfilled, (state, action) => {
        if (state.currentUser.followedUsers.includes(action.payload)) {
          state.currentUser.followedUsers.splice(
            state.currentUser.followedUsers.findIndex(
              (ownerId) => ownerId === action.payload
            ),
            1
          );
        } else {
          state.currentUser.followedUsers.push(action.payload);
        }
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.currentUser.followedUsers.splice(
          state.currentUser.followedUsers.findIndex(
            (ownerId) => ownerId === action.payload
          ),
          1
        );
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentUser = action.payload
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = userSlice.actions
export default userSlice.reducer