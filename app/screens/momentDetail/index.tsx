import { DrawerScreenProps } from '@react-navigation/drawer';
import Moment from 'moment';
import React, { useCallback, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { Alert, Dimensions, ImageBackground, FlatList, ListRenderItemInfo } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Feather';
import { Text, View } from 'react-native-ui-lib';
import { CustomLoading, TopNavigation, TopNavigationText } from '@/components';
import { RootStackParamList, APP_SCREEN } from '@/configs';
import { DeleteMomentRequest, PhotoPreviewDto } from '@/dtos';
import { useMomentStore, usePhotosPreviewFetch, useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { deleteMomentAsync } from '@/services';
import { getBGImage } from '@/utils';
import PhotoItem from './photoItem';
import styles from './styles';

const { width: viewportWidth } = Dimensions.get('window');
const keyExtractor = (item: PhotoPreviewDto) => item.id.toString();

const MomentDetailScreen = (
  props: DrawerScreenProps<RootStackParamList, APP_SCREEN.MOMENT_DETAIL>,
): React.ReactElement => {
  const { navigation, route } = props;
  const { member, currentMoment } = route.params;
  const { changeCurrentPhoto } = useMomentStore();
  const { user } = useUserStore();
  const { photos, isLoading } = usePhotosPreviewFetch(currentMoment.id, user.user);
  const menuList = useRef<Menu>(null);
  const photosList = useRef<FlatList>(null);

  const handlePhotoPress = (index: number, photoUrl: string): void => {
    changeCurrentPhoto({ index });
    navigation.navigate(APP_SCREEN.PHOTO_DETAIL, {
      photoUrl,
    });
  };

  const onArrowPress = useCallback((): void => {
    navigation.goBack();
  }, []);

  const onMenuPress = useCallback((): void => {
    if (menuList.current) {
      menuList.current.show();
    }
  }, []);

  const onDeletePresAsync = useCallback((): void => {
    const handleDeleteAsync = async (): Promise<void> => {
      if (!user.user) {
        return;
      }

      const req: DeleteMomentRequest = {
        id: currentMoment.id,
      };
      await deleteMomentAsync(req, user.user.accessToken);

      navigation.goBack();
    };

    Alert.alert(
      '',
      translate('ask.deleteMoment'),
      [
        {
          text: translate('common.no'),
          style: 'cancel',
        },
        { text: translate('common.yes'), onPress: handleDeleteAsync },
      ],
      { cancelable: false },
    );
  }, []);

  const onEditPres = useCallback((): void => {
    navigation.navigate(APP_SCREEN.UPDATE_MOMENT, {
      member,
      currentMoment,
    });
  }, []);

  const renderMenuButton = useCallback(() => {
    return <Icon style={styles.dropdownMenu} name="more-vertical" size={24} onPress={onMenuPress} />;
  }, []);

  const renderLeftControl = useCallback(
    (): React.ReactElement => <TopNavigationText label={translate('photos.cancel')} onPress={onArrowPress} />,
    [],
  );

  const renderListHeader = useCallback((): React.ReactElement => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.dummyContainer} />
        <View>
          <Text style={styles.dateLabel}>{Moment(currentMoment.momentDate).format('YYYY년 MM월 DD일')}</Text>
          <Text style={styles.nameLabel}>{currentMoment.name}</Text>
        </View>
        <Menu style={styles.dropdownMenu} ref={menuList} button={renderMenuButton()}>
          <MenuItem textStyle={styles.dropdownLabel} onPress={onEditPres}>
            {translate('photos.editMoment')}
          </MenuItem>
          <MenuDivider />
          <MenuItem textStyle={styles.dropdownLabel} onPress={onDeletePresAsync}>
            {translate('photos.deleteMoment')}
          </MenuItem>
        </Menu>
      </View>
    );
  }, []);

  const renderPhotoItem = (info: ListRenderItemInfo<PhotoPreviewDto>): React.ReactElement => {
    return (
      <PhotoItem
        index={info.index}
        item={info.item}
        handlePhotoPress={handlePhotoPress}
        viewportWidth={viewportWidth}
      />
    );
  };

  if (!user || isLoading) {
    return <CustomLoading />;
  }
  return (
    <ImageBackground style={styles.container} source={{ uri: getBGImage(member.album.coverColor) }}>
      <TopNavigation title={member.album.name} leftControl={renderLeftControl()} />
      <FlatList
        ref={photosList}
        style={styles.listContainer}
        data={photos}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderListHeader}
        renderItem={renderPhotoItem}
        initialNumToRender={7}
        maxToRenderPerBatch={5}
        windowSize={10}
        /* TODO: Uncomment this
        initialScrollIndex={moment.currentPhotoIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            photosList.current?.scrollToIndex({ index: info.index, animated: false });
          });
        }}
        */
      />
    </ImageBackground>
  );
};

export default React.memo(MomentDetailScreen, isEqual);
