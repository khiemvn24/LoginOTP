import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthenticationScreen } from '../../AuthenticationScreen';

const StackAuth = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
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
          </StackAuth.Navigator>
    );
};

export default AuthNavigation;