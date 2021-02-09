import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Button, KeyboardAwareScrollView, Text, TextField, View } from 'react-native-ui-lib';
import { CustomLoading, TopNavigation, TopNavigationAction } from '@/components';
import { APP_SCREEN, RootStackParamList } from '@/configs';
import { CreateAlbumRequest } from '@/dtos';
import { useAlbumStore, useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { createAlbumAsync } from '@/services';
import { placeholderColor } from '@/styles';
import { isValidAlbumDesc, isValidAlbumName, getBGThumbnail, wp } from '@/utils';
import AlbumItemTemplate from './albumTemplateItem';
import { initAlbumTemplate, initParamsType, AlbumTemplate, CreateAlbumParamsType } from './interfaces';
import styles from './styles';

const CreateAlbumScreen: React.FC<DrawerScreenProps<RootStackParamList, APP_SCREEN.CREATE_ALBUM>> = (props) => {
  const { navigation } = props;
  const { width: viewportWidth } = Dimensions.get('window');
  const { getAlbums } = useAlbumStore();
  const { user } = useUserStore();
  const [params, setParams] = useState<CreateAlbumParamsType>(initParamsType);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleAlbumPress = (item: AlbumTemplate): void => {
    setParams({ ...params, coverColor: item.coverColor });
  };

  const onBackPress = (): void => {
    navigation.goBack();
  };

  const onCreatePressAsync = async (): Promise<void> => {
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

    setLoading(true);
    try {
      const req: CreateAlbumRequest = {
        userId: user.user.id,
        userEmail: user.user.email,
        userName: user.user.name,
        userImageUrl: user.user.imageUrl,
        // @ts-ignore
        name: params.name,
        // @ts-ignore
        description: params.description,
        coverColor: params.coverColor,
        coverUrl: params.coverUrl,
      };
      const res = await createAlbumAsync(req, user.user.accessToken);
      if (res) {
        getAlbums();
      }
    } catch (e) {
      Alert.alert('', translate('error.createAlbum'));
    } finally {
      setLoading(false);
    }
  };

  const onDescChange = (text: string): void => {
    setParams({ ...params, description: text });
  };

  const onNameChange = (text: string): void => {
    setParams({ ...params, name: text });
  };

  const onSnapToAlbumItem = (slideIndex: number): void => {
    setParams({
      ...params,
      coverColor: initAlbumTemplate[slideIndex].coverColor,
      coverUrl: getBGThumbnail(initAlbumTemplate[slideIndex].coverColor),
    });
  };

  const renderLeftControl = (): React.ReactElement => (
    <TopNavigationAction iconName="x" darkBackground onPress={onBackPress} />
  );

  const renderAlbumItem = (baseData: { index: number; dataIndex: number; item: AlbumTemplate }) => (
    <AlbumItemTemplate item={baseData.item} handleAlbumPress={handleAlbumPress} />
  );

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <TopNavigation
        style={styles.hedaerContainer}
        title={translate('createAlbum.header')}
        leftControl={renderLeftControl()}
        darkBackground
      />
      <View style={styles.codeContainer}>
        <Text style={styles.codeDesc}>{translate('createAlbum.codeDesc')}</Text>
      </View>
      <View flex style={styles.formContainer}>
        <Text style={styles.formSubtitle}>{translate('createAlbum.subtitleName')}</Text>
        <TextField
          style={styles.inputContainer}
          placeholder={translate('createAlbum.placeholderTitle')}
          placeholderTextColor={placeholderColor}
          value={params.name}
          onChangeText={onNameChange}
        />
        <Text style={styles.formSubtitle}>{translate('createAlbum.subtitleDesc')}</Text>
        <TextField
          style={styles.inputContainer}
          placeholder={translate('createAlbum.placeholderDesc')}
          placeholderTextColor={placeholderColor}
          value={params.description}
          onChangeText={onDescChange}
        />
        <Text style={styles.formSubtitle}>{translate('createAlbum.subtitleTheme')}</Text>
        <Carousel
          contentContainerCustomStyle={styles.carouselContainer}
          vertical={false}
          activeSlideAlignment="start"
          inactiveSlideScale={0.85}
          sliderWidth={viewportWidth}
          itemWidth={250}
          data={initAlbumTemplate}
          renderItem={renderAlbumItem}
          onSnapToItem={onSnapToAlbumItem}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonBack}
          label={translate('common.back')}
          labelStyle={styles.buttonBackLabel}
          onPress={onBackPress}
        />
        <Button
          style={styles.buttonCreate}
          label={translate('common.create')}
          labelStyle={styles.buttonCreateLabel}
          onPress={onCreatePressAsync}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateAlbumScreen;
