import moment from 'moment';
import React from 'react';
import isEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import { MomentPreviewDto } from '@/dtos';
import styles from './styles';

interface IMomentItemProps {
  index: number;
  item: MomentPreviewDto;
  isLastItem: boolean;
  handleMomentPress: (index: number, item: MomentPreviewDto) => void;
}

const MomentItem = (props: IMomentItemProps): React.ReactElement => {
  const { handleMomentPress, index, isLastItem, item } = props;

  const onMomentPress = (): void => {
    handleMomentPress(index, item);
  };

  return (
    <TouchableOpacity
      style={isLastItem ? styles.lastItemContainer : styles.container}
      activeOpacity={0.95}
      onPress={onMomentPress}
      /* prettier-ignore */
    >
      <FastImage style={styles.coverImageContainer} source={{ uri: item.coverUrl }}>
        <Text style={styles.countLabel}>{`+${item.photoCount}`}</Text>
      </FastImage>
      <View style={styles.detailsContainer}>
        <Text style={styles.dateLabel}>{moment(item.momentDate).format('YYYY년 MM월 DD일')}</Text>
        <Text style={styles.titleLabel} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MomentItem, isEqual);
