import { DrawerScreenProps } from '@react-navigation/drawer';
import Moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert, Dimensions, FlatList, GestureResponderEvent, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text, TextField, View } from 'react-native-ui-lib';
import AddPhoto from '@/assets/icons/add-photo.svg';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import { CustomLoading, Divider, ImageOverlay, TopNavigation, TopNavigationText } from '@/components';
import { APP_SCREEN, RootStackParamList } from '@/configs';
import { CreateMomentRequest, CreatePhotoWithMomentRequest } from '@/dtos';
import { useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { createMomentAsync } from '@/services';
import { photoListStyles } from '@/styles';
import { getBGImage } from '@/utils';
import CreatePhotoItem from './createPhotoItem';
import { initMParamsType, initPParamsType, CreateMomentParamsType, CreatePhotoParamsType } from './interfaces';

const { width: viewportWidth } = Dimensions.get('window');
const keyExtractor = (item: CreatePhotoParamsType) => item.index.toString();

const CreateMomentScreen = (
  props: DrawerScreenProps<RootStackParamList, APP_SCREEN.CREATE_MOMENT>,
): React.ReactElement => {
  const { navigation, route } = props;
  const { member } = route.params;
  const { user } = useUserStore();
  const [paramsM, setMParams] = useState<CreateMomentParamsType>(initMParamsType);
  const [paramsP, setPParams] = useState<CreatePhotoParamsType[]>(initPParamsType);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setMParams(initMParamsType);
      setPParams(initPParamsType);
    };
  }, []);

  const handleParmsChange = (params: CreatePhotoParamsType): void => {
    const newParams = Array.from(paramsP);
    newParams[params.index].photoUrl = params.photoUrl;
    newParams[params.index].photoTitle = params.photoTitle;
    newParams[params.index].photoDescription = params.photoDescription;

    setPParams(newParams);
  };

  const handleDeletePhoto = (index: number): void => {
    const handleDelete = (): void => {
      if (paramsP.length === 1) {
        Alert.alert('', translate('error.noPhotoValidating'));
        return;
      }

      const newParams = paramsP.filter((item) => item.index !== index);
      setPParams(newParams);
    };

    Alert.alert(
      '',
      translate('ask.deletePhoto'),
      [
        {
          text: translate('common.no'),
          style: 'cancel',
        },
        { text: translate('common.yes'), onPress: handleDelete },
      ],
      { cancelable: false },
    );
  };

  const onCancelPress = (): void => {
    navigation.goBack();
  };

  const onSaveAsync = async (): Promise<void> => {
    if (!user.user) {
      return;
    }
    if (!paramsM.name || paramsM.name.length > 20) {
      Alert.alert('', translate('error.momentNameValidating'));
      return;
    }
    if (paramsP.length === 0) {
      Alert.alert('', translate('error.momentCountValidating'));
      return;
    }
    const dummyCount = paramsP.filter(
      (p) => p.photoUrl === undefined || p.photoTitle === undefined || p.photoDescription === undefined,
    ).length;
    if (dummyCount > 0) {
      Alert.alert('', translate('error.photoValidating'));
      return;
    }
    const exceedCount = paramsP.filter(
      (p) =>
        (p.photoTitle !== undefined && p.photoTitle.length > 50) ||
        (p.photoDescription !== undefined && p.photoDescription.length > 50),
    ).length;
    if (exceedCount > 0) {
      Alert.alert('', translate('error.photoCharacterValidating'));
      return;
    }

    setLoading(true);
    try {
      const photos: CreatePhotoWithMomentRequest[] = paramsP.map((p) => {
        return {
          photoUrl: p.photoUrl,
          title: p.photoTitle,
          description: p.photoDescription,
        } as CreatePhotoWithMomentRequest;
      });
      const request: CreateMomentRequest = {
        albumId: member.album.id,
        name: paramsM.name,
        creatorMemberId: member.id,
        momentDate: paramsM.momentDate,
        photos,
      };
      const res = await createMomentAsync(request, user.user.accessToken);
      if (res) {
        Alert.alert('', translate('common.createMomentMsg'));
        navigation.goBack();
      }
    } catch {
      Alert.alert('', translate('common.serverError'));
    } finally {
      setLoading(false);
    }
  };

  const onNameChange = (text: string): void => {
    setMParams({ ...paramsM, name: text });
  };

  const onMomentDatePress = (event: GestureResponderEvent): void => {
    event.preventDefault();
    setShowDate(!showDate);
  };

  const onDateConfirm = (date: Date): void => {
    // NOTE: `setShowDate` must be declared before `setMParams`
    // If not, in Android, Picker will be opened twice
    setShowDate(false);
    if (date !== undefined) {
      setMParams({ ...paramsM, momentDate: date });
    }
  };

  const onDateCancel = (): void => {
    setShowDate(false);
  };

  const onAddPress = (): void => {
    if (paramsP.length >= 5) {
      Alert.alert('', translate('error.photoCountValidating'));
      return;
    }

    const newCard: CreatePhotoParamsType = {
      index: paramsP.length,
    };
    const newParams = paramsP.concat(newCard);

    setPParams(newParams);

    console.log(newParams.length);
  };

  const renderLeftControl = useCallback(
    (): React.ReactElement => <TopNavigationText label={translate('createMoment.cancel')} onPress={onCancelPress} />,
    [],
  );

  const renderRightControls = useCallback(
    (): React.ReactElement[] => [
      <TopNavigationText key="0" label={translate('createMoment.save')} onPress={onSaveAsync} />,
    ],
    [paramsM, paramsP],
  );

  const renderListHeader = useCallback((): React.ReactElement => {
    return (
      <View style={photoListStyles.headerContainer}>
        <View style={photoListStyles.dateContainer}>
          <Text style={photoListStyles.dateLabel} onPress={onMomentDatePress}>
            {Moment(paramsM.momentDate).format('YYYY년 MM월 DD일')}
          </Text>
          <ArrowDown style={photoListStyles.dateArrow} width={14} height={13} />
        </View>
        <TextField
          style={photoListStyles.inputNameContainer}
          placeholder={translate('createMoment.placeholderTitle')}
          placeholderTextColor="black"
          underlineColor="white"
          value={paramsM.name}
          onChangeText={onNameChange}
        />
      </View>
    );
  }, [paramsM.momentDate]);

  const renderListFooter = (): React.ReactElement => {
    return (
      <>
        <Divider style={photoListStyles.footerDivider} />
        <TouchableOpacity style={photoListStyles.footerContainer} onPress={onAddPress}>
          <AddPhoto />
          <Text style={photoListStyles.footerLabel}>{translate('createMoment.addPhoto')}</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderItem = (info: ListRenderItemInfo<CreatePhotoParamsType>): React.ReactElement => {
    return (
      <CreatePhotoItem
        user={user.user}
        params={info.item}
        handleParmsChange={handleParmsChange}
        handleDeletePhoto={handleDeletePhoto}
        viewportWidth={viewportWidth}
      />
    );
  };

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <ImageOverlay style={photoListStyles.container} source={{ uri: getBGImage(member.album.coverColor) }}>
      <>
        <TopNavigation
          title={member.album.name}
          leftControl={renderLeftControl()}
          rightControls={renderRightControls()}
        />
        <FlatList
          style={photoListStyles.listContainer}
          contentContainerStyle={photoListStyles.listContentContainer}
          data={paramsP}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={renderListHeader}
          ListFooterComponent={renderListFooter}
        />
        <DateTimePickerModal isVisible={showDate} mode="date" onConfirm={onDateConfirm} onCancel={onDateCancel} />
      </>
    </ImageOverlay>
  );
};

export default React.memo(CreateMomentScreen, IsEqual);
