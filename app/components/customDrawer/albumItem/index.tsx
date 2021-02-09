import moment from 'moment';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import { getBGThumbnail } from '@/utils';
import { MemberWithAlbumDto } from '@/dtos';
import { translate } from '@/i18n';
import Divider from '../../divider';
import styles from './styles';

interface IAlbumItemProps {
  index: number;
  item: MemberWithAlbumDto;
  handleCreatePress: () => void;
  handleAlbumPress: (index: number, item: MemberWithAlbumDto) => void;
}

const AlbumItem: React.FC<IAlbumItemProps> = (props: IAlbumItemProps) => {
  const { handleAlbumPress, handleCreatePress, index, item } = props;

  const onAlbumPress = (): void => {
    handleAlbumPress(index, item);
  };

  const onCreatePress = (): void => {
    handleCreatePress();
  };

  if (item.rank === 999) {
    return (
      <TouchableOpacity style={styles.createContainer} activeOpacity={0.95} onPress={onCreatePress}>
        <Text style={styles.createTitle}>{translate('albums.createNewTitle')}</Text>
        <Text style={styles.createDesc}>{translate('albums.createNewSub')}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: item.album.coverColor }]}
      activeOpacity={0.95}
      onPress={onAlbumPress}
    >
      <Divider style={styles.divider} />
      <View flex>
        <Text style={styles.titleLabel}>{item.album.name}</Text>
        <Text style={styles.descLabel}>{item.album.description}</Text>
        <FastImage style={styles.albumImage} source={{ uri: getBGThumbnail(item.album.coverColor) }} />
        <Text style={styles.dateLabel}>{`Since ${moment(item.album.createdDate).format('YYYY')}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlbumItem;
