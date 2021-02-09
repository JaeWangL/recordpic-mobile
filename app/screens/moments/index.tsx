import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useRef } from 'react';
import IsEqual from 'react-fast-compare';
import { ImageBackground, FlatList, ListRenderItemInfo } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Edit3 from '@/assets/icons/edit3.svg';
import { CustomLoading, TopNavigation, TopNavigationAction } from '@/components';
import { APP_SCREEN, RootStackParamList } from '@/configs';
import { MomentPreviewDto } from '@/dtos';
import { useMomentsPreviewFetch, useMomentStore, useUserStore } from '@/hooks';
import { getBGImage } from '@/utils';
import MomentItem from './momentItem';
import styles from './styles';

const keyExtractor = (item: MomentPreviewDto) => item.id.toString();

const MomentsScreen: React.FC<DrawerScreenProps<RootStackParamList, APP_SCREEN.MOMENTS>> = (props) => {
  const { navigation, route } = props;
  const { member } = route.params;
  const { moment } = useMomentStore();
  const { user } = useUserStore();
  const { moments, isLoading } = useMomentsPreviewFetch(member.album.id, user.user);
  const momentsList = useRef<FlatList>(null);

  const onFABPress = (): void => {
    navigation.navigate(APP_SCREEN.CREATE_MOMENT, { member });
  };

  const onMenuPress = (): void => {
    navigation.openDrawer();
  };

  const renderLeftControl = (): React.ReactElement => <TopNavigationAction iconName="menu" onPress={onMenuPress} />;

  const renderRightControls = (): React.ReactElement[] => [<TopNavigationAction key="0" iconName="user" />];

  const renderFABIcon = (): React.ReactElement => {
    return <Edit3 />;
  };

  const renderItem = (info: ListRenderItemInfo<MomentPreviewDto>): React.ReactElement => (
    <MomentItem
      item={info.item}
      isLastItem={info.index === moments.length - 1}
      handleMomentPress={() => console.log('Test')}
    />
  );

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <ImageBackground style={styles.container} source={{ uri: getBGImage(member.album.coverColor) }}>
      <TopNavigation leftControl={renderLeftControl()} rightControls={renderRightControls()} />
      <FlatList
        ref={momentsList}
        style={styles.momentsContainer}
        data={moments}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={7}
        maxToRenderPerBatch={5}
        windowSize={10}
        initialScrollIndex={moment.currentIndex}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            momentsList.current?.scrollToIndex({ index: info.index, animated: false });
          });
        }}
      />
      <FloatingAction
        distanceToEdge={24}
        buttonSize={64}
        color={member.album.coverColor}
        iconHeight={24}
        iconWidth={24}
        showBackground={false}
        floatingIcon={renderFABIcon()}
        onPressMain={onFABPress}
      />
    </ImageBackground>
  );
};

export default React.memo(MomentsScreen, IsEqual);
