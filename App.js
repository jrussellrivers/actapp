import React from 'react';
import Page from "./Page"
import store from './app/store'
import {Provider} from 'react-redux'

export default function App() {

  // const page = useSelector(state => state.page)
  // const dispatch = useDispatch()
  // const token = useSelector(state => state.token.token)

  // if (token===undefined) {
  //   dispatch(changePage('login'))
  // } else {
  //   dispatch(changePage('feed'))
  // }

  // let content

  // if (page === 'login') {
  //   content = <Login />
  // } else if (page === 'feed') {
  //   content = <Feed />
  // }

  return (
    <div className="App">
      <Provider store={store}>
        <Page />
        {/* <View style={styles.container}>
          {content}
          <View style={styles.nav}>
            <Text onPress={() => dispatch(changePage('feed'))}>Feed</Text>
            <Text onPress={() => dispatch(changePage('addpost'))}>Add Post</Text>
            <Text onPress={() => dispatch(changePage('login'))}>Login</Text>
          </View>
        </View> */}
     </Provider>
    </div>
  );
}