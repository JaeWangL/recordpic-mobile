import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Text, TextStyle, View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme, ThemeType } from '@/styles';
import { isValidString } from '@/utils';
import TopNavigationAction from './topNavigationAction';
import styles from './styles';

export interface TopNavigationProps extends ViewProps, StackHeaderProps {
  title: string;
  subtitle?: string;
  leftControl?: React.ReactElement;
  rightControls?: React.ReactElement[];
  theme: ThemeType;
}

const TopNavigation: React.FC<TopNavigationProps> = (props) => {
  const { leftControl, previous, rightControls, style, subtitle, title, ...restProps } = props;

  const renderText = (text: string, style: TextStyle): React.ReactElement => {
    return <Text style={style}>{text}</Text>;
  };

  const renderLeftControl = (): React.ReactElement => {
    if (previous) {
      return <TopNavigationAction iconName="arrow-left" />;
    }
    if (!previous && leftControl) {
      return leftControl;
    }

    return <></>;
  };

  return (
    <SafeAreaView>
      <View style={[styles.container, style]} {...restProps}>
        <View style={styles.leftControlContainer}>{renderLeftControl()}</View>
        <View style={styles.titleContainer}>
          {isValidString(title) && renderText(title, styles.titleLabel)}
          {/* @ts-ignore */}
          {isValidString(subtitle) && renderText(subtitle, styles.subtitleLabel)}
        </View>
        <View style={styles.rightControlsContainer}>{rightControls}</View>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(TopNavigation);
