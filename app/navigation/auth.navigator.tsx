import React from 'react';
import IsEqual from 'react-fast-compare';
import { createStackNavigator } from '@react-navigation/stack';
import { APP_SCREEN } from '@/configs';
import SignIn from '@/screens/auth/signIn';

const Stack = createStackNavigator();

const AuthNavigator = (): React.ReactElement => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name={APP_SCREEN.SIGN_IN} component={SignIn} />
    </Stack.Navigator>
  );
};

export default React.memo(AuthNavigator, IsEqual);
