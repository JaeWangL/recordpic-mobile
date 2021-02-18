import React from 'react';
import IsEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import { translate } from '@/i18n';
import { getBGThumbnail } from '@/utils';
import Divider from '../divider';
import { AlbumTemplate } from './interfaces';
import styles from './styles';

interface IAlbumTemplateItemProps {
  item: AlbumTemplate;
}

const AlbumTemplateItem = (props: IAlbumTemplateItemProps): React.ReactElement => {
  const { item } = props;

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: item.coverColor }]} activeOpacity={0.95}>
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
