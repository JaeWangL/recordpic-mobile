import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserStore } from '@/hooks';
import RootNavigator from './root.navigator';
import { navigationRef } from './navigation.service';

const AppContainer: React.FC = () => {
  const { user } = useUserStore();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator user={user.user} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer;
