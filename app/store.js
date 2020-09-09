import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice'
import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer
  }
})

// export default (state={posts: []}, action) => {
//     console.log(action)
//     switch (action.type){
//         case 'fetchPosts':
//             return {...state, posts: action.data}
//         default: 
//             return state
//     }
// }