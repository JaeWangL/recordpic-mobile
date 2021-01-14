import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Text, View } from 'react-native-ui-lib';
import { RootStackParamList, APP_SCREEN } from '@/configs';

const SettingsScreen: React.FC<StackScreenProps<RootStackParamList, APP_SCREEN.SETTINGS>> = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default React.memo(SettingsScreen, isEqual);
