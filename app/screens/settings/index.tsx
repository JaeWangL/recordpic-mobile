import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import { FlatList, Linking, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import AssignmentPin from '@/assets/icons/assignment24Px.svg';
import ChatPin from '@/assets/icons/chat24Px.svg';
import PersonPin from '@/assets/icons/personPin24Px.svg';
import { CustomLoading, TopNavigation, TopNavigationAction } from '@/components';
import { RootStackParamList, APP_SCREEN } from '@/configs';
import { MomentPreviewDto, NotificationPreviewDto, NotificationType } from '@/dtos';
import { useAlbumStore, useNotificationsPreviewFetch, useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { getMomentPreviewAsync } from '@/services';
import NotificationItem from './notificationItem';
import styles from './styles';

const keyExtractor = (item: NotificationPreviewDto) => item.id.toString();

const SettingsScreen = (props: DrawerScreenProps<RootStackParamList, APP_SCREEN.SETTINGS>): React.ReactElement => {
  const { navigation } = props;
  const { album } = useAlbumStore();
  const { user } = useUserStore();
  const { notifications, isLoading } = useNotificationsPreviewFetch(user.user);

  const handleItemPress = useCallback(async (item: NotificationPreviewDto): Promise<void> => {
    const getMomentByIdAsync = async (momentId: number): Promise<MomentPreviewDto | undefined> => {
      if (!user.user) {
        return undefined;
      }

      return await getMomentPreviewAsync(momentId, user.user.accessToken);
    };

    if (!album.members || !item.albumId) {
      return;
    }
    const toAlbum = album.members.filter((member) => member.album.id === item.albumId);
    if (toAlbum.length === 0) {
      return;
    }

    if (item.type === NotificationType.CreateMember || item.type === NotificationType.DeleteMember) {
      navigation.navigate(APP_SCREEN.UPDATE_ALBUM, {
        member: toAlbum[0],
      });
    } else {
      if (!item.momentId) {
        return;
      }

      const toAlbum = album.members.filter((member) => member.album.id === item.albumId);
      const toMoment = await getMomentByIdAsync(item.momentId);
      if (!toMoment) {
        return;
      }

      navigation.navigate(APP_SCREEN.MOMENT_DETAIL, {
        member: toAlbum[0],
        currentMoment: toMoment,
      });
    }
  }, []);

  const onBackPress = useCallback((): void => {
    navigation.goBack();
  }, []);

  const onProfilePress = useCallback((): void => {
    navigation.navigate(APP_SCREEN.UPDATE_PROFILE);
  }, []);

  const onFeedbackPressAsync = useCallback(async (): Promise<void> => {
    await Linking.openURL('https://forms.gle/4QKeK1XcGUPpiRVM6');
  }, []);

  const onTermsPressAsync = useCallback(async (): Promise<void> => {
    await Linking.openURL('https://recordpic.com/%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80');
  }, []);

  const renderLeftControl = useCallback(
    (): React.ReactElement => <TopNavigationAction iconName="arrow-left" onPress={onBackPress} />,
    [],
  );

  const renderListHeader = useCallback((): React.ReactElement => {
    return <Text style={styles.subTitle}>알림</Text>;
  }, []);

  const renderListFooter = useCallback((): React.ReactElement => {
    return <View style={styles.notificationsContainerFooter} />;
  }, []);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<NotificationPreviewDto>): React.ReactElement => (
      <NotificationItem item={info.item} handleItemPress={handleItemPress} />
    ),
    [],
  );

  if (!user.user || isLoading) {
    return <CustomLoading />;
  }
  return (
    <View flex style={styles.container}>
      <TopNavigation title={translate('settings.header')} leftControl={renderLeftControl()} darkBackground />
      <Image
        style={styles.userImage}
        source={{
          uri: user.user.imageUrl,
        }}
      />
      <Text style={styles.userName}>{user.user.name}</Text>
      <Text style={styles.userEmail}>{user.user.email}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonBorder} onPress={onProfilePress}>
          <PersonPin style={styles.buttonIcon} />
          <Text style={styles.buttonLabel}>{translate('settings.myProfile')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBorder} onPress={onTermsPressAsync}>
          <AssignmentPin style={styles.buttonIcon} />
          <Text style={styles.buttonLabel}>{translate('settings.terms')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBorder} onPress={onFeedbackPressAsync}>
          <ChatPin style={styles.buttonIcon} />
          <Text style={styles.buttonLabel}>{translate('settings.feedback')}</Text>
        </TouchableOpacity>
      </View>
      {renderListHeader()}
      <FlatList
        style={styles.notificationsContainer}
        data={notifications}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={7}
        maxToRenderPerBatch={5}
        windowSize={10}
        ListFooterComponent={renderListFooter}
      />
    </View>
  );
};

export default React.memo(SettingsScreen, IsEqual);
