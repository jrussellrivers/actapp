import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// const initialFetch = async () =>{
//     console.log('in the fetch')
//     //  http://localhost:3333/posts
//     const data = await fetch('https://swapi.dev/api/people/1')
//     .then(response=>response.json())

//     console.log(data)
//     return data
// }
    
// const initialState = initialFetch()
// const initialState = fetch('https://swapi.dev/api/people/1')
// .then(response=>response.json())
// .then(data=> data)

// console.log(initialState)

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('http://localhost:3333/posts')
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    posts: [],
    status: 'idle',
    error: null
  }

const postsSlice = createSlice({
name: 'posts',
initialState,
reducers: {},
extraReducers: {
    [fetchPosts.pending]: (state, action) => {
        state.status = 'loading'
      },
    [fetchPosts.fulfilled]: (state, action) => {
    state.status = 'succeeded'
    // Add any fetched posts to the array
    state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    }
}
})

// console.log(postsSlice.reducer)

export default postsSlice.reducer



// const postsFunc = async () =>{
//     const initialFetch = () =>{
//         console.log('in the fetch')
//         //  http://localhost:3333/posts
//         const data = fetch('https://swapi.dev/api/people/1')
//         .then(response=>response.json())
    
//         console.log(data)
//         // return data
//     }
        
//     const initialState = await initialFetch()
    
//     console.log(initialState)
    
//     const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {}
//     })

//     return postsSlice.reducer
// }

// export {postsFunc}