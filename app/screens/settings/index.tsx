import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Text, View } from 'react-native-ui-lib';
import { RootStackParamList, APP_SCREEN } from '@/configs';

const SettingsScreen: React.FC<DrawerScreenProps<RootStackParamList, APP_SCREEN.SETTINGS>> = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default React.memo(SettingsScreen, isEqual);
