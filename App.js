import React from 'react';
import Page from "./Page"
import store from './app/store'
import {Provider} from 'react-redux'

export default function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Page />
     </Provider>
    </div>
  );
}