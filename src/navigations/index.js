import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

export const AppNavigationContainter = () => {
    const token = useSelector(state => state.Reducers.authToken)
    console.log(token);
    return (
      <NavigationContainer>{token === null ? <AuthNavigation /> : <MainNavigation />}</NavigationContainer>
    );
  };