import React from 'react';
import {Feed} from "./features/feed/Feed"
import { StyleSheet, Text, View, Linking } from 'react-native';
import store from './app/store'
import {Provider, useSelector} from 'react-redux'
import Login from './features/login/Login'
import {useRoutes} from 'hookrouter';
import Register from './features/register/Register'
import PhotoRoll from './features/posts/PhotoRoll'
import AddPost from './features/posts/AddPost'


// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <Provider store={store}>
//       <View style={styles.container}>
//         <NavigationContainer>
//           <Stack.Navigator>
//             <Stack.Screen name="Login" component={Login} />
//             <Stack.Screen name="Feed" component={Feed} />
//             <Stack.Screen name="Register" component={Register} />
//             <Stack.Screen name="PhotoRoll" component={PhotoRoll} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </View>
//     </Provider>
//   );
// }

const routes = {
  "/feed": () => <Feed />,
  "/login": () => <Login />,
  "/register": () => <Register />,
  "/addpost": () => <AddPost />
};

export default function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <Provider store={store}>
        <View style={styles.container}>
          {routeResult}
          <View style={styles.nav}>
            <Text onPress={() => Linking.openURL('/feed')}>Feed</Text>
            <Text onPress={() => Linking.openURL('/addpost')}>Add Post</Text>
            <Text onPress={() => Linking.openURL('/login')}>Login</Text>
          </View>
        </View>
     </Provider>
    </div>
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