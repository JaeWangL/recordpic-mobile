import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CustomDrawer } from '@/components';
import { APP_SCREEN } from '@/configs';
import CreateAlbumScreen from '@/screens/createAlbum';
import CreateMomentScreen from '@/screens/createMoment';
import IntroScreen from '@/screens/intro';
import MomentDetailScreen from '@/screens/momentDetail';
import MomentsScreen from '@/screens/moments';
import OnboardingScreen from '@/screens/onboarding';
import PhotoDetailScreen from '@/screens/photoDetail';
import SettingsScreen from '@/screens/settings';

const Drawer = createDrawerNavigator();
const MainNavigator = (): React.ReactElement => {
  const renderCustomDrawer = (props: DrawerContentComponentProps): React.ReactElement => {
    const { navigation } = props;

    return <CustomDrawer navigation={navigation} />;
  };

  return (
    <Drawer.Navigator
      drawerContent={renderCustomDrawer}
      drawerStyle={styles.drawer}
      initialRouteName={APP_SCREEN.ON_BOARDING}
    >
      <Drawer.Screen name={APP_SCREEN.ON_BOARDING} component={OnboardingScreen} />
      <Drawer.Screen name={APP_SCREEN.CREATE_ALBUM} component={CreateAlbumScreen} />
      <Drawer.Screen name={APP_SCREEN.CREATE_MOMENT} component={CreateMomentScreen} />
      <Drawer.Screen name={APP_SCREEN.INTRO} component={IntroScreen} />
      <Drawer.Screen name={APP_SCREEN.MOMENTS} component={MomentsScreen} />
      <Drawer.Screen name={APP_SCREEN.MOMENT_DETAIL} component={MomentDetailScreen} />
      <Drawer.Screen name={APP_SCREEN.PHOTO_DETAIL} component={PhotoDetailScreen} />
      <Drawer.Screen name={APP_SCREEN.SETTINGS} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    width: '100%',
  },
});

export default MainNavigator;
