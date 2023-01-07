import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentService from './commentService'

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

// Create new comment
export const createComment = createAsyncThunk(
  'comment/create',
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await commentService.createComment(commentData, token)
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

// Fetch all comment by postId
export const getAllCommentByPostId = createAsyncThunk(
  'comment/getAll',
  async (postId, thunkAPI) => {
    try {
      return await commentService.getAllCommentByPostId(postId)
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

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.comments.push(action.payload)
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllCommentByPostId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCommentByPostId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.comments = action.payload
      })
      .addCase(getAllCommentByPostId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = commentSlice.actions
export default commentSlice.reducer