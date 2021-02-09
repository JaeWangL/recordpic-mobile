import React from 'react';
import isEqual from 'react-fast-compare';
import { ImageBackground, ImageBackgroundProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface OverlayImageStyle extends ViewStyle {
  overlayColor?: string;
}

export interface IImageOverlayProps extends ImageBackgroundProps {
  style?: StyleProp<OverlayImageStyle>;
  children?: React.ReactElement;
  useBlur?: boolean;
}

const DEFAULT_OVERLAY_COLOR = 'rgba(0, 0, 0, 0.15)';

const ImageOverlay: React.FC<IImageOverlayProps> = (props) => {
  const { style, children, useBlur, ...imageBackgroundProps } = props;
  const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style);

  const getBlurRadius = (): number => {
    if (useBlur === false) {
      return 0;
    }

    return 20;
  };

  return (
    <ImageBackground
      {...imageBackgroundProps}
      style={imageBackgroundStyle}
      blurRadius={getBlurRadius()}
      /* prettier-ignore */
    >
      <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR }]} />
      {children}
    </ImageBackground>
  );
};

export default React.memo(ImageOverlay, isEqual);
