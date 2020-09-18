import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'
import likesReducer from '../features/likes/likesSlice'
import userReducer from '../features/user/userSlice'
import tokenReducer from '../features/login/tokenSlice'
import pageReducer from '../features/pageSlice'
import postIdReducer from '../features/posts/postIdSlice'
import postByIdReducer from '../features/posts/postByIdSlice'
import causesReducer from '../features/actions/causesSlice'
import usersCausesReducer from '../features/actions/allUsersCausesSlice'
import causeIdReducer from '../features/actions/causeIdSlice'
import actionsByCauseReducer from '../features/actions/actionsByCauseSlice'
import actionsReducer from '../features/actions/actionsSlice'
import actionIdReducer from '../features/actions/actionIdSlice'
import actionResourcesReducer from '../features/actions/actionResourcesSlice'
import coordinatedActionsReducer from '../features/actions/coordinatedSlice'
import coordinatedActionResourcesReducer from '../features/actions/coordinatedActionResourcesSlice'
import profileByIdReducer from '../features/user/profileByIdSlice'
import registeredUserReducer from '../features/register/registeredUserSlice'
import userPicsReducer from '../features/user/userPicsSlice'
import myCommunityReducer from '../features/user/myCommunitySlice'
import communityByIdReducer from '../features/user/communityByIdSlice'

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
    causes:causesReducer,
    usersCauses:usersCausesReducer,
    causeId:causeIdReducer,
    actionsByCause:actionsByCauseReducer,
    actions: actionsReducer,
    actionId: actionIdReducer,
    actionResources: actionResourcesReducer,
    coordinatedActions:coordinatedActionsReducer,
    coordinatedActionResources:coordinatedActionResourcesReducer,
    profileById: profileByIdReducer,
    registeredUser: registeredUserReducer,
    userPics: userPicsReducer,
    myCommunity: myCommunityReducer,
    communityById: communityByIdReducer
  }
})