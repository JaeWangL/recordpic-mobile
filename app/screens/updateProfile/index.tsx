import { GoogleSignin } from '@react-native-community/google-signin';
import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Button, Image, Text, TextField, View } from 'react-native-ui-lib';
import { CustomLoading, TopNavigation, TopNavigationAction } from '@/components';
import { APP_SCREEN, RootStackParamList } from '@/configs';
import { DeletePhotoBlobRequest } from '@/dtos';
import { useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { deletePhotoBlobAsync, signOutAsync, uploadPhotoBlobAsync } from '@/services';
import { getFilenamefromUrl, LogUtil } from '@/utils';
import styles from './styles';

const UpdateProfile = (props: DrawerScreenProps<RootStackParamList, APP_SCREEN.UPDATE_PROFILE>): React.ReactElement => {
  const { navigation } = props;
  const { signOut, updateUser, user } = useUserStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (!user.user) {
      return;
    }

    setLoading(true);
    try {
      setImageUrl(user.user.imageUrl);
      setName(user.user.name);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSignoutAsync = useCallback(async (): Promise<void> => {
    if (!user.user) {
      return;
    }

    setLoading(true);
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }

      await signOutAsync({ userId: user.user.id });
    } catch (e) {
      Alert.alert('', translate('error.signOut'));
      LogUtil(e);
    } finally {
      setLoading(false);
      signOut({ clearStorage: true });
    }
  }, []);

  const onClosePress = useCallback((): void => {
    navigation.goBack();
  }, []);

  const onImagePress = useCallback((): void => {
    const options: ImagePicker.ImageLibraryOptions = {
      quality: 1,
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel || !user.user) {
        return;
      }
      if (response.errorCode && response.errorMessage) {
        LogUtil(response.errorMessage);
        return;
      }
      if (imageUrl) {
        const request: DeletePhotoBlobRequest = {
          fileName: getFilenamefromUrl(imageUrl),
        };
        await deletePhotoBlobAsync(request, user.user.accessToken);
      }

      const photoData = new FormData();
      photoData.append('image', {
        uri: response.uri,
        type: response.type,
        name: response.fileName,
        length: response.fileSize,
      });

      const res = await uploadPhotoBlobAsync(photoData, user.user.accessToken);
      if (res) {
        setImageUrl(res);
      }
    });
  }, []);

  const onLogoutPressAsync = useCallback(async (): Promise<void> => {
    await handleSignoutAsync();
  }, []);

  const onSavePress = (): void => {
    if (!user.user || !name) {
      return;
    }
    if (name.length > 30) {
      return;
    }

    updateUser({ id: user.user.id, name, imageUrl, accessToken: user.user.accessToken });
  };

  const renderLeftControl = useCallback(
    (): React.ReactElement => <TopNavigationAction iconName="x" onPress={onClosePress} />,
    [],
  );

  if (user.isLoading || isLoading) {
    return <CustomLoading />;
  }
  return (
    <View flex style={styles.container}>
      <TopNavigation title={translate('updateAlbum.header')} leftControl={renderLeftControl()} darkBackground />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View flex style={styles.headerContainer}>
          <TouchableOpacity style={styles.userImageContainer} onPress={onImagePress}>
            <Image
              style={styles.userImage}
              source={{
                uri: imageUrl,
              }}
            />
          </TouchableOpacity>
          <TextField
            style={styles.inputNameContainer}
            placeholder={translate('updateProfile.placeholderName')}
            placeholderTextColor="#ffffff"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.signout} onPress={onLogoutPressAsync}>
            {translate('updateProfile.signOut')}
          </Text>
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
            onPress={onSavePress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(UpdateProfile, IsEqual);
