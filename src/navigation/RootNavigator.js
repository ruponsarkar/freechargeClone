import React, {useContext} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/login';
import MainTabNavigator from '.';
import {AuthContext} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const {userToken, loading} = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* <View>
        <Text>RootNavigator {userToken}</Text>
      </View> */}
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userToken ? (
          <Stack.Screen name="App" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
