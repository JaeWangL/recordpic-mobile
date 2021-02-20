import Clipboard from '@react-native-community/clipboard';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, KeyboardAwareScrollView, Text, TextField, View } from 'react-native-ui-lib';
import { AlbumTemplateItem, CustomLoading, TopNavigation, TopNavigationAction } from '@/components';
import { initAlbumTemplate, AlbumTemplate } from '@/components/albumTemplateItem/interfaces';
import { APP_SCREEN, RootStackParamList } from '@/configs';
import { DeleteMemberRequest, MemberPreviewDto, UpdateAlbumRequest } from '@/dtos';
import { useAlbumStore, useMembersPreviewFetch, useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { deleteMemberAsync, updateAlbumAsync } from '@/services';
import { placeholderColor } from '@/styles';
import { isValidAlbumDesc, isValidAlbumName, getBGIndex, getBGThumbnail } from '@/utils';
import { initParamsType, UpdateAlbumParamsType } from './interfaces';
// import MemberItem from './memberItem';
import styles from './styles';

const { width: viewportWidth } = Dimensions.get('window');

const keyExtractor = (item: MemberPreviewDto) => item.id.toString();

const UpdateAlbumScreen = (
  props: DrawerScreenProps<RootStackParamList, APP_SCREEN.UPDATE_ALBUM>,
): React.ReactElement => {
  const { navigation, route } = props;
  const { member } = route.params;
  const { getAlbums } = useAlbumStore();
  const { user } = useUserStore();
  const { members, isLoading, doRefresh } = useMembersPreviewFetch(member.album.id, user.user);
  const [params, setParams] = useState<UpdateAlbumParamsType>(initParamsType);
  const [isBusy, setBusy] = useState<boolean>(false);

  useEffect(() => {
    setBusy(true);
    try {
      setParams({
        name: member.album.name,
        description: member.album.description,
        coverColor: member.album.coverColor,
        coverUrl: member.album.coverUrl,
      });
    } finally {
      setBusy(false);
    }
  }, [member.album]);

  const handleDeleteMemberPressAsync = useCallback(async (item: MemberPreviewDto): Promise<void> => {
    const handleDeleteAsync = async (isExpel: boolean): Promise<void> => {
      if (!user.user) {
        return;
      }

      setBusy(true);
      try {
        const req: DeleteMemberRequest = {
          id: item.id,
        };
        const res = await deleteMemberAsync(req, user.user.accessToken);
        if (res) {
          if (isExpel) {
            doRefresh();

            Alert.alert('', translate('alert.memberExpelled'));
          } else {
            getAlbums();
          }
        }
      } catch (e) {
        Alert.alert('', translate('error.server'));
      } finally {
        setBusy(false);
      }
    };

    if (!user.user) {
      return;
    }

    let isExpel = true;
    let desc = translate('ask.expelMember');
    if (user.user.id === item.userId) {
      desc = translate('ask.leaveAlbum');
      isExpel = false;
    }
    Alert.alert(
      '',
      desc,
      [
        {
          text: translate('common.no'),
          style: 'cancel',
        },
        { text: translate('common.yes'), onPress: () => handleDeleteAsync(isExpel) },
      ],
      { cancelable: false },
    );
  }, []);

  const onClosePress = useCallback((): void => {
    navigation.goBack();
  }, []);

  const onCodePress = useCallback((): void => {
    Clipboard.setString(member.album.inviteCode);

    Alert.alert('', translate('alert.codeCopied'));
  }, []);

  const onDescChange = useCallback(
    (text: string): void => {
      setParams({ ...params, description: text });
    },
    [params],
  );

  const onNameChange = useCallback(
    (text: string): void => {
      setParams({ ...params, name: text });
    },
    [params],
  );

  const onSnapToAlbumItem = useCallback(
    (slideIndex: number): void => {
      setParams({
        ...params,
        coverColor: initAlbumTemplate[slideIndex].coverColor,
        coverUrl: getBGThumbnail(initAlbumTemplate[slideIndex].coverColor),
      });
    },
    [params],
  );

  const onSavePressAsync = useCallback(async (): Promise<void> => {
    if (!user.user) {
      return;
    }
    if (!isValidAlbumName(params.name) || !isValidAlbumDesc(params.description)) {
      Alert.alert('', translate('error.albumValidating'));
      return;
    }
    if (params.coverColor === undefined || params.coverUrl === undefined) {
      Alert.alert('', translate('error.selectTheme'));
      return;
    }

    setBusy(true);
    try {
      const req: UpdateAlbumRequest = {
        id: member.album.id,
        // @ts-ignore
        name: params.name,
        // @ts-ignore
        description: params.description,
        coverColor: params.coverColor,
        coverUrl: params.coverUrl,
      };
      const res = await updateAlbumAsync(req, user.user.accessToken);
      if (res) {
        getAlbums();

        Alert.alert('', translate('alert.albumUpdated'));
      }
    } catch (e) {
      Alert.alert('', translate('error.updateAlbum'));
    } finally {
      setBusy(false);
    }
  }, [params]);

  const renderLeftControl = useCallback(
    (): React.ReactElement => <TopNavigationAction iconName="x" onPress={onClosePress} />,
    [],
  );

  const renderAlbumItem = useCallback(
    (baseData: { index: number; dataIndex: number; item: AlbumTemplate }) => <AlbumTemplateItem item={baseData.item} />,
    [],
  );

  /*
  const renderMemberItem = useCallback((info: ListRenderItemInfo<MemberPreviewDto>): React.ReactElement => {
    return <MemberItem item={info.item} handleDeletePress={handleDeleteMemberPressAsync} />;
  }, []);

  const renderListHeader = useCallback((): React.ReactElement => {
    return (
      <View style={styles.container}>
        <TopNavigation title={translate('updateAlbum.header')} leftControl={renderLeftControl()} darkBackground />
        <TouchableOpacity style={styles.codeContainer} onPress={onCodePress}>
          <View style={styles.codeRowContainer}>
            <Text style={styles.codeTitle}>{translate('updateAlbum.subtitleCode')}</Text>
            <Text style={styles.codeTitle}>{member.album.inviteCode}</Text>
          </View>
          <Text style={styles.codeDesc}>{translate('updateAlbum.codeDesc')}</Text>
        </TouchableOpacity>
        <View flex style={styles.formContainer}>
          <Text style={styles.formSubtitle}>{translate('updateAlbum.subtitleName')}</Text>
          <TextField
            style={styles.inputContainer}
            placeholder={translate('updateAlbum.placeholderTitle')}
            placeholderTextColor={placeholderColor}
            value={params.name}
            onChangeText={onNameChange}
          />
          <Text style={styles.formSubtitle}>{translate('updateAlbum.subtitleDesc')}</Text>
          <TextField
            style={styles.inputContainer}
            placeholder={translate('updateAlbum.placeholderDesc')}
            placeholderTextColor={placeholderColor}
            value={params.description}
            onChangeText={onDescChange}
          />
          <Text style={styles.formSubtitle}>{translate('updateAlbum.subtitleTheme')}</Text>
          <Carousel
            contentContainerCustomStyle={styles.carouselContainer}
            vertical={false}
            firstItem={getBGIndex(params.coverColor)}
            activeSlideAlignment="start"
            inactiveSlideScale={0.85}
            sliderWidth={viewportWidth}
            itemWidth={250}
            data={initAlbumTemplate}
            renderItem={renderAlbumItem}
            onSnapToItem={onSnapToAlbumItem}
          />
          <Text style={styles.formSubtitle}>{translate('updateAlbum.subtitleMembers')}</Text>
        </View>
      </View>
    );
  }, []);

  const renderListFooter = useCallback((): React.ReactElement => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonBack}
          label={translate('common.back')}
          labelStyle={styles.buttonBackLabel}
          onPress={onClosePress}
        />
        <Button
          style={styles.buttonCreate}
          label={translate('common.save')}
          labelStyle={styles.buttonCreateLabel}
          onPress={onSavePressAsync}
        />
      </View>
    );
  }, []);
  */

  if (isLoading || isBusy) {
    return <CustomLoading />;
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <TopNavigation title={translate('updateAlbum.header')} leftControl={renderLeftControl()} darkBackground />
      <TouchableOpacity style={styles.codeContainer} onPress={onCodePress}>
        <View style={styles.codeRowContainer}>
          <Text style={styles.codeTitle}>{translate('updateAlbum.subtitleCode')}</Text>
          <Text style={styles.codeTitle}>{member.album.inviteCode}</Text>
        </View>
        <Text style={styles.codeDesc}>{translate('updateAlbum.codeDesc')}</Text>
      </TouchableOpacity>
      <View flex style={styles.formContainer}>
        <Text style={styles.formSubtitle}>{translate('updateAlbum.subtitleName')}</Text>
        <TextField
          style={styles.inputContainer}
          placeholder={translate('updateAlbum.placeholderTitle')}
          placeholderTextColor={placeholderColor}
          value={params.name}
          onChangeText={onNameChange}
        />
        <Text style={styles.formSubtitle}>{translate('updateAlbum.subtitleDesc')}</Text>
        <TextField
          style={styles.inputContainer}
          placeholder={translate('updateAlbum.placeholderDesc')}
          placeholderTextColor={placeholderColor}
          value={params.description}
          onChangeText={onDescChange}
        />
        <Text style={styles.formSubtitle}>{translate('updateAlbum.subtitleTheme')}</Text>
        <Carousel
          contentContainerCustomStyle={styles.carouselContainer}
          vertical={false}
          firstItem={getBGIndex(params.coverColor)}
          activeSlideAlignment="start"
          inactiveSlideScale={0.85}
          sliderWidth={viewportWidth}
          itemWidth={250}
          data={initAlbumTemplate}
          renderItem={renderAlbumItem}
          onSnapToItem={onSnapToAlbumItem}
        />
        <Text style={styles.formSubtitle}>{translate('updateAlbum.subtitleMembers')}</Text>
        {/*
        <FlatList
            style={styles.membersContainer}
            data={members}
            keyExtractor={keyExtractor}
            scrollEnabled={false}
            renderItem={renderMemberItem}
            initialNumToRender={7}
            maxToRenderPerBatch={5}
            windowSize={10}
          />
        */}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonBack}
          label={translate('common.back')}
          labelStyle={styles.buttonBackLabel}
          onPress={onClosePress}
        />
        <Button
          style={styles.buttonCreate}
          label={translate('common.save')}
          labelStyle={styles.buttonCreateLabel}
          onPress={onSavePressAsync}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(UpdateAlbumScreen, IsEqual);
