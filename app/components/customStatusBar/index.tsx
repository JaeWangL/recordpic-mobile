import React from 'react';
import IsEqual from 'react-fast-compare';
import { StatusBar, StatusBarProps } from 'react-native';

export interface ICustomStatusBarProps extends StatusBarProps {
  darkBackground?: boolean;
}

const CustomStatusBar = (props: ICustomStatusBarProps): React.ReactElement => {
  const { darkBackground, ...statusProps } = props;

  return <StatusBar {...statusProps} barStyle={darkBackground ? 'light-content' : 'dark-content'} />;
};

export default React.memo(CustomStatusBar, IsEqual);
