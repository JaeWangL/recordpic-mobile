import React, { useCallback } from 'react';
import IsEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import LogOut from '@/assets/icons/logOut.svg';
import { MemberPreviewDto } from '@/dtos';
import styles from './styles';

interface IMemberItemProps {
  item: MemberPreviewDto;
  handleDeletePress: (item: MemberPreviewDto) => void;
}

const MemberItem = (props: IMemberItemProps): React.ReactElement => {
  const { item, handleDeletePress } = props;

  const onDeletePress = useCallback((): void => {
    handleDeletePress(item);
  }, []);

  const renderDeleteLabel = useCallback((): React.ReactElement => {
    if (item.rank === 0) {
      return <LogOut width={30} height={30} onPress={onDeletePress} />;
    }

    return <></>;
  }, []);

  return (
    <View style={styles.container}>
      <FastImage style={styles.userImage} source={{ uri: item.userImageUrl }} />
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.nameLabel}>{item.userName}</Text>
          <Text style={styles.emailLabel}>{item.userEmail}</Text>
        </View>
        {renderDeleteLabel()}
      </View>
    </View>
  );
};

export default React.memo(MemberItem, IsEqual);
