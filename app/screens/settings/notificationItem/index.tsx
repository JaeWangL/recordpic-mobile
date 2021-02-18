import Moment from 'moment';
import React, { useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import { NotificationPreviewDto, NotificationType } from '@/dtos';
import { translate } from '@/i18n';
import styles from './styles';

interface INotificationItemProps {
  item: NotificationPreviewDto;
  handleItemPress: (item: NotificationPreviewDto) => void;
}

const NotificationItem = (props: INotificationItemProps): React.ReactElement => {
  const { handleItemPress, item } = props;

  const getTextByType = useCallback((type: NotificationType): string => {
    if (type === NotificationType.DeleteMember) {
      return translate('settings.deleteMember');
    }
    if (type === NotificationType.CreateMoment) {
      return translate('settings.createMoment');
    }
    if (type === NotificationType.UpdateMoment) {
      return translate('settings.updateMoment');
    }
    if (type === NotificationType.CreateComment) {
      return translate('settings.createComment');
    }

    return translate('settings.createMember');
  }, []);

  const onItemClick = useCallback(() => {
    handleItemPress(item);
  }, []);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.95} onPress={onItemClick}>
      <Image style={styles.userImage} source={{ uri: item.memberImageUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.dateLabel}>{Moment(item.createdDate).format('YYYY년 MM월 DD일')}</Text>
        <Text style={styles.textLabel}>
          <Text style={styles.nameLabel}>{`${item.memberName}님`}</Text>
          {getTextByType(item.type)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(NotificationItem, IsEqual);
