import * as React from 'react';
import {  View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { Logout } from './store/actions';
export function HomeScreen ({navigation}){ 

  const dispatch = useDispatch();
  const submit =() => {
    dispatch(Logout())
  }
  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          <View>
            <TouchableOpacity style={{
              backgroundColor: '#EE0033'
            }}
            onPress={submit}
            >
              <Text style={{color: '#ffff'}}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      );   
}