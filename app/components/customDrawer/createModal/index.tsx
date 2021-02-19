import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button, Text, TextField, View } from 'react-native-ui-lib';
import { useAlbumStore, useUserStore } from '@/hooks';
import { translate } from '@/i18n';
import { placeholderGrayColor } from '@/styles';
import { CreateMemberRequest } from '@/dtos';
import { createMemberAsync } from '@/services';
import CustomLoading from '../../customLoading';
import styles from './styles';

interface ICreateModalProps {
  handleCreatePress: () => void;
  handleToggleModal: () => void;
}

const CreateModal = (props: ICreateModalProps): React.ReactElement => {
  const { handleCreatePress, handleToggleModal } = props;
  const { getAlbums } = useAlbumStore();
  const { user } = useUserStore();
  const [inviteCode, setInviteCode] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  const onCreatePress = (): void => {
    handleCreatePress();
  };

  const onJoinPressAsync = async (): Promise<void> => {
    if (user.user === undefined || inviteCode === undefined) {
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
      setInviteCode('');
      setLoading(false);
    }
  };

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <View style={styles.modalContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.modalTitle}>{translate('albums.modalTitle')}</Text>
        <Text style={styles.modalDesc}>{translate('albums.modalInivteDesc')}</Text>
        <TextField
          style={styles.inputCodeContainer}
          placeholder={translate('albums.placeholderInviteCode')}
          placeholderTextColor={placeholderGrayColor}
          value={inviteCode}
          onChangeText={setInviteCode}
        />
        <Button
          style={styles.buttonJoin}
          label={translate('common.join')}
          labelStyle={styles.buttonJoinLabel}
          onPress={onJoinPressAsync}
        />
        <Button
          style={styles.buttonCreate}
          label={translate('common.createAlbum')}
          labelStyle={styles.buttonCreateLabel}
          onPress={onCreatePress}
        />
        <Text style={styles.closeLabel} onPress={handleToggleModal}>
          {translate('common.close')}
        </Text>
      </View>
    </View>
  );
};

export default CreateModal;
