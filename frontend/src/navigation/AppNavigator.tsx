import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthWelcomeScreen from '../screens/AuthWelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PersonalSetupScreen from '../screens/PersonalSetupScreen';
import SharedSetupScreen from '../screens/SharedSetupScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export type RootStackParamList = {
  AuthWelcome: undefined;
  Welcome: undefined;
  PersonalSetup: undefined;
  SharedSetup: undefined;
  SignUp: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

type AppNavigatorProps = {
  isLoggedIn: boolean;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator({ isLoggedIn }: AppNavigatorProps) {
  return (
    <Stack.Navigator
      key={isLoggedIn ? 'user' : 'guest'}
      initialRouteName={isLoggedIn ? 'Welcome' : 'AuthWelcome'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="PersonalSetup" component={PersonalSetupScreen} />
          <Stack.Screen name="SharedSetup" component={SharedSetupScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthWelcome" component={AuthWelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
