import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'
import likesReducer from '../features/likes/likesSlice'
import userReducer from '../features/user/userSlice'
import tokenReducer from '../features/login/tokenSlice'
import pageReducer from '../features/pageSlice'
import postIdReducer from '../features/posts/postIdSlice'
import postByIdReducer from '../features/posts/postByIdSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    user: userReducer,
    token: tokenReducer,
    page: pageReducer,
    postId: postIdReducer,
    postById: postByIdReducer
  }
})