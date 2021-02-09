import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

export interface ICustomStatusBarProps extends StatusBarProps {
  darkBackground?: boolean;
}

const CustomStatusBar: React.FC<ICustomStatusBarProps> = (props) => {
  const { darkBackground, ...statusProps } = props;

  return <StatusBar {...statusProps} barStyle={darkBackground ? 'light-content' : 'dark-content'} animated />;
};

export default React.memo(CustomStatusBar);
