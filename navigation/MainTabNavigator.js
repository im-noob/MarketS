import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Settings from '../screens/SettingsScreen';
import AppNavigator from './AppNavigator';
import MainScreen from '../screens/Auth/MainScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'home-outline'}
    />
  ),
};

const LogOuStack = createBottomTabNavigator({
  Auth:{
    screen:MainScreen,
  }
});

const SettingsStack = createStackNavigator({
  Settings:{
    screen:Settings,
  },
  AuthS:{
    screen:LogOuStack,
  },
});

SettingsStack.navigationOptions = {
  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'account-box-outline'}
    />
  ),
};

export default createBottomTabNavigator(
  {
   
    HomeStack, SettingsStack,
  },
  {
    tabBarOptions:{
      showLabel: false,
    }, 
  }
);
