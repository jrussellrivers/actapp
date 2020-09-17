import React from 'react';
import {Feed} from "./features/feed/Feed"
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import {useSelector,useDispatch} from 'react-redux'
import Login from './features/login/Login'
import Register from './features/register/Register'
import AddPost from './features/posts/AddPost'
import Action from './features/actions/Actions'
import ActionResources from './features/actions/ActionResources'
import {changePage} from './features/pageSlice'
import {changeToken} from './features/login/tokenSlice'
import {changeUserStatus} from './features/user/userSlice'
import Post from './features/posts/Post'
import PostComments from './features/posts/PostComments'
import Profile from './features/user/Profile'
import Search from './features/Search'
import Survey from './features/survey/Survey'
import ProfilePic from './features/user/ProfilePic'
import ChangeProfilePic from './features/user/ChangeProfilePic'
import ChangeUserInfo from './features/user/ChangeUserInfo'
import Icon from 'react-native-vector-icons/AntDesign'
import {fetchProfileById} from './features/user/profileByIdSlice'
import { changeStatus } from './features/posts/postsSlice';
import Notifications from './features/user/Notifications'
import Menu from './features/Menu'

let width = Dimensions.get('window').width; //full width

export default function App() {

    const page = useSelector(state => state.page.pageName)
    const dispatch = useDispatch()
    const token = useSelector(state => state.token.token)
    const postId = useSelector(state => state.postId.postId)
    const comments = useSelector(state => state.comments.comments)
    const posts = useSelector(state => state.posts.posts)
    const actionId = useSelector(state => state.actionId.actionId)
    const user = useSelector(state => state.user.user)

    const isEmpty = (obj) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    if (isEmpty(token)) {
        if (page !== 'register' && page !== 'survey' && page !== 'profilepic') dispatch(changePage('login'))
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
        dispatch(changeUserStatus('idle'))
    } else if (page === 'register'){
        content = <Register />
    } else if (page === 'postcomments'){
        content = <PostComments postId={postId} comments={comments} posts={posts}/>
    } else if (page === 'post'){
        content = <Post />
    } else if (page === 'actions'){
        content = <Action />
    } else if (page === 'actionId'){
        content = <ActionResources actionId={actionId} />
    } else if (page === 'profile'){
        content = <Profile />
    } else if (page === 'search'){
        content = <Search />
    } else if (page === 'survey'){
        content = <Survey />
    } else if (page === 'profilepic'){
        content = <ProfilePic />
    } else if (page === 'changeprofilepic'){
        content = <ChangeProfilePic />
    } else if (page === 'changeuserinfo'){
        content = <ChangeUserInfo user={user}/>
    } else if (page === 'notifications'){
        content = <Notifications />
    } else if (page === 'menu'){
        content = <Menu />
    }

    return (
        <View style={styles.container}>
            <View style={styles.fixed}>
                {page !== 'login' ? 
                    <View style={styles.header}>
                        <Text style={styles.headerText}><Text style={styles.green}>act</Text>app</Text>
                    </View>
                : null }
                {!isEmpty(token) ? <Icon name="menuunfold" size={30} style={styles.menu} onPress={() => dispatch(changePage('menu'))}/> : null }
                {!isEmpty(token) && page !== 'actions' && page !== 'actionId' ? <View style={styles.actionButton}><TouchableOpacity style={styles.button} onPress={() => dispatch(changePage('actions'))} ><Text style={{fontWeight: 'bold', color:'rgb(55,182,53)'}}>TAKE ACTION</Text></TouchableOpacity></View> : null}
            </View>
            <View style={styles.main}>
                {content}
            </View>
            {!isEmpty(token) ? 
            <View style={styles.nav}>
                <Icon name="database" size={30} onPress={() => {
                    dispatch(changeStatus('idle'))
                    dispatch(changePage('feed'))
                }} />
                <Icon name="search1" size={30} onPress={() => dispatch(changePage('search'))} />
                <Icon name="plus" size={30} onPress={() => dispatch(changePage('addpost'))} />
                <Icon name="hearto" size={30} onPress={() => dispatch(changePage('notifications'))} />
                <Icon name="user" size={30} onPress={() => {
                    dispatch(fetchProfileById(user.id))
                    dispatch(changePage('profile'))
                }} />
                {/* <Icon name="logout" size={30} onPress={() => dispatch(changePage('logout'))} /> */}
            </View>
            : null }
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'hidden'
  },
  nav: {
    position:"fixed",
    bottom:0,
    width:width,
    flex:1,
    flexDirection:'row',
    justifyContent:"space-around",
    backgroundColor:"white",
    zIndex:2,
    borderTopWidth:1,
    padding:7
  },
  header: {
      backgroundColor:'white',
      width:width,
      padding:7,
      flex:1,
      alignItems:'center',
      borderBottomWidth:1,
      borderBottomColor:'#ccc'
  },
  headerText: {
      fontSize:36,
      fontWeight:'bold'
  },
  green: {
      color:'rgb(55,182,53)'
  },
  button: {
    flex:1,
    alignItems:'center',
    padding:14,
    width:width
  },
  fixed: {
      position:'fixed',
      top:0,
      backgroundColor:'white',
      zIndex:2
  },
  menu: {
    position:'absolute',
    top:15,
    right:15
  },
  main: {
      marginTop:105
  },
  row: {
      flex:1,
      flexDirection:'row',
      marginTop:20,
      marginBottom:10,
      width:width,
      overflow:'scroll'
  }
});