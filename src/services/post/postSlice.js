import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}

// Create new post
export const createPost = createAsyncThunk(
  'post/create',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.createPost(postData, token)
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

// Fetch all post
export const getAllPost = createAsyncThunk(
  'post/getAll',
  async (_, thunkAPI) => {
    try {
      return await postService.getAllPost()
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

// Fetch all post
export const getCurrentPost = createAsyncThunk(
  'post/getCurrent',
  async (postId, thunkAPI) => {
    try {
      return await postService.getCurrentPost(postId)
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

// Like post
export const likePost = createAsyncThunk(
  'post/like',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.likePost(postId, token)
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

// Unlike post
export const unlikePost = createAsyncThunk(
  'post/unlike',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.unlikePost(postId, token)
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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCurrentPost.pending, (state) => {
        state.isLoading = true
        state.posts = []
      })
      .addCase(getCurrentPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getCurrentPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (!state.posts.like.includes(action.payload)) {
          state.posts.like.push(action.payload);
          state.posts.dislike.splice(
            state.posts.dislike.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        if (!state.posts.dislike.includes(action.payload)) {
          state.posts.dislike.push(action.payload);
          state.posts.like.splice(
            state.posts.like.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      })
  }
})

export const { reset } = postSlice.actions
export default postSlice.reducer