import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import isEqual from 'react-fast-compare';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View } from 'react-native-ui-lib';
import { RootStackParamList, APP_SCREEN } from '@/configs';
import { useUserStore } from '@/hooks';

const SignInScreen: React.FC<StackScreenProps<RootStackParamList, APP_SCREEN.SIGN_IN>> = () => {
  const { signIn } = useUserStore();

  const onSignInPress = (): void => {
    signIn({ email: 'test', password: 'test' });
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Sign In</Text>
        <Button fullWidth label="Sign In" onPress={onSignInPress} />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SignInScreen, isEqual);
