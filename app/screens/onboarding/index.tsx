import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { LoaderScreen } from 'react-native-ui-lib';
import { RootStackParamList, APP_SCREEN } from '@/configs';
import { useAlbumStore } from '@/hooks';

const OnboardingScreen = (props: DrawerScreenProps<RootStackParamList, APP_SCREEN.ON_BOARDING>): React.ReactElement => {
  const { getAlbums } = useAlbumStore();

  useEffect(() => {
    getAlbums();
  }, []);

  return <LoaderScreen />;
};

export default React.memo(OnboardingScreen, isEqual);
