import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import IsEqual from 'react-fast-compare';
import { APP_SCREEN, RootStackParamList } from '@/configs';
import { UserDto } from '@/dtos';
import AuthNavigator from './auth.navigator';
import MainNavigator from './main.navigator';

const RootStack = createStackNavigator<RootStackParamList>();

interface IRootNavigatorProps {
  user?: UserDto;
}

const RootNavigator = (props: IRootNavigatorProps): React.ReactElement => {
  const { user } = props;

  return (
    <RootStack.Navigator headerMode="none">
      {!user ? (
        <RootStack.Screen
          options={{ animationTypeForReplace: 'pop', gestureEnabled: false }}
          name={APP_SCREEN.AUTH}
          component={AuthNavigator}
        />
      ) : (
        <RootStack.Screen options={{ gestureEnabled: false }} name={APP_SCREEN.MAIN} component={MainNavigator} />
      )}
    </RootStack.Navigator>
  );
};

RootNavigator.defaultProps = {
  user: undefined,
};

export default React.memo(RootNavigator, IsEqual);
