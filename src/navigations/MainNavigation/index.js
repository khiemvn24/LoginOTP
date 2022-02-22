import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from '../../HomeScreen';

const StackMain = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
        <StackMain.Navigator>
            <StackMain.Screen name="Home" component={HomeScreen} />
          </StackMain.Navigator>
    );
};

export default AuthNavigation;