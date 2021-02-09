import React, { useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert } from 'react-native';
import { Button, Text, TextField, View } from 'react-native-ui-lib';
import { DrawerScreenProps } from '@react-navigation/drawer';
import BackgroundImage from '@/assets/images/backgroundIntro.png';
import LogoBig from '@/assets/images/logo_big.svg';
import { CustomLoading, ImageOverlay } from '@/components';
import { APP_SCREEN, RootStackParamList } from '@/configs';
import { CreateMemberRequest } from '@/dtos';
import { useAlbumStore, useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { createMemberAsync } from '@/services';
import { placeholderColor } from '@/styles';
import styles from './styles';

const IntroScreen = (props: DrawerScreenProps<RootStackParamList, APP_SCREEN.INTRO>): React.ReactElement => {
  const { navigation } = props;
  const { getAlbums } = useAlbumStore();
  const { user } = useUserStore();
  const [inviteCode, setInviteCode] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>();

  const onCreatePress = (): void => {
    navigation.navigate(APP_SCREEN.CREATE_ALBUM);
  };

  const onJoinPressAsync = async (): Promise<void> => {
    if (user.user === undefined) {
      return;
    }

    setLoading(true);
    try {
      const req: CreateMemberRequest = {
        albumCode: inviteCode,
        userId: user.user.id,
        userEmail: user.user.email,
        userName: user.user.name,
        userImageUrl: user.user.imageUrl,
      };
      const res = await createMemberAsync(req, user.user.accessToken);
      if (res) {
        getAlbums();
      }
    } catch (e) {
      Alert.alert('', translate('error.joinAlbum'));
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <ImageOverlay style={styles.container} source={BackgroundImage} useBlur={false}>
      <View style={styles.baseContainer}>
        <View style={styles.headerContainer}>
          <LogoBig width={120} height={120} />
          <Text style={styles.headerText}>{translate('intro.title')}</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formText}>{translate('intro.inivteDesc')}</Text>
          <TextField
            placeholderTextColor={placeholderColor}
            style={styles.inputCodeContainer}
            placeholder={translate('intro.placeholderInviteCode')}
            value={inviteCode}
            onChangeText={setInviteCode}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonJoin}
            label={translate('intro.join')}
            labelStyle={styles.buttonJoinLabel}
            onPress={onJoinPressAsync}
          />
          <Button
            style={styles.buttonCreate}
            label={translate('intro.createAlbum')}
            labelStyle={styles.buttonCreateLabel}
            onPress={onCreatePress}
          />
        </View>
      </View>
    </ImageOverlay>
  );
};

export default React.memo(IntroScreen, IsEqual);
