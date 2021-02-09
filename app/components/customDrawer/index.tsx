import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import React, { useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native-ui-lib';
import { APP_SCREEN } from '@/configs';
import { MemberWithAlbumDto } from '@/dtos';
import { useAlbumStore } from '@/hooks';
import { translate } from '@/i18n';
import CustomLoading from '../customLoading';
import TopNavigation from '../topNavigation';
import TopNavigationAction from '../topNavigation/topNavigationAction';
import AlbumItem from './albumItem';
import CreateModal from './createModal';
import styles from './styles';

interface ICustomDrawerProps {
  navigation: DrawerNavigationHelpers;
}

const keyExtractor = (item: MemberWithAlbumDto) => item.id.toString();

const CustomDrawer = (props: ICustomDrawerProps): React.ReactElement => {
  const { navigation } = props;
  const { height: viewportHeight } = Dimensions.get('window');
  const { album, changeCurrentAlbum } = useAlbumStore();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCreatePress = () => {
    setModalVisible(false);

    navigation.navigate(APP_SCREEN.CREATE_ALBUM);
  };

  const handleToggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAlbumPressAsync = async (index: number, item: MemberWithAlbumDto): Promise<void> => {
    if (index === album.currentIndex) {
      navigation.navigate(APP_SCREEN.MOMENTS, {
        member: item,
      });
    }
  };

  const onClosePress = (): void => {
    navigation.closeDrawer();
  };

  const onSnapToAlbumItem = (index: number): void => {
    changeCurrentAlbum({ index });
  };

  const renderLeftControl = (): React.ReactElement => <TopNavigationAction iconName="x" onPress={onClosePress} />;

  const renderAlbumItem = (baseData: {
    index: number;
    dataIndex: number;
    item: MemberWithAlbumDto;
  }): React.ReactElement => (
    <AlbumItem
      index={baseData.index}
      item={baseData.item}
      handleAlbumPress={handleAlbumPressAsync}
      handleCreatePress={handleToggleModal}
    />
  );

  if (!album.members) {
    return <CustomLoading />;
  }
  return (
    <>
      <View flex style={styles.container}>
        <TopNavigation title={translate('albums.header')} leftControl={renderLeftControl()} />
        <Carousel
          vertical
          keyExtractor={keyExtractor}
          sliderHeight={viewportHeight}
          itemHeight={325}
          inactiveSlideOpacity={0.25}
          inactiveSlideScale={1}
          activeSlideAlignment="start"
          firstItem={album.currentIndex}
          data={album.members}
          renderItem={renderAlbumItem}
          onSnapToItem={onSnapToAlbumItem}
        />
      </View>
      <Modal isVisible={isModalVisible} onDismiss={handleToggleModal}>
        <CreateModal handleCreatePress={handleCreatePress} handleToggleModal={handleToggleModal} />
      </Modal>
    </>
  );
};

export default React.memo(CustomDrawer, IsEqual);
