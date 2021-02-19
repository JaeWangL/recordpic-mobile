import React, { useCallback, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View, TouchableOpacity } from 'react-native';
import FastImage, { ImageStyle, OnLoadEvent } from 'react-native-fast-image';
import { PhotoPreviewDto } from '@/dtos';
import { isEven } from '@/utils';
import styles from './styles';

interface IPhotoItemProps {
  index: number;
  item: PhotoPreviewDto;
  handlePhotoPress: (index: number, photoUrl: string) => void;
  viewportWidth: number;
}

const PhotoItem = (props: IPhotoItemProps): React.ReactElement => {
  const { index, item, handlePhotoPress, viewportWidth } = props;
  const [calcImgHeight, setCalcImgHeight] = useState<number>(0);

  const getImageStyle = useCallback((): ImageStyle => {
    return { width: viewportWidth * 0.85, height: calcImgHeight };
  }, [calcImgHeight]);

  const onImageLoad = useCallback((event: OnLoadEvent): void => {
    setCalcImgHeight((event.nativeEvent.height / event.nativeEvent.width) * viewportWidth * 0.85);
  }, []);

  const onPhotoPress = useCallback((): void => {
    handlePhotoPress(index, item.photoUrl);
  }, []);

  return (
    <View style={index === 0 ? styles.firstContainer : styles.container}>
      <TouchableOpacity onPress={onPhotoPress}>
        <FastImage
          style={[getImageStyle(), !isEven(index) ? styles.photoRight : undefined]}
          source={{
            uri: item.photoUrl,
            priority: FastImage.priority.normal,
          }}
          onLoad={onImageLoad}
        />
      </TouchableOpacity>
      <Text style={styles.titleLabel}>{item.title}</Text>
      <Text style={styles.descLabel}>{item.description}</Text>
    </View>
  );
};

export default React.memo(PhotoItem, IsEqual);
