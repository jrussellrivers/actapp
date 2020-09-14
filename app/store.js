import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'
import likesReducer from '../features/likes/likesSlice'
import userReducer from '../features/user/userSlice'
import tokenReducer from '../features/login/tokenSlice'
import pageReducer from '../features/pageSlice'
import postIdReducer from '../features/posts/postIdSlice'
import postByIdReducer from '../features/posts/postByIdSlice'
import actionsReducer from '../features/actions/actionsSlice'
import actionIdReducer from '../features/actions/actionIdSlice'
import actionResourcesReducer from '../features/actions/actionResourcesSlice'
import profileByIdReducer from '../features/user/profileByIdSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    user: userReducer,
    token: tokenReducer,
    page: pageReducer,
    postId: postIdReducer,
    postById: postByIdReducer,
    actions: actionsReducer,
    actionId: actionIdReducer,
    actionResources: actionResourcesReducer,
    profileById: profileByIdReducer
  }
})