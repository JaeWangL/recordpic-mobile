import moment from 'moment';
import React from 'react';
import isEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { ImageOverlay } from '@/components';
import { MomentPreviewDto } from '@/dtos';
import styles from './styles';

interface IMomentItemProps {
  index: number;
  item: MomentPreviewDto;
  isLastItem: boolean;
  handleMomentPress: (index: number, item: MomentPreviewDto) => void;
}

const MomentItem: React.FC<IMomentItemProps> = (props: IMomentItemProps) => {
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
      <ImageOverlay style={styles.coverImageContainer} source={{ uri: item.coverUrl }} useBlur={false}>
        <Text style={styles.countLabel}>{`+${item.photoCount}`}</Text>
      </ImageOverlay>
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
