import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initialTabRoute, APP_SCREEN } from '@/configs';
import SettingsScreen from '@/screens/settings';
import ProductsNavigator from './bottomTabs/products.navigator';

const BottomTab = createBottomTabNavigator();

/* NOTE: Use this for making custom tabbar visibility per screen
const ROOT_ROUTES: string[] = [];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find((route) => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({ route }: any): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};
*/

const MainNavigator: React.FC = () => {
  return (
    <BottomTab.Navigator
      // screenOptions={TabBarVisibleOnRootScreenOptions}
      initialRouteName={initialTabRoute}
      // tabBar={(props) => <HomeBottomNavigation {...props} />}
    >
      <BottomTab.Screen name={APP_SCREEN.TAB_PRODUCTS} component={ProductsNavigator} />
      <BottomTab.Screen name={APP_SCREEN.SETTINGS} component={SettingsScreen} />
    </BottomTab.Navigator>
  );
};

export default MainNavigator;
