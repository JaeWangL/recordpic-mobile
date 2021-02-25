import Moment from 'moment';
import React, { useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import { CommentPreviewDto, UserDto } from '@/dtos';
import { translate } from '@/i18n';
import styles from './styles';

interface ICommentItemProps {
  user?: UserDto;
  item: CommentPreviewDto;
  handleDeletePress: (item: CommentPreviewDto) => void;
}

function CommentItem(props: ICommentItemProps): React.ReactElement {
  const { item, handleDeletePress, user } = props;

  const onDeletePress = useCallback((): void => {
    handleDeletePress(item);
  }, []);

  const renderDeleteLabel = useCallback((): React.ReactElement => {
    if (user && user.id === item.userId) {
      return (
        <Text style={styles.deleteLabel} onPress={onDeletePress}>
          {translate('common.delete')}
        </Text>
      );
    }

    return <></>;
  }, []);

  return (
    <View style={styles.container}>
      <FastImage style={styles.userImage} source={{ uri: item.userImageUrl }} />
      <View style={styles.textContainer}>
        <View style={styles.topOutContainer}>
          <View style={styles.topInContainer}>
            <Text style={styles.nameLabel}>{item.userName}</Text>
            <Text style={styles.dateLabel}>{Moment(item.updatedAt).format('YYYY년 MM월 DD일')}</Text>
          </View>
          {renderDeleteLabel()}
        </View>
        <Text style={styles.textLabel}>{item.text}</Text>
      </View>
    </View>
  );
}

CommentItem.defaultProps = {
  user: undefined,
};

export default React.memo(CommentItem, IsEqual);
