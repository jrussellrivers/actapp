import React from 'react';
import {Feed} from "./features/feed/Feed"
import { StyleSheet, Text, View} from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import Login from './features/login/Login'
import Register from './features/register/Register'
import AddPost from './features/posts/AddPost'
import {changePage} from './features/pageSlice'
import {changeToken} from './features/login/tokenSlice'

export default function App() {

    const page = useSelector(state => state.page.pageName)
    const dispatch = useDispatch()
    const token = useSelector(state => state.token.token)
    console.log(token)

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    if (isEmpty(token)) {
        dispatch(changePage('login'))
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
    }

    return (
        <View style={styles.container}>
            {content}
            <View style={styles.nav}>
                <Text onPress={() => dispatch(changePage('feed'))}>Feed</Text>
                <Text onPress={() => dispatch(changePage('addpost'))}>Add Post</Text>
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