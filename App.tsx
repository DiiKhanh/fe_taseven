import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigators/AppRouters';
import Toast from 'react-native-toast-message';

const App = () => {

  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
          <NavigationContainer>
            <AppRouters />
          </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
};

export default App;