import { DrawerScreenProps } from '@react-navigation/drawer';
import CameraRoll from '@react-native-community/cameraroll';
import React, { useCallback, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert, Dimensions, Platform } from 'react-native';
import FastImage, { ImageStyle, OnLoadEvent } from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import { View } from 'react-native-ui-lib';
import RNFetchBlob from 'rn-fetch-blob';
import { CustomLoading, TopNavigation, TopNavigationAction, TopNavigationText } from '@/components';
import { RootStackParamList, APP_SCREEN } from '@/configs';
import { translate } from '@/i18n';
import { hasAndroidExStoragePermissionAsync } from '@/utils';
import styles from './styles';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const PhotoDetailScreen = (
  props: DrawerScreenProps<RootStackParamList, APP_SCREEN.PHOTO_DETAIL>,
): React.ReactElement => {
  const { navigation, route } = props;
  const { photoUrl } = route.params;
  const [calcImgHeight, setCalcImgHeight] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const getImageStyle = useCallback((): ImageStyle => {
    return { width: viewportWidth, height: calcImgHeight };
  }, [calcImgHeight]);

  const onSaveAsyncPress = useCallback(async (): Promise<void> => {
    if (Platform.OS === 'android' && !(await hasAndroidExStoragePermissionAsync())) {
      return;
    }

    setLoading(true);
    try {
      const blob = await RNFetchBlob.config({ fileCache: true, appendExt: 'png' }).fetch('GET', photoUrl);
      await CameraRoll.save(blob.data, {
        album: 'RecordPic',
      });

      Alert.alert('', translate('alert.photoSaved'));
    } catch (e) {
      Alert.alert('', translate('error.photoSaving'));
    } finally {
      setLoading(false);
    }
  }, []);

  const onClosePress = useCallback((): void => {
    navigation.goBack();
  }, []);

  const onImageLoad = useCallback((event: OnLoadEvent): void => {
    setCalcImgHeight((event.nativeEvent.height / event.nativeEvent.width) * viewportWidth);
  }, []);

  const renderLeftControl = useCallback(
    (): React.ReactElement => <TopNavigationAction iconName="x" onPress={onClosePress} />,
    [],
  );

  const renderRightControls = useCallback(
    (): React.ReactElement[] => [
      <TopNavigationText key="0" label={translate('photoDetail.save')} onPress={onSaveAsyncPress} />,
    ],
    [],
  );

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <View style={styles.container}>
      <ImageZoom
        cropWidth={viewportWidth}
        cropHeight={viewportHeight}
        imageWidth={viewportWidth}
        imageHeight={calcImgHeight}
      >
        <FastImage style={getImageStyle()} source={{ uri: photoUrl }} resizeMode="contain" onLoad={onImageLoad} />
      </ImageZoom>
      <TopNavigation style={styles.header} leftControl={renderLeftControl()} rightControls={renderRightControls()} />
    </View>
  );
};

export default React.memo(PhotoDetailScreen, IsEqual);
