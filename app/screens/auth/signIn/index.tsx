import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import isEqual from 'react-fast-compare';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, View } from 'react-native-ui-lib';
import { RootStackParamList, APP_SCREEN } from '@/configs';
import { useUserStore } from '@/hooks';
import { translate } from '@/i18n';

const SignInScreen: React.FC<StackScreenProps<RootStackParamList, APP_SCREEN.SIGN_IN>> = () => {
  const { signIn } = useUserStore();

  const onSignInPress = (): void => {
    signIn({ email: 'test', password: 'test' });
  };

  return (
    <SafeAreaView>
      <View>
        <Text>{translate('common.signIn')}</Text>
        <Button fullWidth label={translate('common.signIn')} onPress={onSignInPress} />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SignInScreen, isEqual);
