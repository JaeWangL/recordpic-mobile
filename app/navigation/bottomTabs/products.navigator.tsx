import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { APP_SCREEN } from '@/configs';
import ProductDetailScreen from '@/screens/productDetail';
import ProductsScreen from '@/screens/products';

const Stack = createStackNavigator();

const ProductsNavigator: React.FC = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={APP_SCREEN.PRODUCTS} component={ProductsScreen} />
    <Stack.Screen name={APP_SCREEN.PRODUCT_DETAIL} component={ProductDetailScreen} />
  </Stack.Navigator>
);

export default ProductsNavigator;
