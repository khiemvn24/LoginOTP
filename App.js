import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider as StoreProvider } from 'react-redux';
import { AppNavigationContainter } from './src/navigations';
import {store} from './src/store'
function App(props){
  return (
    <StoreProvider store={store}>
      <AppNavigationContainter />
    </StoreProvider>
  //   <NavigationContainer>
        
  
  //     <StackAuth.Navigator initialRouteName="Authentication">
  //       <StackAuth.Screen
  //         name="Authentication"
  //         component={AuthenticationScreen}
  //         options={{
  //           title: 'Nhận mã xác nhận',
  //           headerTitleAlign: 'center',
  //           headerTitleStyle: {fontSize: 18},
  //           headerStyle: {
  //             backgroundColor: '#EE0033',
  //           },
  //           headerTintColor: '#ffff',
  //         }}
  //       />
        
  //        <StackAuth.Screen name="Home"
  //        component={HomeScreen}
  //        options={{
  //         title: 'Home',
  //         headerTitleAlign: 'center',
  //         headerTitleStyle: {fontSize: 18},
  //         headerStyle: {
  //           backgroundColor: '#EE0033',
  //         },
  //         headerTintColor: '#ffff',
  //       }}
  //        />
  //     </StackAuth.Navigator>
  // </NavigationContainer>
  );
}

export default App;
