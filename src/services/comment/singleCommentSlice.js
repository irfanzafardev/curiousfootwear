import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import singleCommentService from './singleCommentService'

const initialState = {
  currentComment: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

// Fetch a comment
export const getCommentById = createAsyncThunk(
  'singlecomment/getbyid',
  async (commentId, thunkAPI) => {
    try {
      return await singleCommentService.getCommentById(commentId)
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

// Like comment
export const likeComment = createAsyncThunk(
  'singlecomment/like',
  async (commentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await singleCommentService.likeComment(commentId, token)
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

// Unlike comment
export const unlikeComment = createAsyncThunk(
  'singlecomment/unlike',
  async (commentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await singleCommentService.unlikeComment(commentId, token)
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

export const singleCommentSlice = createSlice({
  name: 'singleComment',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentComment = action.payload
      })
      .addCase(getCommentById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        if (!state.currentComment.like.includes(action.payload)) {
          state.currentComment.like.push(action.payload);
          state.currentComment.like.push(action.payload);
          state.currentComment.dislike.splice(
            state.currentComment.dislike.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        if (!state.currentComment.dislike.includes(action.payload)) {
          state.currentComment.dislike.push(action.payload);
          state.currentComment.like.splice(
            state.currentComment.like.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      })
  }
})

export const { reset } = singleCommentSlice.actions
export default singleCommentSlice.reducer