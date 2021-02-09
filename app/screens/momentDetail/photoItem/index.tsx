import React from 'react';
import IsEqual from 'react-fast-compare';
import { Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PhotoPreviewDto } from '@/dtos';
import styles from './styles';

interface IPhotoItemProps {
  index: number;
  item: PhotoPreviewDto;
  handlePhotoPress: (index: number, photoUrl: string) => void;
}

const PhotoItem: React.FC<IPhotoItemProps> = (props: IPhotoItemProps) => {
  const { index, item, handlePhotoPress } = props;

  const onPhotoPress = (): void => {
    handlePhotoPress(index, item.photoUrl);
  };

  return (
    <View style={index === 0 ? styles.firstContainer : styles.container}>
      <TouchableOpacity onPress={onPhotoPress}>
        <FastImage
          style={styles.photoLeft}
          source={{
            uri: item.photoUrl,
            priority: FastImage.priority.normal,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.titleLabel}>{item.title}</Text>
      <Text style={styles.descLabel}>{item.description}</Text>
    </View>
  );
};

export default React.memo(PhotoItem, IsEqual);
