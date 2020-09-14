import React from 'react';
import {Feed} from "./features/feed/Feed"
import { StyleSheet, Text, View, Button } from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import Login from './features/login/Login'
import Register from './features/register/Register'
import AddPost from './features/posts/AddPost'
import Action from './features/actions/Actions'
import ActionResources from './features/actions/ActionResources'
import {changePage} from './features/pageSlice'
import {changeToken} from './features/login/tokenSlice'
import Post from './features/posts/Post'
import PostComments from './features/posts/PostComments'
import Search from './features/Search'

export default function App() {

    const page = useSelector(state => state.page.pageName)
    const dispatch = useDispatch()
    const token = useSelector(state => state.token.token)
    const postId = useSelector(state => state.postId.postId)
    const comments = useSelector(state => state.comments.comments)
    const posts = useSelector(state => state.posts.posts)
    const actionId = useSelector(state => state.actionId.actionId)

    console.log(token)

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    if (isEmpty(token)) {
        if (page !== 'register') dispatch(changePage('login'))
    }

    let content

    if (page === 'login') {
        content = <Login />
    } else if (page === 'feed') {
        content = <Feed />
    } else if (page === 'addpost') {
        content = <AddPost />
    } else if (page === 'logout') {
        dispatch(changeToken({}))
    } else if (page === 'register'){
        content = <Register />
    } else if (page === 'postcomments'){
        content = <PostComments postId={postId} comments={comments} posts={posts}/>
    } else if (page === 'post'){
        console.log(postId)
        content = <Post postId={postId} />
    } else if (page === 'actions'){
        content = <Action />
    } else if (page === 'actionId'){
        content = <ActionResources actionId={actionId} />
    } else if (page === 'search'){
        content = <Search />
    } 

    return (
        <View style={styles.container}>
            {!isEmpty(token) && page !== 'actions' && page !== 'actionId' ? <Button title="Take Action" onPress={() => dispatch(changePage('actions'))} /> : null}
            {content}
            <View style={styles.nav}>
                <Text onPress={() => dispatch(changePage('feed'))}>Feed</Text>
                <Text onPress={() => dispatch(changePage('addpost'))}>Add Post</Text>
                <Text onPress={() => dispatch(changePage('search'))}>Search</Text>
                <Text onPress={() => dispatch(changePage('logout'))}>Logout</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    position:"sticky",
    bottom:0,
    align:"stretch",
    flex:1,
    justifyContent:"space-around",
    backgroundColor:"white",
    zIndex:2,
    borderTopWidth:1
  }
});