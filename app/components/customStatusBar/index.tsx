import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

export interface ICustomStatusBarProps extends StatusBarProps {
  darkBackground?: boolean;
}

const CustomStatusBar = (props: ICustomStatusBarProps): React.ReactElement => {
  const { darkBackground, ...statusProps } = props;

  return <StatusBar {...statusProps} barStyle={darkBackground ? 'light-content' : 'dark-content'} animated />;
};

export default React.memo(CustomStatusBar);
