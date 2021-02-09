import React from 'react';
import IsEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import { Divider } from '@/components';
import { translate } from '@/i18n';
import { getBGThumbnail } from '@/utils';
import { AlbumTemplate } from '../interfaces';
import styles from './styles';

interface IAlbumTemplateItemProps {
  item: AlbumTemplate;
  handleAlbumPress: (item: AlbumTemplate) => void;
}

const AlbumTemplateItem: React.FC<IAlbumTemplateItemProps> = (props: IAlbumTemplateItemProps) => {
  const { handleAlbumPress, item } = props;

  const onAlbumPress = (): void => {
    handleAlbumPress(item);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: item.coverColor }]}
      activeOpacity={0.95}
      onPress={onAlbumPress}
    >
      <Divider style={styles.divider} />
      <View flex>
        <Text style={styles.titleLabel}>{translate('createAlbum.albumName')}</Text>
        <Text style={styles.descLabel}>{translate('createAlbum.albumDesc')}</Text>
        <FastImage style={styles.albumImage} source={{ uri: getBGThumbnail(item.coverColor) }} />
        <Text style={styles.dateLabel}>{translate('createAlbum.albumDate')}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AlbumTemplateItem, IsEqual);
