import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import isEqual from 'react-fast-compare';
import { Text, View } from 'react-native-ui-lib';
import { RootStackParamList, APP_SCREEN } from '@/configs';

const ProductDetailScreen: React.FC<StackScreenProps<RootStackParamList, APP_SCREEN.PRODUCT_DETAIL>> = () => {
  return (
    <View>
      <Text>Product Detail</Text>
    </View>
  );
};

export default React.memo(ProductDetailScreen, isEqual);
