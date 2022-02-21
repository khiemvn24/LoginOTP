import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthenticationScreen} from './src/AuthenticationScreen';
import {HomeScreen} from './src/HomeScreen';
import {InputOTPScreen} from './src/InputOTPScreen';
// import { AuthContext } from './src/components/context';

const Stack = createNativeStackNavigator();

const StackAuth = createNativeStackNavigator();

const StackMain = createNativeStackNavigator();

function App(props) {
  
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  // const initialLoginState = {
  //   isLoading: true,
  //   userOTP: null,
  //   userToken: null,
  // }

  // const loginReducer = (prevState, action) => {
  //   switch(action.type){
  //     case 'RETRIEVE_TOKEN':
  //       return {
  //         ... prevState,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGIN':
  //       return {
  //         ... prevState,
  //         userOTP: action.id,
  //         userToken: action.token,
  //         isLoading: false,
  //       };
  //     case 'LOGOUT':
  //       return {
  //         ... prevState,
  //         userOTP: null,
  //         userToken: null,
  //         isLoading: false,
  //       };
  //   }
  // }; 

  // const [loginState, dispatch]= React.useReducer(loginReducer, initialLoginState);

  // const authContext = React.useMemo(() => ({
  //   signIn: (userOTP) => {
  //     // setUserToken('khiem');
  //     // setIsLoading(false);
  //     let userToken;
  //     userOTP = null;
  //     if(userOTP == 'user'){
  //       userToken = 'khiem';
  //     }
  //     dispatch({type:'LOGIN', id: userOTP, token: userToken});
  //   },
  //   signOut: () => {
  //     // setUserToken(null);
  //     // setIsLoading(false);
  //     dispatch({type:'LOGOUT'});
  //   }
  // }), []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     // setIsLoading(false);
  //     dispatch({type:'REGISTER', token: 'khiem'});
  //   }, 1000);
  // }, []);

  // if( isLoading ) {
  //   return(
  //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //       <ActivityIndicator size="large"/>
  //     </View>
  //   );
  // }

  return (
    // <AuthContext.Provider value={authContext}>
    //   <NavigationContainer>
        
    //     {loginState.userToken != null ? (
    //       <StackMain.Navigator>
    //         <StackMain.Screen name="Home" component={HomeScreen} />
    //       </StackMain.Navigator>
    //     ) : (
    //       <StackAuth.Navigator initialRouteName="Authentication">
    //         <StackAuth.Screen
    //           name="Authentication"
    //           component={AuthenticationScreen}
    //           options={{
    //             title: 'Nhận mã xác nhận',
    //             headerTitleAlign: 'center',
    //             headerTitleStyle: {fontSize: 18},
    //             headerStyle: {
    //               backgroundColor: '#EE0033',
    //             },
    //             headerTintColor: '#ffff',
    //           }}
    //         />
    //         <StackAuth.Screen
    //           name="InputOTP"
    //           component={InputOTPScreen}
    //           options={{
    //             title: 'Nhập mã xác nhận',
    //             headerTitleAlign: 'center',
    //             headerTitleStyle: {fontSize: 18},
    //             headerStyle: {
    //               backgroundColor: '#EE0033',
    //             },
    //             headerTintColor: '#ffff',
    //           }}
    //         />
    //       </StackAuth.Navigator>
    //     )}
    //   </NavigationContainer>
      
    // </AuthContext.Provider>
    <NavigationContainer>
        
  
      <StackAuth.Navigator initialRouteName="Authentication">
        <StackAuth.Screen
          name="Authentication"
          component={AuthenticationScreen}
          options={{
            title: 'Nhận mã xác nhận',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 18},
            headerStyle: {
              backgroundColor: '#EE0033',
            },
            headerTintColor: '#ffff',
          }}
        />
        <StackAuth.Screen
          name="InputOTP"
          component={InputOTPScreen}
          options={{
            title: 'Nhập mã xác nhận',
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 18},
            headerStyle: {
              backgroundColor: '#EE0033',
            },
            headerTintColor: '#ffff',
          }}
        />
         <StackAuth.Screen name="Home"
         component={HomeScreen}
         options={{
          title: 'Home',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 18},
          headerStyle: {
            backgroundColor: '#EE0033',
          },
          headerTintColor: '#ffff',
        }}
         />
      </StackAuth.Navigator>
  </NavigationContainer>
  );
}

export default App;
