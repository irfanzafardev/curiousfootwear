import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../services/auth/authSlice';
import userReducer from '../services/user/userSlice';
import postReducer from '../services/post/postSlice';
import CommentReducer from '../services/comment/commentSlice';
import SingleCommentReducer from '../services/comment/singleCommentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    comment: CommentReducer,
    singlecomment: SingleCommentReducer,
  }
})
