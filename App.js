import React from 'react';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
const store = ConfigureStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
   
   );
  }
}