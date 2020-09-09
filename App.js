import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Feed} from "./features/feed/Feed"
import { StyleSheet, Text, View } from 'react-native';
import store from './app/store'
import {Provider, useSelector} from 'react-redux'
// import { useSelector } from 'react-redux'


export default function App() {
  // const store = useSelector(state => state)

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>This is very, very dope.</Text>
        <Feed />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});