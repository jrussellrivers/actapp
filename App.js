import React from 'react';
import {Feed} from "./features/feed/Feed"
import { StyleSheet, Text, View, Linking } from 'react-native';
import store from './app/store'
import {Provider, useSelector} from 'react-redux'
import Login from './features/login/Login'
import {useRoutes} from 'hookrouter';
import Register from './features/register/Register'

const routes = {
  "/feed": () => <Feed />,
  "/login": () => <Login />,
  "/register": () => <Register />
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