import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import PersonalSetupScreen from '../screens/PersonalSetupScreen';
import SharedSetupScreen from '../screens/SharedSetupScreen';

export type RootStackParamList = {
  Welcome: undefined;
  PersonalSetup: undefined;
  SharedSetup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PersonalSetup" component={PersonalSetupScreen} />
      <Stack.Screen name="SharedSetup" component={SharedSetupScreen} />
    </Stack.Navigator>
  );
}
