import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TopNavigation } from '@/components';
import { APP_SCREEN } from '@/configs';
import ProductDetailScreen from '@/screens/productDetail';
import ProductsScreen from '@/screens/products';

const Stack = createStackNavigator();

const ProductsNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName={APP_SCREEN.PRODUCTS}
    screenOptions={{
      header: (props) => <TopNavigation title={APP_SCREEN.PRODUCTS} {...props} />,
    }}
  >
    <Stack.Screen name={APP_SCREEN.PRODUCTS} component={ProductsScreen} />
    <Stack.Screen name={APP_SCREEN.PRODUCT_DETAIL} component={ProductDetailScreen} />
  </Stack.Navigator>
);

export default ProductsNavigator;
