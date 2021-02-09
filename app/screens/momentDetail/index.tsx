import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Text, View } from 'react-native-ui-lib';
import { RootStackParamList, APP_SCREEN } from '@/configs';

const MomentDetailScreen: React.FC<DrawerScreenProps<RootStackParamList, APP_SCREEN.MOMENT_DETAIL>> = () => {
  return (
    <View>
      <Text>Moment Detail</Text>
    </View>
  );
};

export default React.memo(MomentDetailScreen, isEqual);
