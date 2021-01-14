import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import isEqual from 'react-fast-compare';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FeatureHighlight, Text, View } from 'react-native-ui-lib';
import { RootStackParamList, APP_SCREEN } from '@/configs';
import { useUserStore } from '@/hooks';

const ProductsScreen: React.FC<StackScreenProps<RootStackParamList, APP_SCREEN.PRODUCTS>> = () => {
  const { signOut } = useUserStore();
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [targets, setTargets] = useState<any[]>([]);

  const addTarget = (ref: any): void => {
    if (ref && !targets[0]) {
      setTargets([ref]);
    }
  };

  const onGotItPress = (): void => {
    setShowOverlay(false);
  };

  const onSignOutPress = (): void => {
    signOut({ clearStorage: true });
  };

  const renderHighlighterOverlay = (): React.ReactElement => {
    return (
      <FeatureHighlight
        visible={showOverlay}
        title="Feature Highlighting Test"
        message="Feature Text is detected for target"
        confirmButtonProps={{ label: 'Got It', onPress: onGotItPress }}
        onBackgroundPress={onGotItPress}
        getTarget={() => targets[0]}
      />
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Products</Text>
        <Button label="Sign Out" onPress={onSignOutPress} />
        <View ref={(r) => addTarget(r)}>
          <Text style={{ textAlign: 'right' }}>Feature</Text>
        </View>
      </View>
      {renderHighlighterOverlay()}
    </SafeAreaView>
  );
};

export default React.memo(ProductsScreen, isEqual);
