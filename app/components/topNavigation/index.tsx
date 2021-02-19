import React, { useCallback } from 'react';
import { StatusBar, TextStyle, Platform, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, ViewProps } from 'react-native-ui-lib';
import { isValidString } from '@/utils';
import styles from './styles';

export interface TopNavigationProps extends ViewProps {
  title?: string;
  leftControl?: React.ReactElement;
  rightControls?: React.ReactElement[];
  darkBackground?: boolean;
}

const TopNavigation = (props: TopNavigationProps): React.ReactElement => {
  const { darkBackground, leftControl, rightControls, style, title, ...restProps } = props;
  const insects = useSafeAreaInsets();

  const getSafeTopStyle = useCallback((): ViewStyle => {
    return {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : insects.top,
      paddingBottom: 12,
    };
  }, []);

  const renderText = (text: string, style: TextStyle): React.ReactElement => {
    return <Text style={style}>{text}</Text>;
  };

  const renderLeftControl = (): React.ReactElement => {
    if (leftControl) {
      return leftControl;
    }

    return <View style={styles.spacing} />;
  };

  const renderRightControls = (): React.ReactElement[] => {
    if (rightControls) {
      return rightControls;
    }

    return [<View key="0" style={styles.spacing} />];
  };

  return (
    <View style={[getSafeTopStyle(), styles.container, style]} {...restProps}>
      <View style={styles.leftControlContainer}>{renderLeftControl()}</View>
      <View style={styles.titleContainer}>
        {/* @ts-ignore */}
        {isValidString(title) && renderText(title, darkBackground ? styles.titleDarkLabel : styles.titleLabel)}
        {/* eslint-disable */}
      </View>
      <View style={styles.rightControlsContainer}>{renderRightControls()}</View>
    </View>
  );
};

export default TopNavigation;
